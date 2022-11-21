import Image from "next/image";
import Link from "next/link";
import cn from "classnames";
import { Space } from "antd";
import styles from "./styles.module.css";
import { useEffect, useState } from "react";

export default function ProfileCard( { user } ) {
  const [registration, setRegistration] = useState();
  useEffect(() => {
    console.log("user",user);
    const date = new Date(user?.detail.user?.registrationDate * 1000).toLocaleString("en-US")
    setRegistration(date);
  }, [user])
  return (
    <div className={cn(styles.card)}>
      <div className={cn(styles.avatarBox)}>
        {user ? (
          <Image src={user?.detail?.user?.image} width={150} height={150} objectFit="cover" className={styles.avatar} />
        ): (
          <div class="flex justify-center items-center w-full h-48 bg-gray-300 rounded sm:w-96 dark:bg-gray-700">
            <svg class="w-12 h-12 text-gray-200" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" fill="currentColor" viewBox="0 0 640 512"><path d="M480 80C480 35.82 515.8 0 560 0C604.2 0 640 35.82 640 80C640 124.2 604.2 160 560 160C515.8 160 480 124.2 480 80zM0 456.1C0 445.6 2.964 435.3 8.551 426.4L225.3 81.01C231.9 70.42 243.5 64 256 64C268.5 64 280.1 70.42 286.8 81.01L412.7 281.7L460.9 202.7C464.1 196.1 472.2 192 480 192C487.8 192 495 196.1 499.1 202.7L631.1 419.1C636.9 428.6 640 439.7 640 450.9C640 484.6 612.6 512 578.9 512H55.91C25.03 512 .0006 486.1 .0006 456.1L0 456.1z"/></svg>
          </div>
        )}
      </div>
      <h3 className={cn(styles.userName,"mt-3")}>@{user?.detail.user?.username}</h3>
      <span className={styles.userDesc}>
        {user?.detail.user?.bio}
      </span>
      <button disabled className={cn(styles.button, styles.base,"cursor-not-allowed")}>Follow</button>
      <button disabled className={cn(styles.button, styles.dark,"cursor-not-allowed")}>Send a Message</button>
      <div className="mt-6">
        <Space className="justify-between w-full mb-2">
          <span className="text-sm 2xl:text-base">Follower</span>
          <span className="text-base 2xl:text-xl font-PoppinsSemiBold">
            0
          </span>
        </Space>
        <Space className="justify-between w-full mb-2">
          <span className="text-sm 2xl:text-base">Following</span>
          <span className="text-base 2xl:text-xl font-PoppinsSemiBold">
            0
          </span>
        </Space>
        <Space className="justify-between w-full mb-2">
          <span className="text-sm 2xl:text-base">Current Horse</span>
          <span className="text-base 2xl:text-xl font-PoppinsSemiBold">{user?.detail.user?.myHorses.length}</span>
        </Space>
      </div>
      <div className="text-sm text-center mt-5">Member since {registration}</div>
    </div>
  );
}