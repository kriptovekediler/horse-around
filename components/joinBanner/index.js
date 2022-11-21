import cn from "classnames";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";
import styles from "./styles.module.css";

export default function Banner() {
  return (
    <div className={cn(styles.banner)}>
      <div>
        <span className={styles.text1}>
          Looking for the right horse or to sell your horse to the right people?
        </span>
        <h2 className={styles.title}>Join the Community!</h2>
        <span className={styles.subTitle}>
          Start selling your horses and gain huge profits!
        </span>
      </div>
      <Link href="">
        <a className={styles.joinButton}>Join Now</a>
      </Link>
    </div>
  );
}
