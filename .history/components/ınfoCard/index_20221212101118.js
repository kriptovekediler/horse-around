import cn from "classnames";
import Link from "next/link";
import { Space } from "antd";
import { FaHeart } from "react-icons/fa";
import { Button } from "../formElement/";
import Clock from "../clock/";
import React, { useEffect, useState } from "react";
import styles from "./styles.module.css";
import { useWeb3 } from "../web3/providers/";
import { useAccount } from "../web3/hooks/";
import axios from "axios";
import { useRouter } from "next/router";
import { BidModal, LoadingModal } from "../detail";

export default function InfoCard({ horse, saleInfo }) {
  const { contractNFT, contractMarketplace, web3 } = useWeb3();
  const { account } = useAccount();
  const router = useRouter();
  const [status, setStatus] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [finishedTime, setFinishedTime] = useState();
  const [loadingModal, setLoadingModal] = useState(false);
  const [state, setState] = useState();
  const [sharesModal, setSharesModal] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    (horse?.auctionInfo[horse?.auctionInfo.length - 1]?.startingDate +
      horse?.auctionInfo[horse?.auctionInfo.length - 1]?.duration) *
      1000 >
    Date.now()
      ? setStatus(true)
      : setStatus(false);
    const date = new Date(
      horse?.auctionInfo[horse?.auctionInfo.length - 1]?.deadline * 1000
    );
    setFinishedTime(date.toLocaleString("en-US"));
  }, [horse]);

  useEffect(() => {
    console.log(horse);
    console.log(contractMarketplace?._address);
  }, [account]);

  const buyItem = async () => {
    setLoadingModal(true);
    console.log(
      horse.saleInfo.nonce,
      horse?.saleInfo.signature,
      horse?.publicAddress,
      horse?.horseId
    );

    const buyItemTx = await contractMarketplace.methods
      .buy(
        horse.publicAddress,
        horse.horseId,
        horse.saleInfo[0].price,
        horse.saleInfo[0].ps,
        horse.saleInfo[0].nonce,
        horse.saleInfo[0].signature
      )
      .send({
        from: account?.data,
        value: horse.saleInfo[0].price,
      });

    console.log("buyItemTx", buyItemTx);

    await axios
      .post("https://horse-around-app.herokuapp.com/buy_horse", {
        horseId: horse.horseId,
        buyerAddress: account?.data,
        sellerAddress: horse.publicAddress,
        price: horse.saleInfo[0].price,
        ps: horse.saleInfo[0].ps,
        totalAmount: horse.totalAmount,
        saleId: horse.horseId,
      })
      .then((res) => {
        console.log(res);
        console.log(horse.totalAmount);
        router.push("/profile");
      })
      .catch((err) => {
        console.log(err);
      });
    setLoadingModal(false);
  };

  const makeOffer = async () => {
    setLoadingModal(true);
    console.log("make offer");
  };

  useEffect(() => {
    console.log(status);
  }, [status]);

  useEffect(() => {
    function leftAmount() {
      horse.saleInfo.map((s) => {
        setState(horse.totalAmount - s.ps);
      });
    }
    leftAmount();
  }, []);

  return (
    <div className="w-full">
      <BidModal
        isModalOpen={isModalOpen}
        handleOk={handleOk}
        handleCancel={handleCancel}
        horse={horse}
        account={account}
      />

      <LoadingModal isModalOpen={loadingModal} handleOk={handleOk} />

      <div className={styles.nameBox}>
        <h2 className={styles.horseName}>{horse?.horseName}</h2>
        <span className={styles.id}>ID {horse?.horseId}</span>
      </div>

      {horse?.status === 4 && (
        <Space className="w-full justify-between mb-8">
          <div>
            {status ? (
              <>
                <Clock
                  startingDate={
                    horse?.auctionInfo[horse?.auctionInfo.length - 1]
                      ?.startingDate
                  }
                  date={
                    (horse?.auctionInfo[horse?.auctionInfo.length - 1]
                      ?.startingDate +
                      horse?.auctionInfo[horse?.auctionInfo.length - 1]
                        ?.duration) *
                    1000
                  }
                  small
                />
                <span className="text-sm 2xl:text-xl">
                  Opening Bid:{" "}
                  {web3?.utils?.fromWei(
                    horse?.auctionInfo[horse?.auctionInfo.length - 1]
                      ?.openingBid,
                    "ether"
                  )}{" "}
                  MATIC - ${" "}
                  {web3?.utils?.fromWei(
                    horse?.auctionInfo[horse?.auctionInfo.length - 1]
                      ?.openingBid,
                    "ether"
                  ) * 1500}
                </span>
              </>
            ) : (
              <div className={styles.darkBox}>
                <div className="text-white text-lg 2xl:text-2xl mb-2">
                  Closed
                </div>
                <span className="text-sm">{finishedTime}</span>
              </div>
            )}
          </div>
          <div className={styles.darkBox}>
            <div className="text-goldMetallic text-lg 2xl:text-2xl mb-2">
              Reserved Price
            </div>
            <Space>
              <span className={styles.badge}>
                {web3?.utils?.fromWei(
                  horse?.auctionInfo[horse?.auctionInfo.length - 1]
                    ?.reservedPrice,
                  "ether"
                )}{" "}
                MATIC
              </span>
              <span className="text-base 2xl:text-xl text-[#734B1A]">
                {web3?.utils?.fromWei(
                  horse?.auctionInfo[horse?.auctionInfo.length - 1]
                    ?.reservedPrice,
                  "ether"
                ) * 1500}{" "}
                $
              </span>
            </Space>
          </div>
        </Space>
      )}

      <div className={styles.userCard}>
        <Link href="">
          <a className={styles.userAvatar}>
            <img src="https://picsum.photos/42/42/" className="rounded-lg" />
            <Link href={`/owner/${horse?.publicAddress}`}>
              <span>{horse?.ownerName}</span>
            </Link>
          </a>
        </Link>
        <div className={styles.userCardInfo}>
          {horse?.status === 3 ? (
            <span className={styles.badge}>
              {web3?.utils?.fromWei(
                horse?.saleInfo[horse?.saleInfo.length - 1].price,
                "ether"
              )}{" "}
              MATIC
            </span>
          ) : horse?.status === 3 && saleInfo ? (
            <span className={styles.badge}>
              {web3?.utils?.fromWei(saleInfo?.price.toString(), "ether")} MATIC
            </span>
          ) : (
            <p></p>
          )}
          <span>P/S {state}</span>
        </div>
      </div>
      <Link href={horse?.preferenceDescription}>
        <div className={styles.description}>{horse?.preferenceDescription}</div>
      </Link>

      <div className="mb-10">
        <div className={styles.infoItem}>
          <span>Age</span>
          <span className={styles.yellow}>{horse?.age} Y</span>
        </div>
        <div className={styles.infoItem}>
          <span>Sex</span>
          <span className={styles.yellow}>{horse?.sex}</span>
        </div>
        <div className={styles.infoItem}>
          <span>Breed</span>
          <span className={styles.yellow}>{horse?.breederName}</span>
        </div>
        <div className={styles.infoItem}>
          <span>Dam-Sibling</span>
          <span className={styles.yellow}>
            {horse?.damName}, {horse?.damSiblingsName}
          </span>
        </div>
        <div className={styles.infoItem}>
          <span>Stallion/Mare Status</span>
          <span className={styles.yellow}>Available</span>
        </div>
        <div className={styles.infoItem}>
          <span>Generation </span>
          <span className={styles.yellow}>Gen 2</span>
        </div>
        <div className={styles.infoItem}>
          <span>Total Winnigs </span>
          <span className={styles.yellow}>48 Race</span>
        </div>
        <div className={styles.infoItem}>
          <span>Total Earnings </span>
          <span className={styles.yellow}>{horse?.earning} $ / 12.8 ETH</span>
        </div>
      </div>

      {horse?.status === 2 &&
        (account?.data === horse?.publicAddress ? (
          <Button className="cursor-not-allowed" full dark disabled>
            Make Offer
          </Button>
        ) : (
          <Button onClick={() => makeOffer()} full>
            Make Offer
          </Button>
        ))}

      {horse?.status === 3 &&
        (account?.data === horse?.publicAddress ? (
          <Button className="cursor-not-allowed" full dark disabled>
            Buy Now
          </Button>
        ) : (
          <Button onClick={() => buyItem()} full>
            Buy Now
          </Button>
        ))}

      {horse?.status === 4 &&
        (account?.data === horse?.publicAddress && status ? (
          <Button className="cursor-not-allowed" full dark disabled>
            Place a Bid
          </Button>
        ) : account?.data === horse?.publicAddress && !status ? (
          <Button className="cursor-not-allowed" full dark disabled>
            Auction Closed
          </Button>
        ) : !status ? (
          <Button className="cursor-not-allowed" full dark disabled>
            Auction Closed
          </Button>
        ) : (
          <Button onClick={showModal} full>
            Place a Bid
          </Button>
        ))}
    </div>
  );
}
