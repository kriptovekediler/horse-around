import React, { useEffect, useState } from "react";
import Link from "next/link";
// Hooks
import { useAccount } from "../web3/hooks";
import { useWeb3 } from "../web3/providers";
import { axiosClient } from "../../utils/axiosClient";
import styles from "./styles.module.css";
import { getCookie, setCookie } from "cookies-next";

export default function ConnectWallet() {
  const [inProgress, setInProgress] = useState(false);
  const { account } = useAccount();
  const { connect, web3 } = useWeb3();
  const [count, setCount] = useState(0);

  useEffect(() => {
    const handleSignMessage = async ({ publicAddress, nonce }) => {
      let sig = await web3.eth.personal.sign(
        web3.utils.fromUtf8(
          `Horse Around Authentication for ${publicAddress} with nonce : ${nonce}`
        ),
        publicAddress,
        "",
        (err, signature) => {
          if (err) {
            console.log(err);
            return;
          }
          return signature;
        }
      );

      console.log("signature:", sig);

      axiosClient
        .post(`users/signature`, {
          publicAddress: publicAddress,
          signature: sig,
        })
        .then((response) => {
          console.log("response is ", response);
          setCookie("access_token", response.data.detail.token);
        })
        .catch((err) => {
          alert(err.response.data.message);
        });
    };

    const handleSignUp = async (address) => {
      await axiosClient
        .post("set_user", {
          publicAddress: address,
          registrationDate: Math.round(new Date().getTime() / 1000),
        })
        .then((resp) => {
          console.log("handle sign up res", resp);
          let publicAddress = resp.data.detail.user?.publicAddress;
          let nonce = resp.data.detail.user.nonce;

          handleSignMessage({ publicAddress, nonce });
        });
    };

    const handleLogIn = async () => {
      await axiosClient
        .post("get_user", {
          publicAddress: account?.data,
        })
        .then((resp) => {
          console.log("resp", resp);
          if (resp.data.status_code === 200) {
            console.log("200");
            let publicAddress =
              resp.data?.detail.user.publicAddress.toLowerCase();
            let nonce = resp.data.detail.user.nonce;

            let jwt = getCookie("access_token");

            console.log("access token: ", jwt);

            if (!jwt) {
              console.log("NO JWT");
              console.log("yes");
              handleSignMessage({ publicAddress, nonce });
            } else {
              axiosClient
                .post("verify", {
                  token: jwt,
                })
                .then((resp) => {
                  console.log("resp:", resp);
                  let pAddress = resp.data.detail.user.publicAddress;
                  console.log("paddress:Ç", pAddress);
                  while (!isLowerCase(publicAddress)) {
                    if (pAddress !== publicAddress) {
                      console.log("different");
                      handleSignMessage({ publicAddress, nonce });
                      return;
                    } else {
                      console.log("same address");
                      return;
                    }
                  }
                })
                .catch((err) => {
                  console.log(err);
                  handleSignMessage({ publicAddress, nonce });
                });
            }
          } else {
            console.log("404");
            console.log(resp);
            handleSignUp(account?.data.toLowerCase());
            console.log("sign up!");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    };

    if (account?.data && web3) handleLogIn();
  }, [account?.data && web3]);

  const handleClick = () => {
    if (!account?.data) {
      setInProgress(true);
      connect()
        .catch(() => setInProgress(false))
        .finally(() => setInProgress(false));
    }
  };

  return (
    <div className={styles.box}>
      <div className={styles.gridBox}>
        <Link href="">
          <a className={styles.gridItem}>
            <img
              src="../icons/wallet.svg"
              className="rounded-lg inline-block "
            />
            <div className={styles.gridBoxInfo}>
              <h3 className={styles.title}>Wallet Connect</h3>
              <span className={styles.description}>
                MetaMask is an extension for accessing Ethereum enabled
                distributed applications, or "Dapps" in your normal Chrome
                browser!
              </span>
            </div>
          </a>
        </Link>
        <a onClick={() => handleClick()} className={styles.gridItem}>
          {/* <div className="ribbon ribbon-top-left">
              <span>Popular</span>
            </div> */}
          <img
            src="../icons/metamask.svg"
            className="rounded-lg inline-block "
          />
          <div className={styles.gridBoxInfo}>
            <h3 className={styles.title}>Metamask</h3>
            <span className={styles.description}>
              MetaMask is an extension for accessing Ethereum enabled
              distributed applications, or "Dapps" in your normal Chrome
              browser!
            </span>
          </div>
        </a>
        <Link href="">
          <a className={styles.gridItem}>
            <img
              src="../icons/fortmatic.png"
              className="rounded-lg inline-block "
            />
            <div className={styles.gridBoxInfo}>
              <h3 className={styles.title}>Fortmatic</h3>
              <span className={styles.description}>
                MetaMask is an extension for accessing Ethereum enabled
                distributed applications, or "Dapps" in your normal Chrome
                browser!
              </span>
            </div>
          </a>
        </Link>
      </div>
    </div>
  );
}
