import Image from "next/image";
import Link from "next/link";
import cn from "classnames";
import SearchBox from "../search/index";
import styles from "./styles.module.css";

export default function PageHead({ title, subTitle, bg, imgSrc, noBottom }) {
  return (
    <div className={cn(styles.home, bg)}>
      <img src={imgSrc} className="opacity-0 w-full" />
      {!noBottom && (
        <img src="./home/bgAnim.png" className="-bottom-14 absolute w-full" />
      )}      <div className={styles.headTextBox}>
        <h2 className={styles.title}>{title}</h2>
        <span className={styles.subTitle}>{subTitle}</span>
      </div>
    </div>
  );
}
