import React, { useEffect, useState } from "react";
import Head from "next/head";
import axios from "axios";
import Layout from "../../../components/layout";
import { ProfileCard, Title } from "../../../components/profile/";
import {
  Input,
  ToogleCheckbox,
  SelectBox,
  Button,
  Label,
} from "../../../components/formElement";
import { useAccount } from "../../../components/web3/hooks";

export default function AccountSetting() {
  const [setting, setSetting] = useState([
    { id: 0, status: false },
    { id: 1, status: false },
    { id: 2, status: false },
    { id: 3, status: false },
  ]);
  const { account } = useAccount();

  useEffect(() => {
    console.log(setting);
  }, [setting]);

  const onClick = async (id) => {
    setSetting(
      setting.map((item) =>
        item.id === id ? { ...item, status: !item.status } : item
      )
    );
  };

  const updateSettings = async (e) => {
    e.preventDefault();
    console.log("update settings");
    const result = await axios.post(
      "https://horse-around-app.herokuapp.com/update_account_settings",
      {
        publicAddress: account.data,
        notifications: setting,
      }
    );
    console.log(result);
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
          <div className="grid grid-cols-4 md:grid-col-1  gap-20 text-white">
            <div className="md:col-span-1">
              <div className="bg-[#444444] rounded-lg py-10">
                <ProfileCard />
              </div>
            </div>
            <div className="col-span-3 md:col-span-12">
              <Title title="Account Setting" />
              <form className="grid grid-cols-12 gap-4">
                <div className="col-span-12">
                  <Label text="Notifications" />
                </div>
                <div className="col-span-6 sm:col-span-12">
                  <div className="h-12 py-1 px-3  border-2 border-[#444444b3] rounded flex items-center justify-between gap-2">
                    <span className="text-lg text-[#ffffffb3]">
                      Big Activity
                    </span>
                    <ToogleCheckbox onClick={() => onClick(0)} />
                  </div>
                </div>
                <div className="col-span-6 sm:col-span-12">
                  <div className="h-12 py-1 px-3  border-2 border-[#444444b3] rounded flex items-center justify-between gap-2">
                    <span className="text-lg text-[#ffffffb3]">Horse Sold</span>
                    <ToogleCheckbox onClick={() => onClick(1)} />
                  </div>
                </div>
                <div className="col-span-6 sm:col-span-12">
                  <div className="min-h-12 py-1 px-3  border-2 border-[#444444b3] rounded flex flex-wrap items-center justify-between gap-2">
                    <span className="text-lg text-[#ffffffb3]">
                      Add to Favorite
                    </span>
                    <ToogleCheckbox onClick={() => onClick(2)} />
                  </div>
                </div>
                <div className="col-span-6 sm:col-span-12">
                  <div className="min-h-12 py-1 px-3  border-2 border-[#444444b3] rounded flex flex-wrap items-center justify-between gap-2">
                    <span className="text-lg text-[#ffffffb3]">
                      Message Notifications
                    </span>
                    <ToogleCheckbox onClick={() => onClick(3)} />
                  </div>
                </div>
                <div className="col-span-12 sm:col-span-12 text-right mt-10">
                  <Button onClick={updateSettings}>Save Changes</Button>
                </div>
              </form>
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
    "https://horse-around-app.herokuapp.com/verify",
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
