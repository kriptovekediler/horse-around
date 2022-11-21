import Image from "next/image";
import Link from "next/link";
import SearchBox from "../search/index";
import styles from "./styles.module.css";

export default function PageHead() {
  return (
    <div className={styles.home}>
      <img src="./home/bgAnim.png" className="-bottom-14 absolute w-full" />
      <SearchBox />
    </div>
  );
}
