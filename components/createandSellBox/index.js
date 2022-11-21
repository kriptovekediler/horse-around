import React from "react";
import Link from "next/link";
import Title from "../title";

import styles from "./styles.module.css";

export default function CreateandSellBox() {
  return (
    <div className={styles.box}>
      <Title
        title="Create and Sell Physical Assets and NFTs"
        subTitle="Lorem ipsum dolor sit amet, consectetur adipiscing elit. "
      />
      <div className={styles.flexBox}>
        <div className={styles.image}>
          <img src="../createNFT.png" />
        </div>
        <div className={styles.steps}>
          <div>
            <h4 className={styles.stepTitle}>#01 Set up your wallet</h4>
            <span className={styles.stepDesc}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.{" "}
            </span>
          </div>
          <div>
            <h4 className={styles.stepTitle}>
              #02 Add your NFT’s and physical assets
            </h4>
            <span className={styles.stepDesc}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.{" "}
            </span>
          </div>
          <div>
            <h4 className={styles.stepTitle}>#03 Start Selling</h4>
            <span className={styles.stepDesc}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.{" "}
            </span>
          </div>
          <div>
            <Link href="">
              <a className={styles.button}>Join Now</a>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
