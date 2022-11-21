import React, { useEffect, useState } from "react";
import Head from "next/head";
import Layout from "../components/layout";
import { TabHeader } from "../components/tabs";
import {
  All,
  Live,
  Active,
  ProfileCard,
  HorseCard,
} from "../components/auctions/";
import Link from "next/link";
import axios from "axios";

export default function Auction({ liveHorses, activeOfferHorses }) {
  const tabs = ["All", "Live Auction", "Active Offers", "Favorites"];
  const [activeTab, setActiveTab] = useState("All");

  useEffect(() => {
    console.log(liveHorses);
  }, [liveHorses]);

  return (
    <>
      <div className="home">
        <Head>
          <title>HorseAround</title>
          <meta name="description" content="HorseAround" />
          <link rel="icon" href="/favicon.png" />
        </Head>
        <Layout page>
          <div className="grid grid-cols-12 md:grid-cols-1 sm:grid-cols-1 gap-20 md:gap-10 xl:gap-5 sm:gap-0 text-white mb-4">
            <div className="col-span-3">
              {activeTab !== "Favorites" ? (
                <>
                  <h2 className="text-white text-base 2xl:text-3xl font-PoppinsSemiBold mb-3">
                    Auction
                  </h2>
                  <span className="text-[#FFFFFF99] text-sm block mb-3">
                    {`Home > Auction > ${activeTab}`}
                  </span>
                  <span className="text-base 2xl:text-xl font-PoppinsSemiBold text-[#FFFFFF99]">
                    All : 814 found
                  </span>
                </>
              ) : (
                <ProfileCard />
              )}
            </div>
            <div className="col-span-9">
              <TabHeader tabs={tabs} active={activeTab} setTab={setActiveTab} />
              {activeTab === "Favorites" && (
                <div className="grid grid-cols-3 md:grid-cols-2 sm:grid-cols-1  gap-4 mt-10">
                  <Link href={`/detail/0`}>
                    <a>
                      <HorseCard
                        name="Arizona"
                        image="https://nationaltoday.com/wp-content/uploads/2020/12/National-Horse-Day-1.jpg"
                        username="John Wilhemm"
                        price="3.25"
                        id="0"
                      />
                    </a>
                  </Link>
                  <Link href={`/detail/0`}>
                    <a>
                      <HorseCard
                        name="Arizona"
                        image="https://nationaltoday.com/wp-content/uploads/2020/12/National-Horse-Day-1.jpg"
                        username="John Wilhemm"
                        price="3.25"
                        id="0"
                      />
                    </a>
                  </Link>
                  <Link href={`/detail/0`}>
                    <a>
                      <HorseCard
                        name="Arizona"
                        image="https://nationaltoday.com/wp-content/uploads/2020/12/National-Horse-Day-1.jpg"
                        username="John Wilhemm"
                        price="3.25"
                        id="0"
                      />
                    </a>
                  </Link>
                </div>
              )}
            </div>
          </div>
          {activeTab === "All" && <All horses={liveHorses} />}
          {activeTab === "Live Auction" && <Live horses={liveHorses} />}
          {activeTab === "Active Offers" && (
            <Active horses={activeOfferHorses} />
          )}
        </Layout>
      </div>
    </>
  );
}

export async function getServerSideProps() {
  let liveData = [];
  let activeOfferHorses = [];
  const res = await axios.get(
    "https://horse-around-app.herokuapp.com/get_horses"
  );
  Object.entries(res.data.detail).map(([key, value]) => {
    console.log(typeof value.status);
    if (value.status === 4) {
      liveData.push(value);
    } else if (value.status === 2) {
      activeOfferHorses.push(value);
    }
  });

  return {
    props: {
      liveHorses: liveData,
      activeOfferHorses: activeOfferHorses,
    },
  };
}
