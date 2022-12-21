import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Modal, Space } from "antd";
import cn from "classnames";
import { Input } from "../../formElement";
import { MdCheckCircle } from "react-icons/md";
import styles from "./styles.module.css";
import axios from "axios";
import { useWeb3 } from "../../web3/providers";
import { ethers } from "ethers";
import { LoadingModal } from "../";

export default function BidModal({
  isModalOpen,
  handleOk,
  handleCancel,
  horse,
  account,
}) {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loadingModal, setLoadingModal] = useState(false);
  const [bid, setBid] = useState();
  const { contractAuction, web3 } = useWeb3();
  const [highestBid, setHighestBid] = useState(
    horse?.auctionInfo[horse?.auctionInfo.length - 1]?.highestBid
  );
  const [highestBidder, setHighestBidder] = useState(
    horse?.auctionInfo[horse?.auctionInfo.length - 1]?.highestBidder
  );
  const [auctioner, setAuctioner] = useState();

  for (let i = 0; horse?.auctionInfo.length; i++) {
    setAuctioner(horse?.auctionInfo[i]?.sellerAddress);
  }
  const placeABid = async () => {
    if (
      parseInt(
        horse?.auctionInfo[horse?.auctionInfo.length - 1]?.deadline * 1000
      ) < Date.now()
    ) {
      alert("Auction is over");
    } else if (
      parseInt(web3?.utils?.toWei(bid, "ether")) <
      parseInt(horse?.auctionInfo[horse?.auctionInfo.length - 1]?.openingBid)
    ) {
      alert("Bid must be higher than opening bid");
    } else if (
      parseInt(web3?.utils?.toWei(bid, "ether")) >
      parseInt(horse?.auctionInfo[horse?.auctionInfo.length - 1]?.reservedPrice)
    ) {
      alert("Bid amount cannot exceed the reserved price");
    } else if (
      parseInt(web3?.utils?.toWei(bid, "ether")) <=
      parseInt(
        horse?.auctionInfo[horse?.auctionInfo.length - 1]?.highestBid &&
          horse?.auctionInfo[horse?.auctionInfo.length - 1]?.highestBidder !=
            account?.data
      ) +
        (parseInt(
          horse?.auctionInfo[horse?.auctionInfo.length - 1]?.highestBid
        ) *
          5) /
          100
    ) {
      alert(
        "Bid amount must be at least 5 percent higher than the highest bid"
      );
    } else {
      setLoadingModal(true);
      const getAuctionInfo = async () => {
        const horseInfo = await axios.post(
          "https://horse-around-app.herokuapp.com/get_horse",
          {
            horseId: horse?.horseId,
          }
        );
        return horseInfo.data.detail?.horse.auctionInfo[
          horse?.auctionInfo.length - 1
        ];
      };

      const auctionInfo = await getAuctionInfo();
      console.log("auctionInfo", auctionInfo);
      console.log(
        web3?.utils?.toWei(bid, "ether") <= auctionInfo?.reservedPrice
      );

      await contractAuction.methods
        .placeBid(
          account?.data,
          horse?.horseId,
          auctionInfo.deadline,
          auctionInfo.reservedPrice,
          auctionInfo.openingBid,
          auctionInfo.nonce,
          auctionInfo.signature
        )
        .send({
          from: account.data,
          value: web3?.utils?.toWei(bid, "ether"),
        });

      await axios
        .post("https://horse-around-app.herokuapp.com/place_a_bid", {
          publicAddress: account?.data,
          horseId: horse?.horseId,
          bidAmount: web3?.utils?.toWei(bid, "ether"),
        })
        .then((res) => {
          setHighestBid(
            horse?.auctionInfo[horse?.auctionInfo.length - 1]?.highestBid
          );
          setHighestBidder(
            horse?.auctionInfo[horse?.auctionInfo.length - 1]?.highestBidder
          );
        });
      setLoadingModal(false);
      setIsSubmitted(true);
    }
  };

  return (
    <Modal
      footer={false}
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      className="bind-modal"
    >
      <LoadingModal
        isModalOpen={loadingModal}
        handleOk={handleOk}
        handleCancel={handleCancel}
      />

      {isSubmitted && (
        <MdCheckCircle className="mx-auto text-8xl text-white my-10" />
      )}
      <h2 className={cn(styles.modalTitle, isSubmitted && "text-center")}>
        {isSubmitted ? "Submit Offer Successfully !" : "Place a bid"}
      </h2>
      <span className={cn(styles.modalInfoText, isSubmitted && "text-center")}>
        You are about to purchase "{horse?.horseName}" from {horse?.ownerName}
      </span>
      <Link href={`/owner/${horse?.publicAddress}`}>
        <a className={cn(styles.userName, isSubmitted && "text-center")}>
          @{horse?.ownerName}
        </a>
      </Link>
      {!isSubmitted && (
        <>
          <div className="mb-8">
            <Input
              text="Your bid (ETH)"
              placeholder={horse?.auctionInfo.openingBid}
              labelStyle="!text-[#FFFFFF80]"
              onChange={(e) => setBid(e.target.value)}
            />
          </div>
        </>
      )}
      <Space className="w-full justify-between text-[#FFFFFF80] text-sm 2xl:text-lg mb-7">
        <span>
          {highestBidder ? (
            <>
              {"Highest bid from "}
              <a href={`/owner/${highestBidder}`} target="_blank">
                <strong className="font-PoppinsSemiBold">
                  @{highestBidder.slice(0, 5) + "..." + highestBidder.slice(-5)}
                </strong>
              </a>
            </>
          ) : (
            <strong className="font-PoppinsSemiBold">
              There is no bid yet
            </strong>
          )}
        </span>
        {highestBidder && (
          <span>{web3?.utils?.fromWei(highestBid, "ether") || 0} ETH</span>
        )}
      </Space>
      {horse?.status === 4 && (
        <Space className="w-full justify-between text-[#FFFFFF80] text-sm 2xl:text-lg mb-7">
          <span>Servise fee 1.5%</span>
          <span>
            {(web3?.utils?.fromWei(
              horse?.auctionInfo[horse?.auctionInfo.length - 1].reservedPrice,
              "ether"
            ) *
              15) /
              1000}{" "}
            ETH
          </span>
        </Space>
      )}

      {isSubmitted ? (
        <button className={cn(styles.button, "bg-[#34A853]")}>Submitted</button>
      ) : (
        <button
          className={cn(styles.button, "bg-goldMetallic")}
          onClick={() => placeABid()}
        >
          Place a bid
        </button>
      )}
    </Modal>
  );
}
