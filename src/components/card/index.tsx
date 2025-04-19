import { Card, Typography } from "antd";
import { Title } from "./title.tsx";
import { Extra } from "./extra.tsx";
import { Description } from "./description.tsx";
import { Keywords } from "./keywords.tsx";
import { Duplicates } from "./duplicates.tsx";
import { SnippetNews } from "lib/schema.ts";
import styles from "./styles.module.css";

const { Link } = Typography;

interface ArticleCardProps {
  data: SnippetNews;
}

export const ArticleCard = ({ data }: ArticleCardProps) => {
  return (
    <Card className={styles.card} title={<Title data={data} />} extra={<Extra data={data} />}>
      <Description description={data.AB} keywords={data.KW} />
      {/*<Keywords keywords={data.KW} />*/}
      <Keywords keywords={arr} /> {/*check the logic*/}
      <Link className={styles.source} href="#">
        Original Source
      </Link>
      <Duplicates data={data} />
    </Card>
  );
};

const arr = Array.from(
  { length: 30 },
  function (this: string[], _, i) {
    return {
      value: this[i % this.length],
      count: i + 1,
    };
  },
  ["antivirus", "kaspersky", "new"],
);
