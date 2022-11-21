import cn from "classnames";
import Link from "next/link";
import Image from "next/image";
import horse from "../../public/horse/horse1.png";
import styles from "./styles.module.css";
import { useWeb3 } from "../web3/providers";

export default function CardItem({
  name,
  image,
  ownerName,
  id,
  price,
  ownerAddress,
}) {
  const { web3 } = useWeb3();
  return (
    <div>
      <div className={styles.cardItem}>
        <a>
          <div className={styles.cardItemImageBox}>
            <img src={`${image}`} width="100%" />
            <div className={styles.cardHorseInfo}>
              <div>
                <h3 className={styles.horseName}>{name}</h3>
                <span className={styles.horsePrice}>
                  {web3?.utils?.fromWei(price, "ether")} ETH or{" "}
                  {1500 * web3?.utils?.fromWei(price, "ether")} ${" "}
                </span>
              </div>
            </div>
          </div>
        </a>
        <div className={styles.userInfo}>
          <img src="https://i.pravatar.cc/300" className={styles.userAvatar} />
          <Link href={`/owner/${ownerAddress}`}>
            <a>@{ownerName}</a>
          </Link>
        </div>
      </div>
    </div>
  );
}
