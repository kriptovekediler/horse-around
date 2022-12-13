import Link from "next/link";
import { Table } from "antd";

import { MdAccessTime, MdChevronRight, MdSend } from "react-icons/md";
import { useWeb3 } from "../../web3/providers/";
import styles from "./styles.module.css";
import axios from "axios";
import { useState, useEffect } from "react";
import { useAccount } from "../../web3/hooks/";
import marketplaceNFT from "../../../contract/marketplaceNFT.json";
import { ethers } from "ethers";
import { useRouter } from "next/router";

const UserCard = ({ avatarUrl, name, userName }) => {
  console.log(name);
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
export default function SharesOnSale({ horse, setSharesModal }) {
  const { contractNFT, contractMarketplace, web3 } = useWeb3();
  const { account } = useAccount();
  console.log("userssssss", users);

  const [state, setState] = useState();
  const [leftAmount, setAmount] = useState();
  const [buyNowState, setBuyNowState] = useState();
  const [id, setId] = useState();
  const router = useRouter();
  let lastIndex = horse?.saleHistory?.length;
  console.log("lastIndex", lastIndex);

  useEffect(() => {
    setBuyNowState(horse?.saleHistory[lastIndex]?.ps);
  }, []);
  console.log("share on sale");

  useEffect(() => {}, []);

  console.log("sellerInfo", horse?.saleInfo[0]?.sellerAddress);
  console.log("sellerInfoV2", horse?.saleInfo);
  console.log("PriceV1", horse.saleInfo[0].price);
  // console.log("USERS:", users);
  // console.log("Res", resp);

  const handleLeftAmount = (e) => {
    setAmount(e.target.value);
  };

  console.log("Sale Info:", horse?.saleInfo[0]?.price * leftAmount);
  console.log("Id Info:", horse?.horseId);
  console.log("Amount Info", leftAmount);

  const buyItem = async (e, id) => {
    e.preventDefault();

    setId(id);
    console.log("PriceV2", horse.saleInfo[id].price);

    const rpc = "https://rpc.ankr.com/polygon_mumbai";
    const provider = new ethers.providers.JsonRpcProvider(rpc);
    const wssProvider = new ethers.providers.Web3Provider(window.ethereum);
    // await wssProvider.send("eth_requestAccounts", []);
    const wssSigner = wssProvider.getSigner();
    const signer = provider.getSigner();
    const blockNumber = await provider.getBlockNumber();
    console.log(blockNumber);
    const contract = new ethers.Contract(
      "0x86186a02968db7Fe9025410aea4Ce40eA1450de0",
      marketplaceNFT,
      wssSigner
    );
    await contract.buyItem(
      "0x39FDE69cc3F6855D3De0Df7693dE0b0AabB99C4a",
      horse?.horseId,
      leftAmount,
      "0x0000000000000000000000000000000000000000",
      horse?.saleInfo[id]?.sellerAddress.toString(),
      { value: (horse.saleInfo[id].price * leftAmount).toString() }
    );

    console.log("leftAmount", leftAmount);
    setId(id);
    console.log("saleId: ", horse.saleInfo[id]?.saleId);
    await axios
      .post("https://horse-around-app.herokuapp.com/buy_horse", {
        horseId: horse.horseId,
        buyerAddress: account?.data,
        sellerAddress: horse.saleInfo[id].sellerAddress,
        price: horse.saleInfo[id].price,
        ps: Number(leftAmount),
        totalAmount: Number(horse.shareHolders[0].shareLeft),
        saleId: horse.saleInfo[id].saleId,
      })
      .then((res) => {
        console.log(res);
        console.log(horse.totalAmount);
        console.log("saleId: ", horse.saleInfo[id].saleId);
        console.log("Seller by Id:", horse?.saleInfo[id]?.sellerAddress);
        router.push(`/profile`);
        // router.push("/profile");
      })
      .catch((err) => {
        console.log(err);
      });

    setSharesModal(false);
  };

  console.log(horse);
  console.log("Account", account?.data);

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
                <span
                  onClick={(e) => buyItem(e, info["id"])}
                  className="min-width: 50%"
                >
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
      ownerPercent: `${horse?.shareHolders[i]?.percentage}`, // Changed to show total mint amount
      sellingPercent: `${horse?.saleInfo[i]?.onMarket}`,
      price: `${
        web3?.utils?.fromWei(horse?.saleInfo[i]?.price, "ether") * 1500
      } $ OR ${web3?.utils?.fromWei(horse?.saleInfo[i]?.price, "ether")} ETH`,
      actionButton: {
        id: i,
        saleInfo: horse.saleInfo[i],
      },
    });
  }
  // console.log(state);

  // for (let i = 0; i < 1; i++) {
  //   data.push({
  //     key: i,
  //     owner: {
  //       name: "Alexia Cambell",
  //       userName: `@${horse?.saleInfo[0]?.sellerAddress.slice(
  //         0,
  //         5
  //       )}...${horse?.saleInfo[0]?.sellerAddress.slice(-5)}`,
  //       avatar: "https://i.pravatar.cc/80",
  //     },
  //     ownerPercent: `${horse?.totalAmount}`, // Changed to show total mint amount
  //     sellingPercent: `${horse?.saleInfo[0]?.totalAmount}`,
  //     price: `${
  //       web3?.utils?.fromWei(horse?.saleInfo[0]?.price, "ether") * 1500
  //     } $ OR ${web3?.utils?.fromWei(horse?.saleInfo[0]?.price, "ether")} ETH`,

  //     actionButton: {
  //       id: i,
  //       saleInfo: horse?.saleInfo[0],
  //     },
  //   });
  // }

  return (
    <div className={styles.box}>
      <Table columns={columns} dataSource={data} pagination={false} />
    </div>
  );
}

export async function getServerSideProps() {
  const res = await axios.get("127.0.0.1:8000/get_users");
  const users = await res?.data?.detail;
  console.log("res", res);
  console.log("users", users);
  return {
    props: {
      users: users,
      resp: res,
    },
  };
}
