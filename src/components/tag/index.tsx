import { ReactNode } from "react";
import { Tag as AntdTag } from "antd";
import styles from "./styles.module.css";

interface TagProps {
  icon: ReactNode;
  value: string;
  count: number;
}

export const Tag = ({ icon, value, count }: TagProps) => (
  <AntdTag className={styles.tag} icon={icon}>
    {value}
    <span className={styles.count}>{count}</span>
  </AntdTag>
);
