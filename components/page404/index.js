import Image from "next/image";
import Link from "next/link";
import SearchBox from "../search/index";
import styles from "./styles.module.css";

export default function Page404() {
  return (
    <div className={styles.box}>
      <div className={styles.boxContent}>
        <div className="text-center w-3/4 mx-auto">
          <h2 className={styles.title}>404 Not Found</h2>
          <h2 className={styles.subTitle}>
            We’re sorry, but the page you were looking for doesn’t exist.
          </h2>
        </div>
      </div>
    </div>
  );
}
