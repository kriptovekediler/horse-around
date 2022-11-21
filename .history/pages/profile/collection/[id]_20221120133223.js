import React, { useEffect, useState } from "react";
import Head from "next/head";
import Layout from "../../../components/layout";
import { TabHeader } from "../../../components/tabs";
import ImageGallery from "../../../components/ımageGallery";
import InfoCard from "../../../components/ınfoCard";
import MyHorseInfoCard from "../../../components/myHorseInfoCard";
import {
  PutOnSale,
  PutOnAuction,
  Properties,
  Achievements,
  SaleHistory,
  Pedigree,
} from "../../../components/detail";
import { useRouter } from "next/router";
import axios from "axios";

export default function MarketPlace() {
  const router = useRouter();
  /*   const [horseId, setHorseId] = useState(router.query.id);
   */ const tabs = [
    "Put on Sale",
    "Put on Auction",
    "Properties",
    "Pedigree",
    "Achievements",
    "Sale History",
  ];
  const [activeTab, setActiveTab] = useState("Put on Sale");
  const [horse, setHorse] = useState();

  useEffect(() => {
    console.log("id,", router.query.id);
    const getHorse = async () => {
      await axios
        .post("http://127.0.0.1:8000/get_horse", {
          horseId: parseInt(router.query.id),
        })
        .then((res) => {
          console.log(res?.data);
          setHorse(res?.data.detail.horse);
        });
    };
    getHorse();
  }, [router.query.id]);

  useEffect(() => {
    console.log("horse", horse);
  }, [horse]);

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
              <ImageGallery image="https://nationaltoday.com/wp-content/uploads/2020/12/National-Horse-Day-1.jpg" />
            </div>
            <MyHorseInfoCard horse={horse} />
          </div>
          <div className="">
            <TabHeader tabs={tabs} active={activeTab} setTab={setActiveTab} />
            {activeTab === "Put on Sale" && <PutOnSale horse={horse} />}
            {activeTab === "Put on Auction" && <PutOnAuction horse={horse} />}
            {activeTab === "Properties" && <Properties horse={horse} />}
            {activeTab === "Pedigree" && <Pedigree horse={horse} />}
            {activeTab === "Achievements" && <Achievements />}
            {activeTab === "Sale History" && <SaleHistory horse={horse} />}
          </div>
        </Layout>
      </div>
    </>
  );
}

export async function getServerSideProps(context) {
  let jwt = context.req["cookies"].access_token;
  if (!jwt) {
    return {
      redirect: {
        destination: "/connectwallet",
        permanent: false,
      },
    };
  }
  const response = await axios.post("http://127.0.0.1:8000/verify", {
    token: jwt,
  });

  if (response?.data?.status_code != 200) {
    return {
      redirect: {
        destination: "/connectwallet",
        permanent: false,
      },
    };
  }

  return {
    props: {}, // will be passed to the page component as props
  };
}
