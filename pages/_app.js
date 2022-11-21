import { useRouter } from "next/router";
import "antd/dist/antd.css";
import "../styles/globals.css";
import "tailwindcss/tailwind.css";

import { Web3Provider } from "../components/web3/providers";

import Navbar from "../components/navbar/";
import Footer from "../components/footer/";

export default function MyApp({ Component, pageProps }) {
  const router = useRouter();

  return (
    <div>
      <Web3Provider>
        <Navbar />
        <Component {...pageProps} />
        <Footer />
      </Web3Provider>
    </div>
  );
}
