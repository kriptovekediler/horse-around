import React, { useEffect, useState } from "react";
import Head from "next/head";
import Layout from "../components/layout";
import { TabHeader } from "../components/tabs";
import {
  Horses,
  Races,
  Riders,
  Owners,
  Statistics,
} from "../components/statistics/";

import axios from "axios";

export default function StatisticsPage({ horses, users }) {
  const tabs = ["Horse", "Races", "Riders", "Owners", "Statistics"];
  const [activeTab, setActiveTab] = useState("Horse");

  return (
    <>
      <div className="home">
        <Head>
          <title>HorseAround</title>
          <meta name="description" content="HorseAround" />
          <link rel="icon" href="/favicon.png" />
        </Head>
        <Layout page>
          <div className="grid grid-cols-12 md:grid-cols-1 sm:grid-cols-1 gap-20 md:gap-10 sm:gap-0 text-white mb-4">
            <div className="col-span-3">
              <h2 className="text-white text-base 2xl:text-3xl font-PoppinsSemiBold mb-3">
                Statistics
              </h2>
              {activeTab !== "Statistics" && (
                <>
                  <span className="text-[#FFFFFF99] text-sm block mb-3">
                    {"Home > Category > Statistics"}
                  </span>
                  <span className="text-base 2xl:text-xl font-PoppinsSemiBold text-[#FFFFFF99]">
                    All : 814 found
                  </span>
                </>
              )}
            </div>
            <div className="col-span-9">
              <TabHeader tabs={tabs} active={activeTab} setTab={setActiveTab} />
            </div>
          </div>
          {activeTab === "Horse" && <Horses horses={horses} />}
          {activeTab === "Races" && <Races />}
          {activeTab === "Riders" && <Riders />}
          {activeTab === "Owners" && <Owners users={users} />}
          {activeTab === "Statistics" && <Statistics />}
        </Layout>
      </div>
    </>
  );
}

export async function getServerSideProps() {
  const res = await axios.get(
    "https://horseaorund-server.herokuapp.com/get_horses"
  );
  const horses = await res.data.detail;
  const resp = await axios.get(
    "https://horseaorund-server.herokuapp.com/get_users"
  );
  console.log(resp.data);
  return {
    props: {
      horses: horses,
      users: resp.data,
    },
  };
}
