import { CSSProperties, useEffect, useLayoutEffect, useRef, useState } from "react";
import { GetRef, Typography } from "antd";
import { CaretUpFilled, UserOutlined } from "@ant-design/icons";
import { Tag } from "components/tag";
import styles from "./styles.module.css";

const { Paragraph } = Typography;

const INITIAL_STYLE = {
  height: "",
  overflow: "",
};
const OBSERVER_OPTIONS = {
  childList: true,
};

interface KeywordsProps {
  keywords: { value: string; count: number }[];
  visibleRows?: number;
}

export const Keywords = ({ keywords, visibleRows = 1 }: KeywordsProps) => {
  const [initialStyles, setInitialStyles] = useState<CSSProperties>(INITIAL_STYLE);
  const [expanded, setExpanded] = useState(false);
  const [keywordsLeft, setKeywordsLeft] = useState(0);
  const ref = useRef<GetRef<typeof Paragraph>>(null);
  const observerRef = useRef<MutationObserver>(
    new MutationObserver(() => {
      setKeywordsLeft(
        keywords.length -
          Array.prototype.filter.call(ref.current?.children, (node: Element) =>
            node.classList.contains("ant-tag"),
          ).length,
      );
    }),
  );

  useLayoutEffect(() => {
    // prevent layout shift on a long text
    if (ref.current?.firstElementChild) {
      const firstElementHeight = parseFloat(getComputedStyle(ref.current.firstElementChild).height);
      const rowGap = visibleRows > 1 ? parseFloat(getComputedStyle(ref.current).rowGap) : 0;

      setInitialStyles({
        height: firstElementHeight * visibleRows + rowGap * (visibleRows - 1),
        overflow: "hidden",
      });
    }
  }, []);

  useEffect(() => {
    if (ref.current) observerRef.current.observe(ref.current, OBSERVER_OPTIONS);

    return () => {
      observerRef.current.disconnect();
    };
  }, []);

  return (
    <Paragraph
      ref={ref}
      className={styles.keywords}
      style={initialStyles}
      ellipsis={{
        rows: visibleRows,
        expandable: "collapsible",
        expanded,
        onExpand(_, info) {
          if (info.expanded) observerRef.current.disconnect();
          setExpanded(info.expanded);
        },
        onEllipsis() {
          setInitialStyles(INITIAL_STYLE);
        },
        symbol: expanded ? (
          <>
            Show less <CaretUpFilled style={{ marginLeft: 5 }} />
          </>
        ) : (
          <>
            Show All
            <span style={{ marginLeft: 4 }}>{keywordsLeft > 0 ? `+${keywordsLeft}` : ""}</span>
          </>
        ),
      }}
    >
      {keywords.map(({ value, count }, index) => (
        <Tag key={index} icon={<UserOutlined />} value={value} count={count} />
      ))}
    </Paragraph>
  );
};
