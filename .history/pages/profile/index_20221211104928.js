import React, { useEffect, useState } from "react";
import Head from "next/head";
import Layout from "../../components/layout";
import { PageHead, ProfileNav } from "../../components/profile";
import { TabHeader } from "../../components/tabs";
import Filter from "../../components/filter";
import HorseListBox from "../../components/horseList";
import HorseListFavorites from "../../components/horseListFavorites";
import HorseListOnSale from "../../components/horseListOnSale";
import MyAuctions from "../../components/myAuctions";
import axios from "axios";
import { useAccount } from "../../components/web3/hooks";
import { axiosClient } from "../../utils/axiosClient";

export default function EditPage({ horses }) {
  const tabs = ["Owned", "On Sale", "My Auctions", "Favorites"];
  const [activeTab, setActiveTab] = useState("Owned");
  const { account } = useAccount();
  const [owned, setOwned] = useState(0);
  const [onSale, setOnSale] = useState(0);
  const [user, setUser] = useState();
  const [userLoading, setUserLoading] = useState(false);

  // useEffect(() => {
  //   console.log("componentRender");
  //   setUserLoading(true);
  //   axios
  //     .post("http://127.0.0.1:8000/get_user", {
  //       publicAddress: account.data,
  //     })
  //     .then((res) => {
  //       setUser(res?.data?.detail?.user);
  //       setUserLoading(false);
  //     });
  //   setUserLoading(true);
  // }, [userLoading]);

  useEffect(() => {
    const getUser = async () => {
      const request = await axios.post("http://127.0.0.1:8000/get_user", {
        publicAddress: account.data,
      });
      const response = request.data;
    };
  });

  // console.log("load", userLoading);

  // setOwned(user?.myHorses?.length);

  return (
    <>
      <div className="home">
        <Head>
          <title>HorseAround</title>
          <meta name="description" content="HorseAround" />
          <link rel="icon" href="/favicon.png" />
        </Head>
        <PageHead />
        <Layout>
          <ProfileNav />
          <div className="mt-10">
            <TabHeader tabs={tabs} active={activeTab} setTab={setActiveTab} />
            {activeTab}
            <div className="grid grid-cols-12 gap-14">
              <div className="col-span-3">
                <Filter />
              </div>
              <div className="col-span-9 text-white">
                {activeTab === "Owned" && (
                  <HorseListBox horses={horses} user={user} count={owned} />
                )}
                {activeTab === "On Sale" && (
                  <HorseListOnSale horses={horses} count={onSale} />
                )}
                {activeTab === "My Auctions" && (
                  <MyAuctions horses={horses} account={account?.data} />
                )}
                {activeTab === "Favorites" && (
                  <HorseListFavorites horses={horses} count={owned} />
                )}
              </div>
            </div>
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

  if (response?.data?.status_code === 200) {
    console.log("verified");
    const res = await axios.get("http://127.0.0.1:8000/get_horses");
    console.log("res", res);
    return {
      props: {
        horses: JSON.parse(JSON.stringify(res.data)),
      },
    };
  } else {
    return {
      redirect: {
        destination: "/connectwallet",
        permanent: false,
      },
    };
  }
}
