import React, { useState } from "react";
import Head from "next/head";

import Layout from "../../../components/layout";
import { TabHeader } from "../../../components/tabs";
import { ProfileCard, Title } from "../../../components/profile";
import FollowList from "../../../components/followList";

export default function Follow() {
  const tabs = [
    { name: "Followers", value: "0" },
    { name: "Followings", value: "200" },
  ];
  const [activeTab, setActiveTab] = useState("Followers");
  return (
    <>
      <div className="home">
        <Head>
          <title>HorseAround</title>
          <meta name="description" content="HorseAround" />
          <link rel="icon" href="/favicon.png" />
        </Head>
        <Layout page>
          <div className="grid grid-cols-4 gap-20 text-white">
            <div>
              <div className="bg-[#444444] rounded-lg py-10">
                <ProfileCard />
              </div>
            </div>
            <div className="col-span-3">
              <Title title="My Profile" />
              <TabHeader tabs={tabs} active={activeTab} setTab={setActiveTab} />
              {activeTab === "Followers" && (
                <>
                  <FollowList />
                  <FollowList />
                  <FollowList />
                  <FollowList />
                  <FollowList />
                </>
              )}
              {activeTab === "Followings" && (
                <>
                  <FollowList />
                </>
              )}
            </div>
          </div>
        </Layout>
      </div>
    </>
  );
}