import cn from "classnames";
import Link from "next/link";
import { Space } from "antd";
import { FaHeart } from "react-icons/fa";
import { Button } from "../formElement/";
import Clock from "../clock/";
import React, { useEffect, useState } from "react";
import styles from "./styles.module.css";
import { useWeb3 } from "../web3/providers/";
import { useAccount } from "../web3/hooks/";

export default function MyHorseInfoCard({ horse }) {
  const { contractNFT, contractMarketplace, web3 } = useWeb3();
  const { account } = useAccount();

  useEffect(() => {
    console.log(horse?.saleInfo);
    console.log(contractMarketplace?._address);
  }, [account]);

  return (
    <div className="w-full">
      <div className={styles.nameBox}>
        <h2 className={styles.horseName}>{horse?.horseName}</h2>
        <span className={styles.id}>ID {horse?.horseId}</span>
      </div>

      <div className={styles.userCard}>
        <Link href="">
          <a className={styles.userAvatar}>
            <img src="https://picsum.photos/42/42/" className="rounded-lg" />
            <Link href={`/owner/${account?.data}`}>
              <span>{horse?.ownerName}</span>
            </Link>
          </a>
        </Link>
        <div>
          <h1 className={styles.id}>Quantity</h1>
          <h4 className={styles.horseName} style={{ textAlign: "right" }}>
            {horse/.saleInfo[0].ps}
          </h4>
        </div>
      </div>

      <div className={styles.description}>{horse?.preferenceDescription}</div>
      <div className="mb-10">
        <div className={styles.infoItem}>
          <span>Age</span>
          <span className={styles.yellow}>{horse?.age} Y</span>
        </div>
        <div className={styles.infoItem}>
          <span>Sex</span>
          <span className={styles.yellow}>{horse?.sex}</span>
        </div>
        <div className={styles.infoItem}>
          <span>Breed</span>
          <span className={styles.yellow}>{horse?.breederName}</span>
        </div>
        <div className={styles.infoItem}>
          <span>Dam-Sibling</span>
          <span className={styles.yellow}>
            {horse?.damName}, {horse?.damSiblingsName}
          </span>
        </div>
        <div className={styles.infoItem}>
          <span>Stallion/Mare Status</span>
          <span className={styles.yellow}>Available</span>
        </div>
        <div className={styles.infoItem}>
          <span>Generation </span>
          <span className={styles.yellow}>Gen 2</span>
        </div>
        <div className={styles.infoItem}>
          <span>Total Winnigs </span>
          <span className={styles.yellow}>48 Race</span>
        </div>
        <div className={styles.infoItem}>
          <span>Total Earnings </span>
          <span className={styles.yellow}>{horse?.earning} $ / 12.8 ETH</span>
        </div>
      </div>
    </div>
  );
}
