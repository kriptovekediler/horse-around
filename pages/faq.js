import Head from "next/head";
import useWindowSize from "../hooks/useWindowSize";
import SearchBox from "../components/faqSearch";
import Faq from "../components/faq";
import Blog from "../components/blog";
import Articles from "../components/articles";
export default function FaqPage() {
  const size = useWindowSize();
  return (
    <>
      <div className="home">
        <Head>
          <title>HorseAround</title>
          <meta name="description" content="HorseAround" />
          <link rel="icon" href="/favicon.png" />
        </Head>
        <div
          className="relative
                bg-faq bg-cover bg-left bg-no-repeat
                h-screen
                w-screen mb-28"
        >
          <SearchBox />
        </div>
        <div className="px-32 ">
          <Faq />
        </div>
        <Blog />
        <Articles />
      </div>
    </>
  );
}