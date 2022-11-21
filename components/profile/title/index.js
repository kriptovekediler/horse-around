import Image from "next/image";
import Link from "next/link";
import cn from "classnames";
import styles from "./styles.module.css";

export default function ProfileTitle({ title }) {
  return (
    <div className={cn(styles.titleBox)}>
      <span className={styles.light}></span>
      <h2 className={styles.title}>{title}</h2>
    </div>
  );
}
