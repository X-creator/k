import { Flex, Space, Typography } from "antd";
import { AccountBookOutlined, FlagFilled, GlobalOutlined, UserOutlined } from "@ant-design/icons";
import { transformAuthors, transformDate, transformQuantity } from "lib/utils.ts";
import { SnippetNews } from "lib/schema.ts";
import styles from "./styles.module.css";

const { Text, Link, Title: AntdTitle } = Typography;

const STYLE = { marginRight: 4 };

interface TitleProps {
  data: SnippetNews;
  rich?: boolean;
}

export const Title = ({ data, rich = true }: TitleProps) => {
  const date = transformDate(data.DP);

  return (
    <Flex gap="middle" vertical>
      <Space className={styles.info} size="middle">
        <Text type="secondary">
          <span className={styles.value} style={STYLE}>
            {date.day}
          </span>
          {date.monthYear}
        </Text>
        <Text type="secondary">
          <span className={styles.value} style={STYLE}>
            {transformQuantity(data.REACH)}
          </span>
          Reach
        </Text>
        {rich && (
          <Text type="secondary">
            Top Traffic:
            <Space size={8} style={{ marginLeft: 4, flexWrap: "wrap" }}>
              {data.TRAFFIC.map(({ value, count }) => (
                <Text key={value} type="secondary">
                  {value}
                  <span className={styles.value} style={{ marginLeft: 4 }}>
                    {Math.floor(count * 100)}%
                  </span>
                </Text>
              ))}
            </Space>
          </Text>
        )}
      </Space>
      <AntdTitle className={styles.title} level={5}>
        {data.TI}
      </AntdTitle>
      <Space className={styles.address} size="middle">
        <Text type="secondary">
          <GlobalOutlined style={STYLE} />
          <Link className={styles.url} href={data.URL}>
            {data.DOM}
          </Link>
        </Text>
        <Text type="secondary">
          <FlagFilled style={STYLE} />
          {data.CNTR}
        </Text>
        {rich && (
          <Text type="secondary">
            <AccountBookOutlined style={STYLE} />
            {data.CNTR_CODE}
          </Text>
        )}
        <Text type="secondary">
          <UserOutlined style={STYLE} />
          {transformAuthors(data.AU)}
        </Text>
      </Space>
    </Flex>
  );
};
