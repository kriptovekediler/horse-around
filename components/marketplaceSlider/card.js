import cn from "classnames";
import Link from "next/link";
import Image from "next/image";
import horse from "../../public/horse/horse1.png";
import styles from "./styles.module.css";
import { useWeb3 } from "../web3/providers";
import { useEffect } from "react";

export default function CardItem({ horse }) {
  const { web3 } = useWeb3();

  return (
    <div>
      <div className={styles.cardItem}>
      <Link href={`/detail/${horse?.horseId}`}>
        <a target={'_blank'}>
        <div className={styles.cardItemImageBox}>
          <img src={horse?.image} width="100%"/>
          <div className={styles.cardHorseInfo}>
            <div>
              <h3 className={styles.horseName}>{horse?.horseName}</h3>
              <span className={styles.horseInfo}>
                Italian trotter, Stallion, {horse?.age} years
              </span>
              <span className={styles.horsePrice}>{web3?.utils?.fromWei(horse?.saleInfo[horse?.saleInfo.length-1]?.price,'ether')} ETH or {web3?.utils?.fromWei(horse?.saleInfo[[horse?.saleInfo.length-1]]?.price,'ether') * 1500} $ </span>
            </div>
          </div>
        </div>
        </a>
      </Link>
        <div className={styles.userInfo}>
          <img src="https://cdn3.iconfinder.com/data/icons/vector-icons-6/96/256-512.png" className={styles.userAvatar} />
          <Link href={`/owner/${horse?.publicAddress}`}>
            <a target={'_blank'}>@{horse?.ownerName}</a>
          </Link>
        </div>
      </div>
    </div>
  );
}
