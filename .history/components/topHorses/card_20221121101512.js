import cn from "classnames";
import Link from "next/link";
import Image from "next/image";
import { FaHeart, FaArrowUp, FaArrowDown } from "react-icons/fa";
import horse from "../../public/horse/horse1.png";
import styles from "./styles.module.css";
import { useWeb3 } from "../web3/providers";

export default function CardItem({ number, horse }) {
  const { web3 } = useWeb3();
  console.log(number);
  return (
    <div className={styles.cardBox}>
      <div className={styles.number}>{number}</div>
      <div className={styles.topHorseInfoBox}>
        <img
          src={horse?.image}
          width={100}
          height={50}
          objectFit="cover"
          className={styles.horseInfoImg}
        />
        <div className={styles.horseInfo}>
          <div className="flex w-full justify-between shrink-0">
            <div>
              <span className={styles.horseName}>@{horse?.ownerName}</span>
              <span className={styles.statusBox}>
                <span className={styles.statusTitle}>{horse?.horseName} </span>
                <FaArrowUp className="text-green-500" />
              </span>
            </div>
            <span className="flex text-goldMetallic text-xl items-center gap-2">
              50 <FaHeart />
            </span>
          </div>
          <div className="flex w-full justify-between items-end shrink-0">
            <span className={styles.horseName}>
              {web3?.utils.fromWei(
                horse?.saleHistory[horse?.saleHistory.length - 1].price,
                "ether"
              )}{" "}
              ETH or{" "}
              {web3?.utils.fromWei(
                horse?.saleHistory[horse?.saleHistory.length - 1].price,
                "ether"
              ) * 1500}{" "}
              ${" "}
            </span>
            <div className="text-white text-sm text-end">
              <p>
                Earnings : <strong>{horse?.earning}</strong>
              </p>
              <p>
                Total Race : <strong>{horse?.raceCount}</strong>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
