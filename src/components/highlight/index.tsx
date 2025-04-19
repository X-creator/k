import styles from "./styles.module.css";

interface HighlightProps {
  children: string;
}

export const Highlight = ({ children }: HighlightProps) => (
  <span className={styles.highlight}>{children}</span>
);
