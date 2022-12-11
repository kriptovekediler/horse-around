import React, { useEffect, useState } from "react";
import Head from "next/head";
import Layout from "../../layout";
import { Title } from "../../profile";
import { Input, ToogleCheckbox, Button } from "../../formElement";
import axios from "axios";
import { useAccount } from "../../web3/hooks";
import { useWeb3 } from "../../web3/providers";
import { getTransitionDirection } from "antd/lib/_util/motion";
import { FaSignInAlt } from "react-icons/fa";
import { ethers } from "ethers";
import { useRouter } from "next/router";
import { getCookie } from "cookies-next";

export default function PutOnSale({ horse }) {
  const [price, setPrice] = useState();
  const [sellingPercent, setSellingPercent] = useState();
  const [signature, setSignature] = useState();
  const [nonce, setNonce] = useState();
  const { account } = useAccount();
  const { contractNFT, contractMarketplace, web3 } = useWeb3();
  const [onSale, setOnSale] = useState();
  const router = useRouter();

  useEffect(() => {
    console.log("horse", horse?.saleInfo.signature);
  }, [horse]);

  const submit = async (e) => {
    e.preventDefault();

    const getNonce = async () => {
      const user = await axios.post("http://127.0.0.1:8000/get_user", {
        publicAddress: account.data,
      });
      return user.data.detail.user.nonce;
    };

    const getMessageHash = async (nonce) => {
      const msg = ethers.utils.solidityPack(
        ["address", "uint", "uint", "uint", "uint"],
        [
          account.data,
          horse.horseId,
          web3.utils.toWei(price.toString(), "ether").toString(),
          sellingPercent,
          nonce,
        ]
      );

      const msgHash = ethers.utils.keccak256(msg);
      return msgHash;
    };

    const getSignature = async (msg) => {
      let sig = await web3.eth.personal.sign(
        msg,
        account?.data,
        (err, signature) => {
          if (err) {
            console.log(err);
            return;
          }
          return signature;
        }
      );
      setSignature(sig);
      return sig;
    };

    const nonce = await getNonce();
    const msg = await getMessageHash(nonce);
    const sign = await getSignature(msg);
    console.log("sign", sign);

    await axios
      .post("http://127.0.0.1:8000/put_on_sale", {
        publicAddress: account.data,
        token: getCookie("access_token"),
        horseId: horse.horseId,
        price: web3.utils.toWei(price.toString(), "ether").toString(),
        ps: sellingPercent,
        signature: sign,
        nonce: nonce,
      })
      .then(setOnSale(true));
    router.push(`/profile/`);
  };

  const remove = async () => {
    await contractMarketplace?.methods
      .blockNonce(horse?.saleInfo?.nonce)
      .send({
        from: account.data,
      })
      .then(setOnSale(false));
    await axios
      .post("http://127.0.0.1:8000/remove_from_sale", {
        horseId: horse.horseId,
        publicAddress: account.data,
      })
      .then(router.push(`/profile`));
  };

  return (
    <>
      <Head>
        <title>HorseAround </title>
        <meta name="description" content="HorseAround" />
        <link rel="icon" href="/favicon.png" />
      </Head>
      <Layout page>
        {!onSale && horse?.status === 2 ? (
          <div className="grid grid-cols-4 gap-20 text-white">
            <div className="col-span-3">
              <Title title="Put On Sale" />
              <form className="grid grid-cols-12 gap-4">
                <div className="col-span-4">
                  <Input
                    text="Price Per Item"
                    placeholder="1 ETH"
                    onChange={(e) => setPrice(e.target.value)}
                  />
                </div>
                <div className="col-span-4">
                  <Input
                    text="Selling Amount"
                    placeholder="0"
                    onChange={(e) => setSellingPercent(e.target.value)}
                  />
                </div>
              </form>
              <div className="my-4">
                <Button onClick={(e) => submit(e)}>Submit</Button>
              </div>
            </div>
          </div>
        ) : onSale || horse?.status === 3 ? (
          <>
            <Title title="Already on Sale!" />
            <div className="my-4">
              <Button onClick={() => remove()}>Remove</Button>
            </div>
          </>
        ) : (
          <Title title="Already on Auction!" />
        )}
      </Layout>
    </>
  );
}
