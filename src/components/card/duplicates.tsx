import { Button, Card, Flex, Select, Typography } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { Title } from "./title.tsx";
import { Extra } from "./extra.tsx";
import { SnippetNews } from "lib/schema.ts";
import styles from "./styles.module.css";

const { Text } = Typography;

const DUPLICATES = 22;
const OPTIONS = [
  { value: "relevance", label: "By Relevance" },
  { value: "date", label: "By Date" },
  { value: "title", label: "By Title" },
];

interface DuplicatesProps {
  data: SnippetNews;
}

export const Duplicates = ({ data }: DuplicatesProps) => (
  <>
    <Flex className={styles.duplicates_count} justify="space-between" align="center">
      <Text type="secondary">
        Duplicates:
        <span
          className={styles.value}
          style={{
            marginLeft: 4,
          }}
        >
          {DUPLICATES}
        </span>
      </Text>
      <Select
        className={styles.duplicates_select}
        dropdownStyle={{
          background: "#302e3b",
          ["--ant-select-option-selected-bg" as string]: "#0e0e0e",
        }}
        variant="borderless"
        size="small"
        suffixIcon={<DownOutlined style={{ color: "#fff", fontSize: 14 }} />}
        defaultValue={OPTIONS[0]}
        options={OPTIONS}
      />
    </Flex>
    <Card
      className={styles.card}
      style={{ borderColor: "#0772cb", marginBottom: 16 }}
      title={<Title data={data} rich={false} />}
      extra={<Extra data={data} rich={false} />}
    />
    <Button className={styles.duplicates_button} ghost icon={<DownOutlined />}>
      View Duplicates
    </Button>
  </>
);
