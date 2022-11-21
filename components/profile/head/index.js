import Image from "next/image";
import Link from "next/link";
import cn from "classnames";
import styles from "./styles.module.css";

export default function ProfileHead() {
  return (
    <div className={cn(styles.head)}>
      <img src="../bg/profile.png" className="opacity-0 w-full" />
      <div className={styles.headBox}>
        <h1 className={styles.title}>Profile</h1>
        <span className={styles.subTitle}>
          Lorem ipsum dolor sit amet, consectetur dipiscing{" "}
        </span>
      </div>
    </div>
  );
}
