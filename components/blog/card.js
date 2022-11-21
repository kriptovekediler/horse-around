import React from "react";
import Link from "next/link";
import { Space } from "antd";
import Title from "../title";
import { MdMessage, MdOutlineFavorite } from "react-icons/md";
import styles from "./styles.module.css";

export default function BlogBox() {
  return (
    <div className="relative block">
        <div
          className={styles.cardImage}
          style={{ backgroundImage: `url('https://i.pravatar.cc/300')` }}
        >
        <Link href="">
          <a className="">
          <img src="../shop/4.png" className="rounded-lg  w-full hidden" />
          </a>
        </Link>
        </div>
        <div className={styles.gridBoxContainer}>
          <div className={styles.gridBoxInfo}>
            <span className={styles.date}>Category - 20 JUL. 2022</span>
            <h3 className={styles.title}>Clothing And Equipment</h3>
            <p className={styles.description}>
              It is a long established fact that a reader will be distracted by
              the readable content of a page when looking at its layout. The
              point of using Lorem Ipsum is that it has a more or less normal
              distribution.
            </p>
          </div>
          <div className={styles.userBox}>
            <Space className="w-full justify-between">
              <div className={styles.userInfo}>
                <img
                  src="https://i.pravatar.cc/300"
                  className={styles.userAvatar}
                />
                <Link href={`/profile/`}>
                  @wow
                </Link>
              </div>
              <div className="flex gap-4 text-lg">
                <span className="text-white flex items-center gap-1">
                  <MdOutlineFavorite /> 24
                </span>
                <span className="text-white  flex items-center gap-1">
                  <MdMessage /> 18
                </span>
              </div>
            </Space>
          </div>
        </div>
        </div>
  );
}