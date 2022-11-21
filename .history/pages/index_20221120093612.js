import Head from "next/head";
import useWindowSize from "../hooks/useWindowSize";
import HomeBG from "../components/home";
import MarketPlaceSlider from "../components/marketplaceSlider";
import TopHorses from "../components/topHorses";
import HomeShoppingBox from "../components/homeShoppingBox";
import CreateandSellBox from "../components/createandSellBox";
import Blog from "../components/blog";
import axios from "axios";

export default function Home({ sellingHorses, topHorses }) {
  const size = useWindowSize();
  return (
    <>
      <div className="home">
        <Head>
          <title>HorseAround</title>
          <meta name="description" content="HorseAround" />
          <link rel="icon" href="/favicon.png" />
        </Head>
        <HomeBG />
        <div className="px-32 ">
          <MarketPlaceSlider sellingHorses={sellingHorses} />
        </div>
        <TopHorses topHorses={topHorses} />
        <HomeShoppingBox />
        <CreateandSellBox />
        <Blog />
      </div>
    </>
  );
}

export async function getServerSideProps() {
  let sellingHorses = [];
  let topHorses = [];
  const res = await axios.get(
    "https://horse-around-app.herokuapp.com/get_horses"
  );
  Object?.entries(res.data.detail).map(([key, value]) => {
    if (value?.status === 3 && sellingHorses.length < 10) {
      sellingHorses.push(value);
    }
    if (value?.saleHistory?.length > 0 && topHorses.length < 10) {
      topHorses.push(value);
    }
  });

  return {
    props: {
      sellingHorses: sellingHorses,
      topHorses: topHorses,
    },
  };
}
