import Head from "next/head";
import useWindowSize from "../hooks/useWindowSize";
import PageHead from "../components/pageHead";
import ConnectWalletBox from "../components/connectWallet";

export default function ConnectWallet() {

  const size = useWindowSize();
  return (
    <>
      <div className="home">
        <Head>
          <title>HorseAround </title>
          <meta name="description" content="HorseAround" />
          <link rel="icon" href="/favicon.png" />
        </Head>
        <PageHead
          title="Connect your Wallet"
          subTitle="Connect, Collect, Sale"
          imgSrc="../bg/wallet.png"
          bg="bg-connectWallet"
        />
        <ConnectWalletBox />
      </div>
    </>
  );
}
