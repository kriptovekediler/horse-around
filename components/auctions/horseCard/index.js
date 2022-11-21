import cn from "classnames";
import Link from "next/link";
import { Space } from "antd";
import { FaHeart, FaArrowUp, FaArrowDown } from "react-icons/fa";
import styles from "./styles.module.css";

export default function CardItem({ name, image, ownerName, price, id, web3, sex, age, info }) {
  return (
    <div className={styles.cardItem}>
      <div className={styles.cardItemImageBox}>
        <img src={`${image}`} width="100%" />
        {info === "All Sales" && (
            <span className={styles.cardPrice}>{web3?.utils?.fromWei(price || "0",'ether')} ETH</span>
        )}
      </div>

      <div className={styles.userInfo}>
        <Space className="w-full justify-between ">
          <span className="text-base 2xl:text-xl font-PoppinsSemiBold">
            {name}
          </span>
          <span className="text-base 2xl:text-xl text-goldMetallic font-PoppinsSemiBold">
            ID {id}
          </span>
        </Space>
        <Space className="w-full justify-between ">
          <span className="text-base 2xl:text-xl">Spanish, {sex}, {age}Y</span>
          <div className="text-base 2xl:text-xl text-goldMetallic font-PoppinsSemiBold flex gap-2 items-center">
            <FaHeart className="text-white" /> 114
          </div>
        </Space>
        <Space className="w-full justify-between items-center mt-2">
          <Space className="gap-2 items-center mt-2">
            <img
              src="https://i.pravatar.cc/300"
              className={styles.userAvatar}
            />
            @{ownerName}
          </Space>
          <FaArrowUp className="fill-[#34A853] text-xl" />
          {/* <FaArrowDown className="fill-[#f00] text-xl" /> */}
        </Space>
      </div>
    </div>
  );
}