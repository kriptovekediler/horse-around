import cn from "classnames";
import styles from "./styles.module.css";

export default function Layout({ page, children }) {
  return (
    <div className={cn(styles.layout, page ? styles.page : "")}>{children}</div>
  );
}
