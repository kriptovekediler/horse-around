import Image from "next/image";
import Link from "next/link";
import SearchBox from "../search/index";
import styles from "./styles.module.css";

export default function UnderConstructionHead() {
  return (
    <div className={styles.box}>
      <div className={styles.boxContent}>
        <div className="text-center w-2/4 mx-auto">
          <h2 className={styles.title}>Under Construction</h2>
          <h2 className={styles.subTitle}>
            This feature is coming soon, we are working very hard to give you
            the best experience.
          </h2>
          <Link href="">
            <a className={styles.button}>Subscribe</a>
          </Link>
        </div>
      </div>
    </div>
  );
}
