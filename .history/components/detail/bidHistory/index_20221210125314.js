import React, { useDeferredValue, useEffect, useState } from "react";
import Link from "next/link";
import { Table } from "antd";
import { BidModal } from "../index";
import styles from "./styles.module.css";
import { MdOutlineBikeScooter } from "react-icons/md";
import axios from "axios";
import { useWeb3 } from "../../web3/providers";
import cn from "classnames";

const UserCard = ({ bidderAddress, date }) => {
  return (
    <>
      <div className="flex mx-auto items-center gap-4">
        <img
          src={"https://i.pravatar.cc/50"}
          className="rounded-md sm:h-10 sm:w-10 md:h-10 md:w-10"
        />
        <div className="ml-6">
          <Link href={`/owner/${bidderAddress}`}>
            <a className="block text-white text-xl sm:text-sm md:text-sm font-PoppinsSemiBold">
              {bidderAddress.slice(0, 7) + "..." + bidderAddress.slice(-7)}
            </a>
          </Link>
        </div>
      </div>
    </>
  );
};

export default function BidHistory({ horse, account }) {
  const { contractAuction, web3 } = useWeb3();
  const [count, setCount] = useState();
  const [user, setUser] = useState();

  useEffect(() => {
    axios
      .post("http://127.0.0.1:8000/get_user", {
        publicAddress: account,
      })
      .then((res) => {
        setUser(res.data.detail?.user);
      });
  }, [account]);

  useEffect(() => {
    setCount(horse?.auctionInfo.length - 1);
  }, [horse]);

  const acceptBid = async (tokenId, bidder, bidAmount) => {
    console.log(tokenId, bidder, bidAmount);
    await contractAuction.methods
      .acceptBid(
        tokenId,
        bidder,
        web3.utils.toWei(bidAmount.toString(), "ether")
      )
      .send({ from: account });

    await axios
      .post("http://127.0.0.1:8000/accept_a_bid", {
        publicAddress: account,
        horseId: tokenId,
        buyerAddress: bidder,
        bidAmount: bidAmount,
      })
      .then(console.log);
  };

  const columns = [
    {
      title: "Placed By",
      dataIndex: "bindUser",
      render: (bindUser) => (
        <UserCard
          bidderAddress={bindUser?.bidderAddress}
          date={bindUser?.date}
        />
      ),
    },
    {
      title: "Date",
      dataIndex: "date",
      responsive: ["md"],
      render: (text) => (
        <span className="text-white block text-center text-lg sm:text-sm md:text-sm">
          {text}
        </span>
      ),
    },
    {
      title: "Offer",
      dataIndex: "offer",
      render: (text) => (
        <span className="text-white block text-center text-lg sm:text-sm md:text-sm">
          {text}
        </span>
      ),
    },
  ];
  const data = [];

  for (
    let i = 0;
    i < horse?.auctionInfo[horse?.auctionInfo.length - 1].bidHistory.length;
    i++
  ) {
    data.push({
      key: i,
      bindUser: {
        bidderAddress:
          horse?.auctionInfo[horse?.auctionInfo.length - 1].bidHistory[i]
            .bidderAddress,
        date: horse?.auctionInfo[horse?.auctionInfo.length - 1].bidHistory[i]
          .date,
      },
      date: horse?.auctionInfo[horse?.auctionInfo.length - 1].bidHistory[i]
        .date,
      offer: (
        <div className="flex mx-auto items-center justify-end gap-10 sm:gap-2">
          <span className={cn(styles.offerAmount, "mx-auto")}>
            {web3?.utils?.fromWei(
              horse?.auctionInfo[horse?.auctionInfo.length - 1].bidHistory[i]
                .bidAmount,
              "ether"
            )}{" "}
            ETH
          </span>
        </div>
      ),
    });
  }
  return (
    <div className={styles.box}>
      <Table
        columns={columns}
        dataSource={data}
        pagination={false}
        scroll={{
          y: 800,
        }}
      />
    </div>
  );
}
