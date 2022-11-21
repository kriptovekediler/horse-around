import React, { useEffect, useState, useMemo } from "react";
import Head from "next/head";
import Layout from "../../../components/layout";
import { ProfileCard, Title } from "../../../components/profile/";
import { Input, ToogleCheckbox, Button } from "../../../components/formElement";
import FileUpload from "../../../components/fileUpload";
import axios from "axios";
import Pedigree from "../../../components/pedigree";
import { useAccount } from "../../../components/web3/hooks";
import { useWeb3 } from "../../../components/web3/providers";
import { useRouter } from "next/router";
import { axiosClient } from "../../../utils/axiosClient";
import { SelectBox } from "../../../components/formElement";
import countryList from "react-select-country-list";
import { getCookie } from "cookies-next";
import { id } from "ethers/lib/utils";

export default function Create({ user }) {
  const [selectedFileAsBuffer, setSelectedFileAsBuffer] = useState(undefined);
  const [step, setStep] = useState(0);
  const [previewURL, setPreviewURL] = useState();
  const [data, setData] = useState();
  const { account } = useAccount();
  const { web3, contractNFT } = useWeb3();
  const [loading, setLoading] = useState();
  const [mintFinished, setMintFinished] = useState(false);
  const router = useRouter();

  const options = useMemo(() => countryList().getData(), []);

  useEffect(() => {
    console.log(user);
  }, [user]);

  /*   useEffect(() => {
    contractNFT?.methods.name().call({
      from: account.data
   }).then(res => console.log(res))
  }, [contractNFT?.methods]) */

  const [horse, setHorse] = useState({
    publicAddress: user?.user?.publicAddress,
    horseName: "",
    ownerName:
      user?.user?.publicAddress.slice(0, 5) +
      "..." +
      user?.user?.publicAddress.slice(-5),
    birthDate: "",
    age: "",
    sex: "",
    country: "",
    breederName: "",
    jockeyName: "",
    sireName: "",
    damName: "",
    damSiblingsName: "",
    bonus: "",
    horseOwnerBonus: "",
    breedingBonus: "",
    earning: "",
    totalAmount: Number(""),
    sponsorshipEarnings: "",
    overseasBonus: "",
    preferenceDescription: "",
  });

  const changeHandler = (value) => {
    setHorse({ ...horse, country: value.label });
  };

  function fileSelectedHandler(e) {
    const data = e.target.files[0];
    setData(data);
    setPreviewURL(URL.createObjectURL(data));
    /*     const reader = new window.FileReader();
    const objectUrl = URL.createObjectURL(data);
    setPreviewURL(objectUrl);
    console.log(data)
    console.log(objectUrl)
    reader.readAsArrayBuffer(data);
    reader.onloadend = () => {
      setSelectedFileAsBuffer(Buffer(reader.result));
      console.log(Buffer(reader.result))
      setHorse({
        ...horse,
        image: Buffer(reader.result).toString("base64"),
      }) */
    e.preventDefault();
  }

  const mint = async (e) => {
    e.preventDefault();
    await axios
      .post("http://127.0.0.1:8000/get_user", {
        publicAddress: account?.data,
      })
      .then((res) => {
        if (res.data.detail.user?.userType === "Creator") {
          console.log(horse);
          console.log(contractNFT);
          contractNFT.methods
            .mint("", 1000)
            .send({
              from: account.data.toLowerCase(),
              value: web3.utils.toWei("0", "ether"),
            })
            .then((res) => {
              if (!res) {
                setLoading(false);
                router.push("/profile");
              }
              console.log("xxxx", res);
              web3.eth
                .getTransactionReceipt(res.transactionHash)
                .then((res) => {
                  console.log("receipt:", res);
                  create(res?.logs[0]?.topics[1]);
                })
                .catch((err) => {
                  console.log(err);
                });
              setLoading(false);
            });
        } else {
          alert(
            "You are not a creator. Please contact the admin to get the creator role."
          );
        }
      });
  };

  const create = async (id) => {
    console.log(horse);
    console.log(typeof id);
    var formData = new FormData();
    formData.append("file", data);
    //formData.append("token", getCookie("access_token"));
    /*     formData.append("horseName", horse?.horseName);
    formData.append("birthDate", horse?.birthDate);
    formData.append("publicAddress", horse?.publicAddress);
    formData.append("ownerName", horse?.ownerName);
    formData.append("age", horse?.age);
    formData.append("sex", horse?.sex);
    formData.append("country", horse?.country);
    formData.append("breederName", horse?.breederName);
    formData.append("jockeyName", horse?.jockeyName);
    formData.append("sireName", horse?.sireName);
    formData.append("damName", horse?.damName);
    formData.append("damSiblingsName", horse?.damSiblingsName);
    formData.append("bonus", horse?.bonus);
    formData.append("horseOwnerBonus", horse?.horseOwnerBonus);
    formData.append("breedingBonus", horse?.breedingBonus);
    formData.append("earning", horse?.earning);
    formData.append("sponsorshipEarnings", horse?.sponsorshipEarnings);
    formData.append("overseasBonus", horse?.overseasBonus);
    formData.append("preferenceDescription", horse?.preferenceDescription);
    formData.append("horseId", parseInt(id).toString());
    console.log(formData) */
    await axios
      .post("http://127.0.0.1:8000/create_horse", {
        horse: horse,
        id: parseInt(id),
      })
      /*     await axios({
      method: 'post',
      url: 'https://horse-around-app.herokuapp.com/create_horse',
      data: formData,
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'multipart/form-data',
      },
      }) */
      .then((res) => {
        console.log("res", res);
        router.push("/profile");
      });
  };

  return (
    <>
      <Head>
        <title>HorseAround </title>
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
            <Title title="Create a New" />
            <form className="grid grid-cols-12 gap-4">
              {step === 0 ? (
                <>
                  <div className="col-span-12">
                    <FileUpload
                      title="Upload File"
                      previewURL={previewURL}
                      fileSelectedHandler={fileSelectedHandler}
                      onChange={(e) => fileSelectedHandler(e)}
                    />
                  </div>
                  <div className="col-span-4">
                    <Input
                      text="Horse Name"
                      placeholder="John"
                      value={horse.name}
                      onChange={(e) =>
                        setHorse({ ...horse, horseName: e.target.value })
                      }
                    />
                  </div>
                  <div className="col-span-4">
                    <Input
                      text="Date of Birth"
                      placeholder="16.04.2019"
                      value={horse.birthDate}
                      onChange={(e) =>
                        setHorse({ ...horse, birthDate: e.target.value })
                      }
                    />
                  </div>
                  <div className="col-span-2">
                    <Input
                      text="Age"
                      placeholder="3 Y"
                      value={horse.age}
                      onChange={(e) =>
                        setHorse({ ...horse, age: e.target.value })
                      }
                    />
                  </div>
                  <div className="col-span-2">
                    <Input
                      text="Sex"
                      placeholder="Female"
                      value={horse.sex}
                      onChange={(e) =>
                        setHorse({ ...horse, sex: e.target.value })
                      }
                    />
                  </div>
                  <div className="col-span-4">
                    <SelectBox
                      text="Country"
                      options={options}
                      value={horse.country.label}
                      onChange={changeHandler}
                    />
                  </div>
                  <div className="col-span-4">
                    <Input
                      text="Owner Name"
                      placeholder={
                        account?.data?.slice(0, 5) +
                        "..." +
                        account?.data?.slice(-5)
                      }
                      disabled
                    />
                  </div>
                  <div className="col-span-4">
                    <Input
                      text="Breeder Name"
                      placeholder="Willhemm"
                      value={horse.breederName}
                      onChange={(e) =>
                        setHorse({ ...horse, breederName: e.target.value })
                      }
                    />
                  </div>
                  <div className="col-span-4">
                    <Input
                      text="Jockey Name"
                      placeholder="Willhemm"
                      value={horse.jockeyName}
                      onChange={(e) =>
                        setHorse({ ...horse, jockeyName: e.target.value })
                      }
                    />
                  </div>
                  <div className="col-span-4">
                    <Input
                      text="Sire Name"
                      placeholder="Fire"
                      value={horse.sireName}
                      onChange={(e) =>
                        setHorse({ ...horse, sireName: e.target.value })
                      }
                    />
                  </div>
                  <div className="col-span-4">
                    <Input
                      text="Dam Name"
                      placeholder="Cardiac"
                      value={horse.damName}
                      onChange={(e) =>
                        setHorse({ ...horse, damName: e.target.value })
                      }
                    />
                  </div>
                  <div className="col-span-4">
                    <Input
                      text="Dam-Siblings Name"
                      placeholder="Cream, Simba"
                      value={horse.damSiblingsName}
                      onChange={(e) =>
                        setHorse({ ...horse, damSiblingsName: e.target.value })
                      }
                    />
                  </div>
                  <div className="col-span-4">
                    <Input
                      text="Bonus"
                      placeholder="12.000$"
                      value={horse.bonus}
                      onChange={(e) =>
                        setHorse({ ...horse, bonus: e.target.value })
                      }
                    />
                  </div>
                  <div className="col-span-4">
                    <Input
                      text="Horse Owner Bonus"
                      placeholder="400 $"
                      value={horse.horseOwnerBonus}
                      onChange={(e) =>
                        setHorse({ ...horse, horseOwnerBonus: e.target.value })
                      }
                    />
                  </div>
                  <div className="col-span-4">
                    <Input
                      text="Breeding Bonus"
                      placeholder="12.000 $"
                      value={horse.breedingBonus}
                      onChange={(e) =>
                        setHorse({ ...horse, breedingBonus: e.target.value })
                      }
                    />
                  </div>
                  <div className="col-span-4">
                    <Input
                      text="Earning"
                      placeholder="4.000 $"
                      value={horse.earning}
                      onChange={(e) =>
                        setHorse({ ...horse, earning: e.target.value })
                      }
                    />
                  </div>
                  <div className="col-span-4">
                    <Input
                      text="Sponsorship Earnings"
                      placeholder="2.000 $"
                      value={horse.sponsorshipEarnings}
                      onChange={(e) =>
                        setHorse({
                          ...horse,
                          sponsorshipEarnings: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="col-span-4">
                    <Input
                      text="Overseas Bonus"
                      placeholder="500 $"
                      value={horse.overseasBonus}
                      onChange={(e) =>
                        setHorse({ ...horse, overseasBonus: e.target.value })
                      }
                    />
                  </div>
                  <div className="col-span-4">
                    <Input
                      text="Preference Description"
                      placeholder="Description"
                      value={horse.preferenceDescription}
                      onChange={(e) =>
                        setHorse({
                          ...horse,
                          preferenceDescription: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="col-span-4">
                    <Input
                      text="Amount To Mint"
                      placeholder="0"
                      value={horse.totalAmount}
                      onChange={(e) =>
                        setHorse({
                          ...horse,
                          totalAmount: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="col-span-12 text-right">
                    <div className="my-4">
                      <Button onClick={(e) => setStep(1)}>Next Step</Button>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="col-span-12">
                    <Pedigree horseName={horse?.horseName} />
                  </div>
                  <div className="flex flex-row col-span-12 justify-end mr-12 mt-5 text-end gap-10">
                    <Button className="" onClick={(e) => setStep(0)}>
                      Back Step
                    </Button>
                    <div className="">
                      {loading ? (
                        <Button
                          onClick={() =>
                            alert("Please check the Metamask popup")
                          }
                        >
                          <span className="flex">
                            <svg
                              className="animate-spin h-5 mt-1 mr-2 text-white"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                            >
                              <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                              ></circle>
                              <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8v8z"
                              ></path>
                            </svg>
                            Loading..
                          </span>
                        </Button>
                      ) : (
                        <Button
                          className=""
                          onClick={(e) => {
                            mint(e), setLoading(true);
                          }}
                        >
                          <span>Mint</span>
                        </Button>
                      )}
                    </div>
                  </div>
                </>
              )}
            </form>
          </div>
        </div>
      </Layout>
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
    props: {
      user: response?.data?.detail,
    }, // will be passed to the page component as props
  };
}
