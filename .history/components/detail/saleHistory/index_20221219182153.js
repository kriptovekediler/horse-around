import Link from "next/link";
import { Table } from "antd";
import styles from "./styles.module.css";
import { useEffect, useState } from "react";
import { useWeb3 } from "../../web3/providers/";
import axios from "axios";
import { useAccount } from "../../web3/hooks";

export default function SaleHistory({ horse }) {
  const { web3 } = useWeb3();
  const [myUserInfo, setMyUserInfo] = useState();
  const { account } = useAccount();
  useEffect(() => {
    console.log(horse.saleHistory.length);
  }, [horse]);

  useEffect(() => {
    toast.error("This didn't work.", {
      position: "top-center",
    });

    axios
      .post("https://horse-around-app.herokuapp.com/get_user", {
        publicAddress: account?.data,
      })
      .then((res) => {
        setMyUserInfo(res.data.detail?.user);
      });
  }, [myUserInfo]);

  const columns = [
    {
      title: "Date",
      dataIndex: "date",
      render: (text) => (
        <span className="text-goldMetallic block text-center text-lg sm:text-sm md:text-sm">
          {text}
        </span>
      ),
    },
    {
      title: "Saler",
      dataIndex: "saler",
      render: (text) => (
        <span className="text-white block text-center text-lg sm:text-sm md:text-sm">
          {text}
        </span>
      ),
    },
    {
      title: "Purchaser",
      dataIndex: "purchaser",
      render: (text) => (
        <span className="text-white block text-center text-lg sm:text-sm md:text-sm">
          {text}
        </span>
      ),
    },
    {
      title: "Amount Left",
      dataIndex: "sellingPercent",
      render: (text) => (
        <span className="text-white block text-center text-lg sm:text-sm md:text-sm">
          {text}
        </span>
      ),
    },
    {
      title: "Price",
      dataIndex: "price",
      render: (text) => (
        <span className="text-white block text-center text-lg sm:text-sm md:text-sm">
          {text}
        </span>
      ),
    },
  ];
  const data = [];

  for (let i = 0; i < horse.saleHistory.length; i++) {
    data.push({
      key: i,
      date: horse.saleHistory[i].date,
      saler: (
        <a target={"_blank"} href={`/owner/${horse.saleHistory[i].seller}`}>
          {horse.saleHistory[i].seller}
        </a>
      ),
      purchaser: (
        <a target={"_blank"} href={`/owner/${horse.saleHistory[i].buyer}`}>
          {horse.saleHistory[i].buyer}
        </a>
      ),
      sellingPercent: `${horse?.saleHistory[i].amountBought}`,
      price: `${
        web3.utils.fromWei(horse.saleHistory[i].price, "ether") *
        horse?.saleHistory[i].amountBought
      } MATIC`,
    });
  }
  return (
    <div className={styles.box}>
      <div className="grid grid-cols-12 md:grid-cols-1 sm:grid-cols-1 gap-10 md:gap-10 sm:gap-0 text-white mb-10">
        <div className="col-span-9 md:col-span-12 sm:col-span-12 border-r-2 border-[#FFFFFF1A] pr-10 md:pr-0 sm:pr-0 md:border-0 sm:border-0">
          <Table
            className="sale-history"
            columns={columns}
            dataSource={data}
            pagination={false}
            scroll={{
              y: 420,
            }}
          />
        </div>
        <div className="col-span-3 md:col-span-12 sm:col-span-12">
          <h2 className={styles.title}>Shareholder</h2>
          <>
            {horse?.shareHolders?.map((shareholder, index) => (
              <div className={styles.shareholders}>
                <img src="https://i.pravatar.cc/80" className="rounded-md" />
                <div>
                  <div className="flex items-center justify-between flex-wrap w-full text-sm 2xl:text-lg mb-2">
                    <span className="mr-4">Owner</span>{" "}
                    <span>%{shareholder?.percentage / 100}</span>
                  </div>
                  <Link href="#">
                    <a className="font-PoppinsSemiBold text-base 2xl:text-lg hover:text-white">
                      {`@${shareholder?.publicAddress.slice(
                        0,
                        5
                      )}...${shareholder?.publicAddress.slice(-5)}`}
                    </a>
                  </Link>
                </div>
              </div>
            ))}
          </>
        </div>
      </div>
    </div>
  );
}
