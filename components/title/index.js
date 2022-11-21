import cn from "classnames";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";
import styles from "./styles.module.css";

export default function Title({ title, subTitle, action, actionText }) {
  return (
    <div className={cn(styles.titleBox, action ? styles.titleActionBox : "")}>
      <div>
        <span className={styles.light}></span>
        <h2 className={styles.title}>{title}</h2>
        <span className={styles.subTitle}>{subTitle}</span>
      </div>
      {action && (
        <Link href="">
          <a className={styles.actionButton}>
            {actionText} <FaArrowRight />
          </a>
        </Link>
      )}
    </div>
  );
}
