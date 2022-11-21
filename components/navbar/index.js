import Image from "next/image";
import React, { useEffect } from "react";
import Link from "next/link";
import styles from "./styles.module.css";
import logo from "../../public/logo.png";
import { useAccount } from "../web3/hooks";
import { deleteCookie, getCookie } from 'cookies-next';

export default function Navbar() {
const { account } = useAccount();
const [connectionStatus, setConnectionStatus] = React.useState(undefined);

  useEffect(() => {
    if(account.data){
      setConnectionStatus(true);
    } 
  }, [account.data]);

  const walletConnection = () => {
    if(account.data){
      setConnectionStatus(!connectionStatus)
      deleteCookie('access_token')
      window.location.href = "/connectwallet"
    }
  }

  return (
    <div>
      <header className={styles.header}>
        <div>
          <Link href="/">
            <a>
              <Image src={logo} alt="HorseAround Logo" />
            </a>
          </Link>
        </div>
        <nav className={styles.nav}>
          <Link href="/">
            <a className={styles.navLink}>Home</a>
          </Link>
          <Link href="/marketplace">
            <a className={styles.navLink}>Marketplace</a>
          </Link>
          <Link href="/auction">
            <a className={styles.navLink}>Auction</a>
          </Link>
          <Link href="/faq">
            <a className={styles.navLink}>FAQ</a>
          </Link>
          <Link href="/blog">
            <a className={styles.navLink}>Blog</a>
          </Link>
          <div className="flex gap-3">
            {account.data && connectionStatus ? (
              <>
              <Link href="/profile">
                <a className={styles.navButton}>Profile</a>
              </Link>
                <a onClick={walletConnection} className={styles.navDisconnectButton}>Disconnect</a>
              </>
            ): (
              <Link href="/connectwallet">
                <a onClick={walletConnection} className={styles.navButton}>Connect Wallet</a>
              </Link>
            )}
          </div>
        </nav>
      </header>
    </div>
  );
}
