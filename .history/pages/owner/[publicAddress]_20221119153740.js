import React, { useEffect, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import Layout from "../../components/layout";
import { TabHeader } from "../../components/tabs";
import { ProfileCard, HorseCard } from "../../components/auctions";
import FollowList from "../../components/followList";
import axios from "axios";
import { useWeb3 } from "../../components/web3/providers";

export default function OwnerProfile({ user, horses }) {
  const tabs = ["All Sales", "Past Sales", "Following", "Followers"];
  const [activeTab, setActiveTab] = useState("All Sales");
  const { web3 } = useWeb3();

  useEffect(() => {
    console.log(user.detail.user.soldHorses);
    console.log(horses.detail);
  }, [user, horses]);

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
              <ProfileCard user={user} />
            </div>
            <div className="col-span-9">
              <TabHeader tabs={tabs} active={activeTab} setTab={setActiveTab} />

              <div className="grid grid-cols-3 md:grid-cols-2 sm:grid-cols-1  gap-4 mt-10">
                {activeTab === "All Sales" &&
                  Object.entries(horses?.detail).map(([key, value]) => {
                    if (
                      (value.status === 3 || value.status === 4) &&
                      value.publicAddress === user?.detail.user?.publicAddress
                    ) {
                      return (
                        <Link href={`/detail/${value.horseId}`} key="1">
                          <a>
                            <HorseCard
                              name={value.horseName}
                              image={value.image}
                              ownerName={value.ownerName}
                              price={
                                value?.status === 3
                                  ? value?.saleInfo.price
                                  : value?.status === 4
                                  ? value?.auctionInfo[
                                      value?.auctionInfo.length - 1
                                    ].reservedPrice
                                  : 0
                              }
                              id={value.horseId}
                              sex={value.sex}
                              age={value.age}
                              web3={web3}
                              info="All Sales"
                            />
                          </a>
                        </Link>
                      );
                    }
                  })}
                {activeTab === "Past Sales" &&
                  Object.entries(horses?.detail).map(([key, value]) => {
                    if (
                      user?.detail.user?.soldHorses?.includes(value.horseId)
                    ) {
                      return (
                        <Link href={`/detail/${value.horseId}`} key="1">
                          <a>
                            <HorseCard
                              name={value.horseName}
                              image={value.image}
                              ownerName={value.ownerName}
                              id={value.horseId}
                              sex={value.sex}
                              age={value.age}
                              web3={web3}
                              info="Past Sales"
                            />
                          </a>
                        </Link>
                      );
                    }
                  })}
              </div>
              {activeTab === "Following" && <FollowList />}
              {activeTab === "Followers" && <FollowList />}
            </div>
          </div>
        </Layout>
      </div>
    </>
  );
}

export async function getServerSideProps(context) {
  const { publicAddress } = context.query;
  console.log("publicAddress", publicAddress);
  const res = await axios.post(
    "https://horse-around-backend.herokuapp.com/get_user",
    {
      publicAddress: publicAddress,
    }
  );
  if (res.data.status_code === 404) {
    return {
      redirect: {
        destination: "/404",
        permanent: false,
      },
    };
  } else {
    const resp = await axios.get(
      "https://horse-around-backend.herokuapp.com/get_horses"
    );
    return {
      props: {
        user: res.data,
        horses: resp.data,
      },
    };
  }
}
