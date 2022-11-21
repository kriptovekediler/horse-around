import React from "react";
import Link from "next/link";
import Title from "../title";

import styles from "./styles.module.css";

export default function HomeShoppingBox() {
  return (
    <div className={styles.box}>
      <Title
        title="For the rider and owners"
        subTitle="Lorem ipsum dolor sit amet, consectetur adipiscing elit. "
        action
        actionText="View All"
      />
      <div className={styles.gridBox}>
        <Link href="">
          <a className="relative block">
            <img src="../shop/1.png" className="rounded-lg  w-full" />
            <div className={styles.gridBoxInfo}>
              <h3 className={styles.title}>Saddles</h3>
            </div>
          </a>
        </Link>

        <Link href="">
          <a className="relative block">
            <img src="../shop/2.png" className="rounded-lg  w-full" />
            <div className={styles.gridBoxInfo}>
              <h3 className={styles.title}>Training Accessories</h3>
            </div>
          </a>
        </Link>
        <Link href="">
          <a className="relative block">
            <img src="../shop/3.png" className="rounded-lg  w-full" />
            <div className={styles.gridBoxInfo}>
              <h3 className={styles.title}>Grooming And Health</h3>
            </div>
          </a>
        </Link>
        <Link href="">
          <a className="relative block">
            <img src="../shop/4.png" className="rounded-lg  w-full" />
            <div className={styles.gridBoxInfo}>
              <h3 className={styles.title}>Clothing And Equipment</h3>
            </div>
          </a>
        </Link>
      </div>
      <div className="text-center mt-20">
        <Link href="">
          <a className={styles.button}>Start Searching</a>
        </Link>
      </div>
    </div>
  );
}
