import { CSSProperties, ReactNode, useLayoutEffect, useMemo, useRef, useState } from "react";
import { GetRef, Typography } from "antd";
import { CaretDownFilled, CaretUpFilled } from "@ant-design/icons";
import { Highlight } from "components/highlight";
import styles from "./styles.module.css";

const { Paragraph } = Typography;

const INITIAL_STYLE = {
  height: "",
  overflow: "",
};
const DELAY_MS = 100;

interface DescriptionProps {
  description: string;
  keywords: { value: string; count: number }[];
  visibleRows?: number;
}

export const Description = ({ description, keywords, visibleRows = 3 }: DescriptionProps) => {
  const [initialStyles, setInitialStyles] = useState<CSSProperties>(INITIAL_STYLE);
  const [expanded, setExpanded] = useState(false);
  const ref = useRef<GetRef<typeof Paragraph>>(null);
  const [rows, setRows] = useState(Math.max(1, visibleRows - 1)); // without this, bugs sometimes occur

  useLayoutEffect(() => {
    // prevent layout shift on a long text
    if (ref.current)
      setInitialStyles({
        height: parseFloat(getComputedStyle(ref.current).lineHeight) * visibleRows,
        overflow: "hidden",
      });
  }, []);

  const text = useMemo(() => {
    const keywordsDict: Record<string, boolean> = {};
    let longestKeywordLength = 0;

    return description
      .split(
        new RegExp(
          keywords.reduce((str, { value }) => {
            keywordsDict[value.toLowerCase()] = true; // side effect (for performance reason)
            longestKeywordLength = Math.max(longestKeywordLength, value.length); // side effect (for performance reason)
            return `${str}${!str ? "" : "|"}(${value})`;
          }, ""),
          "gi",
        ),
      )
      .reduce<(string | ReactNode)[]>((res, str: string | undefined, i) => {
        if (!str) return res;

        if (str.length <= longestKeywordLength && keywordsDict[str.toLowerCase()]) {
          res.push(<Highlight key={i}>{str}</Highlight>);
        } else res.push(str);

        return res;
      }, []);
  }, [description, keywords]);

  return (
    <Paragraph
      ref={ref}
      className={styles.description}
      style={initialStyles}
      ellipsis={{
        rows,
        expandable: "collapsible",
        expanded,
        onExpand(_, info) {
          setTimeout(setExpanded, DELAY_MS, info.expanded); // some animation
        },
        onEllipsis() {
          setInitialStyles(INITIAL_STYLE);
          queueMicrotask(() => {
            setRows(visibleRows);
          });
        },
        symbol: expanded ? (
          <>
            Show less <CaretUpFilled style={{ marginLeft: 5 }} />
          </>
        ) : (
          <>
            Show more <CaretDownFilled style={{ marginLeft: 5 }} />
          </>
        ),
      }}
    >
      {text}
    </Paragraph>
  );
};
