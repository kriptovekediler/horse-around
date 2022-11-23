import React, { useEffect, useState, useMemo } from "react";
import Head from "next/head";
import Layout from "../../../components/layout";
import { ProfileCard, Title } from "../../../components/profile/";
import { Input, ToogleCheckbox, Button } from "../../../components/formElement";
import FileUpload from "../../../components/fileUpload";
import styles from "./create.module.css";
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
  const [imageSrc, setImageSrc] = useState("");
  const [ImageSelected, setImageSelected] = useState("");

  // let imageUrl = imageSrc;
  const options = useMemo(() => countryList().getData(), []);
  const pedigreeOptions = [
    { value: "chocolate", label: "Chocolate" },
    { value: "strawberry", label: "Strawberry" },
    { value: "vanilla", label: "Vanilla" },
  ];

  useEffect(() => {
    console.log(user);
  }, [user, imageSrc]);

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
    sireName: "",
    damName: "",
    damSiblingsName: "",
    bonus: "",
    image: "",
    horseOwnerBonus: "",
    breedingBonus: "",
    earning: "",
    totalAmount: Number(""),
    sponsorshipEarnings: "",
    overseasBonus: "",
    preferenceDescription: "",
    first:"",
    second:"",
    third:"",
    fourth:"",
    fifth:"",
    sixth:"",
    seventh:"",
    eighth:"",
    ninth:"",
    tenth:"",
    eleventh:"",
    twelfth:"",
    thirteenth:"",
    fourteenth:""
  });
  /*   useEffect(() => {
    contractNFT?.methods.name().call({
      from: account.data
   }).then(res => console.log(res))
  }, [contractNFT?.methods]) */
  const [uploadData, setUploadData] = useState();

  function handleOnChange(changeEvent) {
    const reader = new FileReader();

    reader.onload = function (onLoadEvent) {
      setImageSrc(onLoadEvent.target.result);
      setUploadData(undefined);
    };

    reader.readAsDataURL(changeEvent.target.files[0]);

    handleOnSubmit(changeEvent).then(setImageSrc(""));
  }

  console.log(imageSrc);
  async function handleOnSubmit(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const fileInput = Array.from(form.elements).find(
      ({ name }) => name === "file"
    );
    const formData = new FormData();

    for (const file of fileInput.files) {
      formData.append("file", file);
    }

    formData.append("upload_preset", "horsearound-uploads");

    const data = await fetch(
      "https://api.cloudinary.com/v1_1/dvhosztgf/image/upload",
      {
        method: "POST",
        body: formData,
      }
    ).then((r) => r.json());

    setImageSrc(data.secure_url);
    setHorse({ ...horse, image: data.secure_url });
    setUploadData(data);
  }
  console.log(imageSrc);

  const changeHandler = (value) => {
    setHorse({ ...horse, country: value.label });
  };

  console.log(horse.image);

  function fileSelectedHandler(e) {
    const data = e.target.files[0];
    setData(data);
    setPreviewURL(URL.createObjectURL(data));

    e.preventDefault();
  }

  const mint = async (e) => {
    e.preventDefault();
    await axios
      .post("https://horse-around-app.herokuapp.com/get_user", {
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
      .post("https://horse-around-app.herokuapp.com/create_horse", {
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
            {/* <form method="post" onChange={handleOnChange} onSubmit={handleOnSubmit}>
              <p>
                <input type="file" name="file"/>
                <img src={imageSrc} alt=""/>
                <button type="">upload</button>
              </p>
            </form> */}
            <Title title="Create a New" />
            {/* <input
              type="file"
              name=""
              onChange={(e) => setHorse({ ...horse, image: e.target.files[0] })}
            />
            <button onClick={upload}>upload</button> */}
            <form
              method="post"
              onSubmit={handleOnSubmit}
              onChange={handleOnChange}
            >
              <input
                id="file"
                name="file"
                type="file"
                className="absolute  top-0 left-0 opacity-0 cursor-pointer"
                // onChange={onChangeFiles}
              />
            </form>
            <form className="grid grid-cols-12 gap-4">
              {step === 0 ? (
                <>
                  <div className="col-span-12">
                    {/* <FileUpload
                      title="Upload File"
                      previewURL={imageSrc}
                      fileSelectedHandler={handleOnChange}
                    /> */}

                    <div className="grid grid-cols-12 gap-4 mb-4">
                      <div className={"col-span-9"}>
                        <span className={styles["title"]}>upload File</span>
                        <label for="file">
                          <div className={styles["uploadBox"]}>
                            <div className="text-center">
                              <svg
                                width="30"
                                height="24"
                                viewBox="0 0 30 24"
                                fill="none"
                                className="inline-block mb-3"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M27 3H15L12.885 0.885C12.315 0.315 11.55 0 10.755 0H3C1.335 0 0.015 1.335 0.015 3L0 21C0 22.665 1.335 24 3 24H27C28.65 24 30 22.65 30 21V6C30 4.35 28.65 3 27 3ZM24 15H21V18C21 18.825 20.325 19.5 19.5 19.5C18.675 19.5 18 18.825 18 18V15H15C14.175 15 13.5 14.325 13.5 13.5C13.5 12.675 14.175 12 15 12H18V9C18 8.175 18.675 7.5 19.5 7.5C20.325 7.5 21 8.175 21 9V12H24C24.825 12 25.5 12.675 25.5 13.5C25.5 14.325 24.825 15 24 15Z"
                                  fill="white"
                                />
                              </svg>
                              <p id="file_name">
                                Png,JPEG,WEBP,PDF,MP4 ,OBJ,FBX or MP3. Max 1 Gb
                              </p>
                            </div>
                          </div>
                        </label>
                      </div>

                      <div className="col-span-3">
                        <span className={styles["title"]}>Preview</span>
                        <img
                          src={imageSrc || "../horse/preview.png"}
                          className="rounded-lg"
                          width="100%"
                          alt="Preview"
                        />
                      </div>
                    </div>
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
                      type="text"
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
                  <div className="col-span-8">
                    <Input
                      text="Mint Amount"
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
                   



                  <div className={styles.box}>
                    <div className={styles.pedigreeBox}>
                      <div className="bg-[#39250B] border-goldMetallic w-[78px] border-2 rounded-lg flex items-center">
                        <span className="-rotate-90 text-base 2xl:text-2xl">{horse?.horseName}</span>
                      </div>
                      <div className="flex flex-wrap w-full gap-0">
                        <div className="flex w-full">
                          <div className="flex items-center justify-center border-goldMetallic rounded-lg border-2 border-b  px-10 2xl:px-10">
                            {/* <SelectBox placeholder="Select Country" options={pedigreeOptions}   value={horse.first.label} onChange={changeHandler}/> */}
                            <Input
                              text="Pedigree"
                              placeholder="First"
                              value={horse.first}
                              onChange={(e) =>
                                setHorse({ ...horse, first: e.target.value })
                              }
                            />
                          </div>

                          <div className="border-t-2 border-b-2 rounded-l-lg border-goldMetallic">
                            <div className="flex items-center justify-center border-goldMetallic rounded-t-lg border-2 border-t-0 border-b p-5 2xl:px-10 h-1/2">
                            {/* <SelectBox placeholder="Select Country" options={pedigreeOptions}   value={horse.second.label} onChange={changeHandler}/> */}
                            <Input
                              text="Pedigree"
                              placeholder="Second"
                              value={horse.second}
                              onChange={(e) =>
                                setHorse({ ...horse, second: e.target.value })
                              }
                            />
                            </div>
                            <div className="flex items-center justify-center border-goldMetallic rounded-b-lg border-2 border-b-0 border-t p-5 2xl:px-10 h-1/2">
                            <Input
                              text="Pedigree"
                              placeholder="Third"
                              value={horse.third}
                              onChange={(e) =>
                                setHorse({ ...horse, third: e.target.value })
                              }
                            />
                            </div>
                          </div>
                          <div className="">
                            <div className="flex items-center justify-center border-goldMetallic border-t-2 border-b-2  p-4 2xl:px-8">
                            <Input
                              text="Pedigree"
                              placeholder="Fourth"
                              value={horse.fourth}
                              onChange={(e) =>
                                setHorse({ ...horse, fourth: e.target.value })
                              }
                            />
                            </div>
                            <div className="flex items-center justify-center border-goldMetallic text-goldMetallic border-b-2  p-4 2xl:px-8">
                            <Input
                              text="Pedigree"
                              placeholder="Fifth"
                              value={horse.fifth}
                              onChange={(e) =>
                                setHorse({ ...horse, fifth: e.target.value })
                              }
                            />
                            </div>
                            <div className="flex items-center justify-center border-goldMetallic border-b-2  p-4 2xl:px-8">
                            <Input
                              text="Pedigree"
                              placeholder="Sixth"
                              value={horse.sixth}
                              onChange={(e) =>
                                setHorse({ ...horse, sixth: e.target.value })
                              }
                            />
                            </div>
                            <div className="flex items-center justify-center border-goldMetallic border-b-2  p-4 2xl:px-8">
                            <Input
                              text="Pedigree"
                              placeholder="Seventh"
                              value={horse.seventh}
                              onChange={(e) =>
                                setHorse({ ...horse, seventh: e.target.value })
                              }
                            />
                            </div>
                          </div>
                        </div>
                        <div className="flex w-full">
                          <div className="flex items-center justify-center border-goldMetallic rounded-lg border-2 border-t  px-10 2xl:px-10">
                          <Input
                              text="Pedigree"
                              placeholder="Eighth"
                              value={horse.eighth}
                              onChange={(e) =>
                                setHorse({ ...horse, eighth: e.target.value })
                              }
                            />
                          </div>
                          <div className="border-t border-b-2 rounded-l-lg border-goldMetallic">
                            <div className="flex items-center justify-center border-goldMetallic rounded-t-lg border-2 border-t-0 border-b p-5 2xl:px-10 h-1/2">
                            <Input
                              text="Pedigree"
                              placeholder="Ninth"
                              value={horse.ninth}
                              onChange={(e) =>
                                setHorse({ ...horse, ninth: e.target.value })
                              }
                            />
                            </div>
                            <div className="flex items-center justify-center border-goldMetallic rounded-b-lg border-2 border-b-0 border-t p-5 2xl:px-10 h-1/2">
                            <Input
                              text="Pedigree"
                              placeholder="Tenth"
                              value={horse.tenth}
                              onChange={(e) =>
                                setHorse({ ...horse, tenth: e.target.value })
                              }
                            />
                            </div>
                          </div>
                          <div className="">
                            <div className="flex items-center justify-center border-goldMetallic border-t border-b-2  p-4 2xl:px-8">
                            <Input
                              text="Pedigree"
                              placeholder="Eleventh"
                              value={horse.eleventh}
                              onChange={(e) =>
                                setHorse({ ...horse, eleventh: e.target.value })
                              }
                            />
                            </div>
                            <div className="flex items-center justify-center border-goldMetallic border-b-2  p-4 2xl:px-8">
                            <Input
                              text="Pedigree"
                              placeholder="Twelfth"
                              value={horse.twelfth}
                              onChange={(e) =>
                                setHorse({ ...horse, twelfth: e.target.value })
                              }
                            />
                            </div>
                            <div className="flex items-center justify-center border-goldMetallic border-b-2  p-4 2xl:px-8">
                            <Input
                              text="Pedigree"
                              placeholder="Thirteenth"
                              value={horse.thirteenth}
                              onChange={(e) =>
                                setHorse({ ...horse, thirteenth: e.target.value })
                              }
                            />
                            </div>
                            <div className="flex items-center justify-center border-goldMetallic border-b-2  p-4 2xl:px-8">
                            <Input
                              text="Pedigree"
                              placeholder="Fourteenth"
                              value={horse.fourteenth}
                              onChange={(e) =>
                                setHorse({ ...horse, fourteenth: e.target.value })
                              }
                            />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>




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
    props: {
      user: response?.data?.detail,
    }, // will be passed to the page component as props
  };
}
