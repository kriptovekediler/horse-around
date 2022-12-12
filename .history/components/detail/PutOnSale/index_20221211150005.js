import React, { useEffect, useState } from "react";
import Head from "next/head";
import Layout from "../../layout";
import { Title } from "../../profile";
import { Input, ToogleCheckbox, Button } from "../../formElement";
import axios from "axios";
import { useAccount } from "../../web3/hooks";
import { useWeb3 } from "../../web3/providers";
import { getTransitionDirection } from "antd/lib/_util/motion";
import marketplaceNFT from "../../../contract/marketplaceNFT.json";
import { FaSignInAlt } from "react-icons/fa";
import { ethers } from "ethers";
import { useRouter } from "next/router";
import { getCookie } from "cookies-next";

export default function PutOnSale({ horse, user }) {
  const [price, setPrice] = useState();
  const [sellingPercent, setSellingPercent] = useState();
  const { account } = useAccount();
  const { contractNFT, contractMarketplace, web3 } = useWeb3();
  const [onSale, setOnSale] = useState();
  const router = useRouter();
  const [status, setStatus] = useState();

  useEffect(() => {
    console.log("horse", horse?.saleInfo.signature);
  }, [horse]);

  useEffect(() => {
    for (let i = 0; i < user?.myHorses?.length; i++) {
      setStatus(user?.myHorses[i].status);
    }
  }, [user]);

  const listItem = async (e) => {
    e.preventDefault();
    const rpc = "https://rpc.ankr.com/polygon_mumbai";
    const provider = new ethers.providers.JsonRpcProvider(rpc);
    const wssProvider = new ethers.providers.Web3Provider(window.ethereum);
    const wssSigner = wssProvider.getSigner();
    const blockNumber = await provider.getBlockNumber();
    console.log(blockNumber);
    const contract = new ethers.Contract(
      "0x5d2B296eE14156E680BBD4af3171A7A4eA6B40C3",
      marketplaceNFT,
      wssSigner
    );
    await contract.listItem(
      "0xecF58b3DE1D3B4C6b5aF5DA51430a902654aC0F9",
      horse?.horseId,
      "0",
      sellingPercent,
      "0x0000000000000000000000000000000000000000",
      ethers.utils.parseEther(price),
      blockNumber
    );

    await axios
      .post("http://127.0.0.1:8000/put_on_sale", {
        publicAddress: account?.data,
        token: getCookie("access_token"),
        horseId: horse?.horseId,
        price: ethers.utils.parseEther(price).toString(),
        onMarket: Number(sellingPercent),
      })
      .then(setOnSale(true));
    router.push(`/profile/`);
  };

  const remove = async () => {
    const rpc = "https://rpc.ankr.com/polygon_mumbai";
    const provider = new ethers.providers.JsonRpcProvider(rpc);
    const wssProvider = new ethers.providers.Web3Provider(window.ethereum);
    // await wssProvider.send("eth_requestAccounts", []);
    const wssSigner = wssProvider.getSigner();
    const signer = provider.getSigner();
    const contract = new ethers.Contract(
      "0x1d1B40AAB15db4389b99eB544Fdc0Ab395B66000",
      marketplaceNFT,
      wssSigner
    );
    await contract
      .cancelListing(
        "0x684FbE76F185b7Fd5CAa2752bd69528e9c4919ad",
        horse?.horseId
      )
      .then(setOnSale(false));
    await axios
      .post("http://127.0.0.1:8000/remove_from_sale", {
        horseId: horse.horseId,
        publicAddress: account.data,
      })
      .then(router.push(`/profile`));
  };

  return (
    <>
      <Head>
        <title>HorseAround </title>
        <meta name="description" content="HorseAround" />
        <link rel="icon" href="/favicon.png" />
      </Head>
      <Layout page>
        {!onSale && status === 2 ? (
          <div className="grid grid-cols-4 gap-20 text-white">
            <div className="col-span-3">
              <Title title="Put On Sale" />
              <form className="grid grid-cols-12 gap-4">
                <div className="col-span-4">
                  <Input
                    text="Price Per Item"
                    placeholder="1 ETH"
                    onChange={(e) => setPrice(e.target.value)}
                  />
                </div>
                <div className="col-span-4">
                  <Input
                    text="Selling Amount"
                    placeholder="0"
                    onChange={(e) => setSellingPercent(e.target.value)}
                  />
                </div>
              </form>
              <div className="my-4">
                <Button onClick={(e) => listItem(e)}>Submit</Button>
              </div>
            </div>
          </div>
        ) : onSale || status === 3 ? (
          <>
            <Title title="Already on Sale!" />
            <div className="my-4">
              <Button onClick={() => remove()}>Remove</Button>
            </div>
          </>
        ) : (
          <Title title="Already on Auction!" />
        )}
      </Layout>
    </>
  );
}
