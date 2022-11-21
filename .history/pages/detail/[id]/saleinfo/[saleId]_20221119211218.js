import React, { useEffect, useState } from "react";
import Head from "next/head";
import Layout from "../../../../components/layout";
import { TabHeader } from "../../../../components/tabs";
import ImageGallery from "../../../../components/ımageGallery";
import InfoCard from "../../../../components/ınfoCard";
import {
  BidHistory,
  OfferHistory,
  SharesOnSale,
  Properties,
  Achievements,
  SaleHistory,
  Pedigree,
} from "../../../../components/detail";
import axios from "axios";
import { useAccount } from "../../../../components/web3/hooks";

export default function MarketPlace({ horse, status, saleInfo }) {
  const tabs =
    status === 4
      ? [
          "Bid History",
          "Properties",
          "Pedigree",
          "Achievements",
          "Sale History",
        ]
      : status === 2
      ? [
          "Offer History",
          "Properties",
          "Pedigree",
          "Achievements",
          "Sale History",
        ]
      : [
          "Shares on Sale",
          "Properties",
          "Pedigree",
          "Achievements",
          "Sale History",
        ];
  const [activeTab, setActiveTab] = useState(
    horse?.status === 4
      ? "Bid History"
      : horse?.status === 2
      ? "Offer History"
      : horse?.status === 3
      ? "Shares on Sale"
      : "Properties"
  );
  const { account } = useAccount();

  return (
    <>
      <div className="home">
        <Head>
          <title>HorseAround</title>
          <meta name="description" content="HorseAround" />
          <link rel="icon" href="/favicon.png" />
        </Head>
        <Layout page>
          <div className="grid grid-cols-2 md:grid-cols-1 sm:grid-cols-1 gap-20 md:gap-10 sm:gap-0 text-white mb-10">
            <div>
              <ImageGallery image={horse?.image} />
            </div>
            <InfoCard horse={horse} saleInfo={saleInfo} />
          </div>
          <div className="">
            <TabHeader tabs={tabs} active={activeTab} setTab={setActiveTab} />
            {activeTab === "Bid History" && status === 4 && (
              <BidHistory horse={horse} account={account.data} />
            )}
            {activeTab === "Offer History" && status === 2 && (
              <OfferHistory horse={horse} account={account.data} />
            )}
            {activeTab === "Shares on Sale" && status === 3 && (
              <SharesOnSale horse={horse} account={account.data} />
            )}
            {activeTab === "Properties" && <Properties horse={horse} />}
            {activeTab === "Pedigree" && <Pedigree horse={horse} />}
            {activeTab === "Achievements" && <Achievements horse={horse} />}
            {activeTab === "Sale History" && <SaleHistory horse={horse} />}
          </div>
        </Layout>
      </div>
    </>
  );
}

export async function getServerSideProps(context) {
  const { id, saleId } = context.query;
  console.log("ids", id);
  console.log("saleId", saleId);
  const res = await axios.post(
    "https://horseaorund-server.herokuapp.com/get_horse_by_sale",
    {
      horseId: parseInt(id),
      saleId: parseInt(saleId),
    }
  );
  console.log("res", res.data.detail?.sale);

  if (res?.data.status_code === 404 || res === undefined) {
    return {
      redirect: {
        destination: "/404",
        permanent: false,
      },
    };
  }

  return {
    props: {
      horse: res.data.detail?.horse,
      status: res.data.detail?.horse?.status,
      saleInfo: res.data.detail?.sale,
    },
  };
}
