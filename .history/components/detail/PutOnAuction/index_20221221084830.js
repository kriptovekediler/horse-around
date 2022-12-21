import React, { useEffect, useState } from "react";
import Head from "next/head";
import Layout from "../../layout";
import { Title } from "../../profile";
import { Input, ToogleCheckbox, Button } from "../../formElement";
import axios from "axios";
import { useAccount } from "../../web3/hooks";
import { useWeb3 } from "../../web3/providers";
import { ethers } from "ethers";
import { useRouter } from "next/router";
import { Table } from "antd";
import { getCookie } from "cookies-next";

export default function PutOnAuction({ horse, user }) {
  const [auctionInfo, setAuctionInfo] = useState({
    reservedPrice: "",
    openingBid: "",
    auctionDuration: "",
  });
  const [count, setCount] = useState();
  const { account } = useAccount();
  const { contractNFT, contractMarketplace, contractAuction, web3 } = useWeb3();
  const [onAuction, setOnAuction] = useState();
  const [bidCount, setBidCount] = useState();
  const [status, setStatus] = useState();
  const router = useRouter();

  useEffect(() => {
    console.log("horse", horse?.auctionInfo);
    setBidCount(
      horse?.auctionInfo[horse?.auctionInfo.length - 1]?.bidHistory.length
    );
  }, [horse?.auctionInfo]);

  useEffect(() => {
    console.log(
      Math.floor(new Date().getTime() / 1000) + auctionInfo.auctionDuration * 60
    );
  }, [auctionInfo.auctionDuration]);

  const endAuction = async (e, horse) => {
    e.preventDefault();
    await contractAuction?.methods
      .endAuction(horse?.horseId)
      .send({
        from: account?.data,
      })
      .then((res) => {
        console.log("contract res:", res);
        axios
          .post("https://horse-around-app.herokuapp.com/end_auction", {
            buyer:
              horse?.auctionInfo[horse?.auctionInfo.length - 1]?.highestBidder,
            seller: account?.data,
            horseId: horse?.horseId,
            token: getCookie("access_token"),
          })
          .then((res) => {
            console.log("backend res", res);
            router.push("/profile");
          });
      });
  };

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
      title: "Bidder",
      dataIndex: "bidder",
      render: (text) => (
        <span className="text-white block text-center text-lg sm:text-sm md:text-sm">
          {text}
        </span>
      ),
    },
    {
      title: "Selling Percent",
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
    {
      title: "Decision",
      dataIndex: "decision",
      render: (text) => (
        <span className="text-white block text-center text-lg sm:text-sm md:text-sm">
          {text}
        </span>
      ),
    },
  ];

  const getNonce = async () => {
    const user = await axios.post(
      "https://horse-around-app.herokuapp.com/get_user",
      {
        publicAddress: account.data,
      }
    );
    return user.data.detail.user.nonce;
  };

  const submit = async (e) => {
    e.preventDefault();
    const deadline =
      Math.floor(new Date().getTime() / 1000) +
      auctionInfo.auctionDuration * 60 * 60 * 24;

    const getMessageHash = async (nonce) => {
      const msg = ethers.utils.solidityPack(
        ["address", "uint", "uint", "uint", "uint", "uint"],
        [
          account.data,
          horse.horseId,
          deadline,
          web3.utils.toWei(auctionInfo?.reservedPrice.toString(), "ether"),
          web3.utils.toWei(auctionInfo?.openingBid.toString(), "ether"),
          nonce,
        ]
      );

      const msgHash = ethers.utils.keccak256(msg);
      console.log("msg", msg);
      return msgHash;
    };

    const getSignature = async (msg) => {
      let sig = await web3.eth.personal.sign(
        msg,
        account.data,
        (err, signature) => {
          if (err) {
            console.log(err);
            return;
          }
          return signature;
        }
      );
      return sig;
    };

    const nonce = await getNonce();
    const msg = await getMessageHash(nonce);
    console.log("msg", msg);
    const sign = await getSignature(msg);
    console.log("sign", sign);

    await axios
      .post("https://horse-around-app.herokuapp.com/put_on_auction", {
        publicAddress: account.data,
        horseId: horse.horseId,
        reservedPrice: web3.utils.toWei(
          auctionInfo?.reservedPrice.toString(),
          "ether"
        ),
        openingBid: web3.utils.toWei(
          auctionInfo?.openingBid.toString(),
          "ether"
        ),
        duration: auctionInfo.auctionDuration,
        deadline: deadline,
        signature: sign,
        nonce: nonce,
      })
      .then(console.log);
    setOnAuction(true);
    router.push(`/profile/`);
  };

  useEffect(() => {
    console.log("onAuction", onAuction);
  }, [onAuction]);

  const remove = async () => {
    await contractAuction.methods
      .blockNonce(horse?.auctionInfo[horse?.auctionInfo.length - 1].nonce)
      .send({
        from: account.data,
      });
    await axios
      .post("https://horse-around-app.herokuapp.com/remove_from_auction", {
        horseId: horse.horseId,
        publicAddress: account.data,
      })
      .then((res) => {
        if (res.data.detail.status === "success") {
          setOnAuction(false);
          router.push(`/profile/`);
        } else {
          alert("something went wrong");
        }
      });
  };

  const data = [];

  if (horse?.status === 4) {
    for (
      let i = 0;
      i < horse?.auctionInfo[horse?.auctionInfo.length - 1]?.bidHistory.length;
      i++
    ) {
      data.push({
        key: i,
        date: horse?.auctionInfo[horse?.auctionInfo.length - 1]?.bidHistory[i]
          .date,
        bidder: (
          <a
            href={`/owner/${
              horse?.auctionInfo[horse?.auctionInfo.length - 1]?.highestBidder
            }`}
          >
            <span className="text-white block text-center text-lg sm:text-sm md:text-sm">
              {horse?.auctionInfo[horse?.auctionInfo.length - 1]?.bidHistory[
                i
              ].bidderAddress.slice(0, 8) +
                "..." +
                horse?.auctionInfo[horse?.auctionInfo.length - 1]?.bidHistory[
                  i
                ].bidderAddress.slice(-6)}
            </span>
          </a>
        ),
        sellingPercent: "%100",
        price: web3.utils.fromWei(
          horse?.auctionInfo[horse?.auctionInfo.length - 1]?.bidHistory[i]
            .bidAmount,
          "ether"
        ),
        decision: horse?.auctionInfo[horse?.auctionInfo.length - 1]?.deadline <
          Math.floor(new Date().getTime() / 1000) &&
          horse?.auctionInfo[horse?.auctionInfo.length - 1]?.bidHistory[i]
            .bidderAddress ===
            horse?.auctionInfo[horse?.auctionInfo.length - 1]
              ?.highestBidder && (
            <button
              className="bg-[#39250B] hover:opacity-75 text-white px-4 py-2 rounded-lg"
              onClick={(e) => endAuction(e, horse)}
            >
              End Auction
            </button>
          ),
      });
    }
  }
  return (
    <>
      <Head>
        <title>HorseAround </title>
        <meta name="description" content="HorseAround" />
        <link rel="icon" href="/favicon.png" />
      </Head>
      <Layout page>
        {!onAuction && horse?.status === 2 ? (
          <div className="grid grid-cols-4 gap-20 text-white">
            <div className="col-span-3">
              <Title title="Put On Auction" />
              <form className="grid grid-cols-12 gap-4">
                <div className="col-span-4">
                  <Input
                    text="Reserved Price"
                    placeholder="1 ETH"
                    onChange={(e) =>
                      setAuctionInfo({
                        ...auctionInfo,
                        reservedPrice: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="col-span-4">
                  <Input
                    text="Opening Bid"
                    placeholder="0.1 ETH"
                    onChange={(e) =>
                      setAuctionInfo({
                        ...auctionInfo,
                        openingBid: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="col-span-4">
                  <Input
                    text="Duration"
                    placeholder="1 day"
                    onChange={(e) =>
                      setAuctionInfo({
                        ...auctionInfo,
                        auctionDuration: e.target.value,
                      })
                    }
                  />
                </div>
              </form>
              <div className="my-4">
                <Button onClick={(e) => submit(e)}>Submit</Button>
              </div>
            </div>
          </div>
        ) : onAuction || horse?.status === 4 ? (
          <>
            <Title title="Already on Auction!" />
            <div className="my-4">
              <Button onClick={() => remove()}>Remove</Button>
            </div>
          </>
        ) : (
          <Title title="Already on Sale!" />
        )}

        <hr className="m-20 w-full mx-auto" />
        <Title title="End Auction with highest bid" />

        <Table
          className="sale-history"
          columns={columns}
          dataSource={data}
          pagination={false}
          scroll={{
            y: 420,
          }}
        />
      </Layout>
    </>
  );
}
