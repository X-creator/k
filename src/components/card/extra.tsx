import { Checkbox, Tag as AntdTag, Typography } from "antd";
import { InfoOutlined } from "@ant-design/icons";
import { SnippetNews } from "lib/schema.ts";
import styles from "./styles.module.css";

const { Link } = Typography;

const SENTIMENT_COLORS = {
  positive: "#23ffb0",
  negative: "#ff4d4f",
  neutral: "#b6b6c4",
};

interface ExtraProps {
  data: SnippetNews;
  rich?: boolean;
}

export const Extra = ({ data, rich = true }: ExtraProps) => (
  <>
    {rich && (
      <AntdTag
        className={styles.extra_tag}
        bordered={false}
        style={{ background: SENTIMENT_COLORS[data.SENT] }}
      >
        {data.SENT}
      </AntdTag>
    )}
    <Link className={styles.extra_link} href="#">
      <InfoOutlined />
    </Link>
    <Checkbox className={styles.extra_checkbox} />
  </>
);
