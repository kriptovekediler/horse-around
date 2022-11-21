import Link from "next/link";
import { Table } from "antd";

import { MdAccessTime, MdChevronRight, MdSend } from "react-icons/md";
import { useWeb3 } from "../../web3/providers/";
import styles from "./styles.module.css";
import axios from "axios";
import { useState, useEffect } from "react";

const UserCard = ({ avatarUrl, name, userName }) => {
  return (
    <>
      <div className="flex items-center gap-4">
        <img
          src={avatarUrl}
          className="rounded-md sm:h-10 sm:w-10 md:h-10 md:w-10"
        />
        <div>
          <span className="block text-white text-xl sm:text-sm md:text-sm mb-2 font-PoppinsSemiBold">
            {name}
          </span>
          <Link href="">
            <a className="block text-white text-lg sm:text-sm md:text-sm ">
              {userName}
            </a>
          </Link>
        </div>
      </div>
    </>
  );
};

export default function SharesOnSale({ horse, account }) {
  const { web3 } = useWeb3();
  const [state, setState] = useState();
  const [showBuy, setShowBuy] = useState(false);
  const [leftAmount, setAmount] = useState();

  const handleLeftAmount = (e) => {
    setAmount(e.target.value);
  };

  const submitHandleAmount = () => {
    horse.saleInfo.map((i) => {
      console.log(i.ps - leftAmount);
    });
  };

  console.log(horse);

  console.log("x", horse);
  const columns = [
    {
      title: "Owner",
      dataIndex: "owner",
      width: "20%",
      sorter: (a, b) => a.owner.name - b.owner.name,
      render: (owner) => (
        <UserCard
          avatarUrl={owner.avatar}
          name={owner.name}
          userName={owner.userName}
        />
      ),
    },
    {
      title: "Owner Quantity",
      dataIndex: "ownerPercent",
      sorter: (a, b) => a.ownerPercent - b.ownerPercent,
      render: (text) => (
        <span className="text-white block text-center text-lg sm:text-sm md:text-sm">
          {text}
        </span>
      ),
    },
    {
      title: "Selling Quantity",
      dataIndex: "sellingPercent",
      sorter: (a, b) => a.sellingPercent - b.sellingPercent,
      render: (text) => (
        <span className="text-white block text-center text-lg sm:text-sm md:text-sm">
          {text}
        </span>
      ),
    },
    {
      title: "Price",
      dataIndex: "price",
      sorter: (a, b) => a.price - b.price,
      render: (text) => (
        <span className="text-white block text-center text-lg sm:text-sm md:text-sm">
          {text}
        </span>
      ),
    },
    {
      title: "Buy",
      dataIndex: "actionButton",
      render: (info) => (
        <button className="bg-[#39250B] text-white hover:bg-goldMetallic transition text-lg sm:text-sm md:text-sn rounded-md h-10 px-2 w-full flex items-center justify-between gap-2">
          <>
            <Link href={`/detail/${horse?.horseId}/saleinfo/${info["id"]}`}>
              <a className="flex" target={"_self"}>
                <span onClick={submitHandleAmount} className="min-width: 50%">
                  Buy Now
                </span>
                <MdChevronRight className="text-2xl" />
              </a>
            </Link>
            <input
              className="bg-[#39250B] min-width: 50%"
              type="text"
              onChange={handleLeftAmount}
              value={leftAmount}
            />
          </>
        </button>
      ),
    },
  ];
  const data = [];

  for (let i = 0; i < horse.saleInfo.length; i++) {
    data.push({
      key: i,
      owner: {
        name: "Alexia Cambell",
        userName: `@${horse.saleInfo[i].sellerAddress.slice(
          0,
          5
        )}...${horse.saleInfo[i].sellerAddress.slice(-5)}`,
        avatar: "https://i.pravatar.cc/80",
      },
      ownerPercent: `${horse.totalAmount}`, // Changed to show total mint amount
      sellingPercent: `${horse.saleInfo[i].ps}`,
      price: `${
        web3?.utils?.fromWei(horse?.saleInfo[i].price, "ether") * 1500
      } $ OR ${web3?.utils?.fromWei(horse?.saleInfo[i].price, "ether")} ETH`,
      actionButton: {
        id: i,
        saleInfo: horse.saleInfo[i],
      },
    });
  }

  console.log(state);

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
