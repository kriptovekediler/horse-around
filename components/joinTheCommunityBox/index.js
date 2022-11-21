import React from "react";
import Title from "../title/";

import styles from "./styles.module.css";

export default function JoinTheCommunityBox() {
  return (
    <div className={styles.contentBox}>
      <Title
        title="Join the Community"
        subTitle="Lorem ipsum dolor sit amet, consectetur adipiscing elit. "
      />
      <div className={styles.gridBox}>
        <div className={styles.gridItem}>
          <img src="../icons/boost.svg" className="inline-block" />
          <h2 className={styles.title}>Boost your Incomes</h2>
          <span className={styles.description}>
            MetaMask is an extension for accessing Ethereum enabled distributed
            applications.
          </span>
        </div>
        <div className={styles.gridItem}>
          <img src="../icons/menage.svg" className="inline-block" />
          <h2 className={styles.title}>Menage Easly</h2>
          <span className={styles.description}>
            MetaMask is an extension for accessing Ethereum enabled distributed
            applications, or "Dapps" in your normal Chrome browser!
          </span>
        </div>
        <div className={styles.gridItem}>
          <img src="../icons/iconoir_pc-check.svg" className="inline-block" />
          <h2 className={styles.title}>Reach New Customers</h2>
          <span className={styles.description}>
            MetaMask is an extension for accessing Ethereum enabled distributed
            applications, or "Dapps" in your normal Chrome browser!
          </span>
        </div>
      </div>
    </div>
  );
}
