import React, { useEffect, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import Layout from "../components/layout";
import { TabHeader } from "../components/tabs";
import MarketPlaceFilter from "../components/marketplaceFilter";
import HorseCard from "../components/horseCard";
import HorseListBox from "../components/horseList";
import { SelectBox, Input } from "../components/formElement";
import axios from "axios";
import { useRouter } from "next/router";

export default function MarketPlace({ horses }) {
  const tabs = ["Horse", "Accesories", "Ranches", "Statistics"];
  const [activeTab, setActiveTab] = useState("Horse");
  const [length, setLength] = useState(0);
  const [image, setImage] = useState("");
  const router = useRouter();
  console.log("horses", horses);
  useEffect(() => {
    Object.entries(horses)
      .slice(5)
      .map(([key, value]) => {
        console.log("horse", value);
      });
  }, []);

  const goStats = () => {
    router.push("/statistics");
  };

  return (
    <>
      <div className="home">
        <Head>
          <title>HorseAround</title>
          <meta name="description" content="HorseAround" />
          <link rel="icon" href="/favicon.png" />
        </Head>
        <Layout page>
          <div className="flex items-center justify-between gap-2 flex-wrap">
            {/*       x      <SelectBox className="w-[200px]" />  */}
            <div className="w-[300px]">
              <Input placeholder="Search" />
            </div>
          </div>
          <div>
            <span className="text-xl xl:text-lg md:text-base text-[#FFFFFF99] font-PoppinsSemiBold block mb-10">
              All : {length} found{" "}
            </span>
          </div>
          <div className="grid grid-cols-12 gap-10">
            <div className="col-span-3">
              <MarketPlaceFilter />
            </div>
            <div className="col-span-9 text-white">
              <TabHeader tabs={tabs} active={activeTab} setTab={setActiveTab} />
              {activeTab === "Horse" && (
                <div className="grid grid-cols-3 md:grid-cols-2 sm:grid-cols-1  gap-4 mt-10">
                  {Object.entries(horses)
                    .slice(2)
                    .map(([key, value]) => {
                      if (value?.status) {
                        return (
                          <Link href={`/detail/${value.horseId}`}>
                            <a>
                              <HorseCard
                                name={value?.horseName}
                                image={image}
                                ownerName={value?.ownerName}
                                ownerAddress={value?.publicAddress}
                                // price={
                                //   value.saleInfo[value?.saleInfo?.length - 1]
                                //     ?.price
                                // }
                                id={value?.id}
                                key={key}
                              />
                            </a>
                          </Link>
                        );
                      }
                    })}
                </div>
              )}
              {activeTab === "Accesories" && (
                <></>
                /*                 <div className="grid grid-cols-3 md:grid-cols-2 sm:grid-cols-1  gap-4 mt-10">
                  {Object.entries(horses).map(([key, value]) => {
                    return (
                      <HorseCard
                        name={value.horseName}
                        image={value.image}
                        ownerName={value.ownerName}
                        price={value.price}
                        id={value.id}
                      />
                    )})}
                </div> */
              )}
              {activeTab === "Ranches" && (
                <></>
                /*                 <div className="mt-10">
                  <HorseListBox />
                </div> */
              )}
              {activeTab === "Statistics" && goStats()}
            </div>
          </div>
        </Layout>
      </div>
    </>
  );
}

export async function getServerSideProps() {
  const res = await axios.get(
    "https://horse-around-app.herokuapp.com/get_horses"
  );
  const horses = await res?.data?.detail;
  console.log(res);
  console.log(horses);
  return {
    props: {
      horses: horses,
    },
  };
}
