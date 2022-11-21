import Image from "next/image";
import Link from "next/link";
import cn from "classnames";
import { ProfileCard } from "../index";
import styles from "./styles.module.css";

export default function ProfileNav() {
  return (
    <div className={cn(styles.navBox)}>
      <div className={cn(styles.userBox)}>
        <ProfileCard />
      </div>
      <div className={cn(styles.auctionsBox)}>
        <span>You dont have any auctions waiting</span>
        <Link href="">
          <a className={styles.button}>Find</a>
        </Link>
      </div>
    </div>
  );
}
