import React, { useState } from "react";
import Head from "next/head";
import { Space } from "antd";
import Layout from "../../../components/layout";
import { TabHeader } from "../../../components/tabs";
import { ProfileCard, Title } from "../../../components/profile";
import { MessageList, MessageItem } from "../../../components/message";
import {
  Textarea,
  Input,
  SelectBox,
  Button,
} from "../../../components/formElement";

export default function Message() {
  const tabs = ["Inbox", "Send", "New Message"];
  const [activeTab, setActiveTab] = useState("Inbox");
  const options = [
    { value: "chocolate", label: "Chocolate" },
    { value: "strawberry", label: "Strawberry" },
    { value: "vanilla", label: "Vanilla" },
  ];
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
              <TabHeader tabs={tabs} active={activeTab} setTab={setActiveTab} />

              {activeTab === "New Message" ? (
                <div className="grid grid-cols-6 gap-4 pt-10  text-white ">
                  <div class="col-start-2 col-span-4">
                    <form className="grid grid-cols-12 gap-4">
                      <div className="col-span-12">
                        <SelectBox options={options} />
                      </div>
                      <div className="col-span-6">
                        <Input placeholder="Name" />
                      </div>
                      <div className="col-span-6">
                        <Input placeholder="Surname" />
                      </div>
                      <div className="col-span-12">
                        <Input placeholder="Email Adresse or @username" />
                      </div>
                      <div className="col-span-12">
                        <Textarea placeholder="Your Message" />
                      </div>
                      <div className="col-span-12 text-end mb-4">
                        <Button>Send</Button>
                      </div>
                    </form>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-12 gap-8 2xl:gap-20 text-white ">
                  <div className="col-span-6">
                    <MessageList />
                  </div>
                  <div className="col-span-6">
                    <MessageItem />
                    <div className="mt-10">
                      <Textarea placeholder="Your Message" />
                      <div className="text-end mb-4">
                        <Button>Send</Button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
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
  const response = await axios.post(
    "https://horse-around-backend.herokuapp.com/verify",
    {
      token: jwt,
    }
  );

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
