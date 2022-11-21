import Link from "next/link";
import { Table } from "antd";

import { MdAccessTime, MdChevronRight, MdSend } from "react-icons/md";

import styles from "./styles.module.css";

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

export default function SharesOnAuction() {
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
      title: "Owner Percent",
      dataIndex: "ownerPercent",
      sorter: (a, b) => a.ownerPercent - b.ownerPercent,
      render: (text) => (
        <span className="text-white block text-center text-lg sm:text-sm md:text-sm">
          {text}
        </span>
      ),
    },
    {
      title: "Selling Percent",
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
      title: "Reserved Price",
      dataIndex: "reservedPrice",
      sorter: (a, b) => a.reservedPrice - b.reservedPrice,
      render: (text) => (
        <span className="text-white block text-center text-lg sm:text-sm md:text-sm">
          {text}
        </span>
      ),
    },
    {
      title: "Buy or Place e Bid",
      dataIndex: "actionButton",
      render: (actionButton) => (
        <button className="bg-[#39250B] text-white hover:bg-goldMetallic transition text-lg sm:text-sm md:text-sn rounded-md h-10 px-2 w-full flex items-center justify-between gap-2">
          {actionButton % 2 == 0 ? (
            <>
              <span>Buy Now</span>
              <MdChevronRight className="text-2xl" />
            </>
          ) : (
            <>
              <div>
                <MdAccessTime className="inline-block" /> Place a Bid...
              </div>
              <MdSend />
            </>
          )}
        </button>
      ),
    },
  ];
  const data = [];

  for (let i = 0; i < 100; i++) {
    data.push({
      key: i,
      owner: {
        name: "Alexia Cambell",
        userName: "@AlexiaCambell",
        avatar: "https://i.pravatar.cc/80",
      },
      ownerPercent: "%20",
      sellingPercent: `%8`,
      price: `1500 $ OR 2.6 ETH`,
      reservedPrice: `8900 $ OR 6.8 ETH`,
      actionButton: i,
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
