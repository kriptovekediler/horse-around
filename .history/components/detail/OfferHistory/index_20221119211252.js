import React, { useDeferredValue, useEffect, useState } from "react";
import Link from "next/link";
import { Table } from "antd";
import { BidModal } from "../index";
import styles from "./styles.module.css";
import { MdOutlineBikeScooter } from "react-icons/md";
import axios from "axios";
import { useWeb3 } from "../../web3/providers";

const UserCard = ({ user }) => {
  return (
    <>
      <div className="flex items-center gap-4">
        <img
          src={"https://i.pravatar.cc/50"}
          className="rounded-md sm:h-10 sm:w-10 md:h-10 md:w-10"
        />
        <div className="mx-auto">
          <span className="block text-white text-xl sm:text-sm md:text-sm mb-1 font-PoppinsSemiBold">
            {user?.name}
          </span>
          <Link href="">
            <a className="block text-white text-xl sm:text-sm md:text-sm font-PoppinsSemiBold">
              {user?.username}
            </a>
          </Link>
        </div>
      </div>
    </>
  );
};

export default function OfferHistory({ horse, account }) {
  const { contractAuction, web3 } = useWeb3();
  const [user, setUser] = useState();

  useEffect(() => {
    axios
      .post("https://horseaorund-server.herokuapp.com/get_user", {
        publicAddress: account,
      })
      .then((res) => {
        setUser(res.data.detail?.user);
      });
  }, [account]);

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
      .post("https://horseaorund-server.herokuapp.com/accept_a_bid", {
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

      render: (bindUser) => <UserCard user={bindUser} />,
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

  for (let i = 0; i < horse?.offerHistory.length; i++) {
    data.push({
      key: i,
      bindUser: user,
      date: horse?.offerHistory[i].date,
      offer: (
        <div className="flex items-center justify-end gap-10 sm:gap-2">
          <span className="text-white  text-lg sm:text-sm md:text-sm">
            {horse?.offerHistory[i].bidAmount} ETH
          </span>
          {horse?.publicAddress === account && (
            <button
              className=" bg-goldMetallic text-white rounded h-11 px-4 text-lg sm:text-sm md:text-sm"
              onClick={() =>
                acceptBid(horse?.horseId, bidder, amount.bidAmount)
              }
            >
              Accept
            </button>
          )}
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
