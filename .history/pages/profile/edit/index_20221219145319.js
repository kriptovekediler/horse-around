import React, { useState, useMemo, useEffect } from "react";
import Head from "next/head";
import Layout from "../../../components/layout";
import { ProfileCard, Title } from "../../../components/profile/";
import {
  Input,
  ToogleCheckbox,
  SelectBox,
  Button,
} from "../../../components/formElement";
import axios from "axios";
import FileUpload from "../../../components/fileUpload";
import { useAccount } from "../../../components/web3/hooks";
import countryList from "react-select-country-list";
import { getCookie } from "cookies-next";
import { LoadingModal } from "../../../components/detail";
import { useRouter } from "next/router";
import toast, { Toaster } from "react-hot-toast";
import ToastModal from "../../../components/toast";

export default function EditPage({ userPublicAddress }) {
  const [selectedFileAsBuffer, setSelectedFileAsBuffer] = useState(undefined);
  const [previewURL, setPreviewURL] = useState();
  const { account } = useAccount();
  const [value, setValue] = useState("");
  const [loadingModal, setLoadingModal] = useState(false);
  const [data, setData] = useState();
  const router = useRouter();
  const [toasterr, setToaster] = useState(false);
  const [user, setUser] = useState({
    name: "",
    publicAddress: userPublicAddress,
    surname: "",
    username: "",
    bio: "",
    location: value,
    private: "false",
  });
  const [myUserInfo, setMyUserInfo] = useState();
  const key = ["name", "surname", "username", "bio"];
  useEffect(() => {
    toast.error("This didn't work.", {
      position: "top-center",
    });

    axios
      .post("https://horse-around-app.herokuapp.com/get_user", {
        publicAddress: account?.data,
      })
      .then((res) => {
        setMyUserInfo(res.data.detail?.user);
      });
  }, [user]);
  console.log(myUserInfo);
  function fileSelectedHandler(e) {
    const tempData = e.target.files[0];
    setData(tempData);
    console.log("tempdata", tempData);
    //setSelectedFileAsBuffer(tempData);

    setPreviewURL(URL.createObjectURL(tempData));
    //console.log(tempData)
    const reader = new window.FileReader();
    //const objectUrl = URL.createObjectURL(tempData);
    //console.log(objectUrl)
    //setPreviewURL(objectUrl);
    reader.readAsArrayBuffer(tempData);
    reader.onloadend = () => {
      setSelectedFileAsBuffer(Buffer(reader.result));
      setUser({ ...user, image: Buffer(reader.result).toString("base64") });
    };
    e.preventDefault();
  }

  const options = useMemo(() => countryList().getData(), []);

  const changeHandler = (value) => {
    setUser({ ...user, location: value.label });
  };
  console.log(toasterr);
  const updateUser = async (e) => {
    e.preventDefault();
    key.map((k) => {
      if (user[k] === "") {
        setToaster(true);

        setTimeout(() => setToaster(false), 4000);
      }
    });

    var formData = new FormData();
    formData.append("file", data);
    formData.append("token", getCookie("access_token"));
    formData.append("name", user?.name);
    formData.append("surname", user?.surname);
    formData.append("username", user?.username);
    formData.append("bio", user?.bio);
    formData.append("location", user?.location);
    formData.append("private", user?.private);
    formData.append("publicAddress", user?.publicAddress);
    await axios({
      method: "post",
      url: "https://horse-around-app.herokuapp.com/update_user/",
      data: formData,
      headers: {
        Accept: "application/json",
        "Content-Type": "multipart/form-data",
      },
    })
      .then((response) => {
        console.log(response);
        setLoadingModal(false);
        router.push("/profile");
      })
      .catch((error) => {
        console.error(error);
      });
    /*     await axios.post("https://horse-around-app.herokuapp.com/update_user/", {
      user_info: user,
      file: data,
      token: getCookie("access_token"),
    }).then(res => {
      console.log(res)
      setLoadingModal(false);
    }) */
    /*     router.push("/profile")
     */
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
          <ToastModal toaster={toasterr}>Required field</ToastModal>
          {/* <LoadingModal isModalOpen={loadingModal} /> */}
          <div className="grid grid-cols-4 gap-20 text-white">
            <div>
              <div className="bg-[#444444] rounded-lg py-10">
                <ProfileCard />
              </div>
            </div>
            <div className="col-span-3">
              <Title title="Edit Profile" />
              <form className="grid grid-cols-12 gap-4">
                <div className="col-span-6">
                  <Input
                    text=" Name"
                    placeholder={myUserInfo ? myUserInfo.name : "John"}
                    onChange={(e) => setUser({ ...user, name: e.target.value })}
                  />
                </div>
                <div className="col-span-6">
                  <Input
                    text="Surname"
                    placeholder={myUserInfo ? myUserInfo.username : "John"}
                    onChange={(e) =>
                      setUser({ ...user, surname: e.target.value })
                    }
                  />
                </div>
                <div className="col-span-6">
                  <Input
                    text="Username"
                    placeholder="John"
                    onChange={(e) =>
                      setUser({ ...user, username: e.target.value })
                    }
                  />
                </div>
                <div className="col-span-6">
                  <SelectBox text="User Type" className="cursor-not-allowed" />
                </div>
                <div className="col-span-12">
                  <Input
                    text="Bio"
                    placeholder="Type your bio..."
                    onChange={(e) => setUser({ ...user, bio: e.target.value })}
                  />
                </div>
                <div className="col-span-6">
                  <SelectBox text="Range " className="cursor-not-allowed" />
                </div>
                <div className="col-span-6">
                  <SelectBox
                    text="Location"
                    options={options}
                    value={user.location.label}
                    onChange={changeHandler}
                  />
                </div>
                <div className="col-span-12">
                  <FileUpload
                    title="Upload Profile Picture"
                    previewURL={previewURL}
                    fileSelectedHandler={fileSelectedHandler}
                    onChange={(e) => fileSelectedHandler(e)}
                  />
                </div>

                <div className="col-span-6">
                  <ToogleCheckbox
                    text="Private Account"
                    onChange={(e) =>
                      setUser({ ...user, private: e.target.checked })
                    }
                  />
                </div>
                <div className="col-span-6 text-right">
                  <Button
                    onClick={(e) => {
                      updateUser(e), setLoadingModal(true);
                    }}
                  >
                    Save Changes
                  </Button>
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
    props: {
      userPublicAddress: response?.data?.detail?.user?.publicAddress,
    }, // will be passed to the page component as props
  };
}
