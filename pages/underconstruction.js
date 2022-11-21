import Head from "next/head";
import useWindowSize from "../hooks/useWindowSize";
import PageHead from "../components/pageHead";
import UnderConstructionHead from "../components/underConstructionHead";
import JoinTheCommunityForm from "../components/joinTheCommunityForm";

export default function UnderConstruction() {
  const size = useWindowSize();
  return (
    <>
      <div className="home">
        <Head>
          <title>HorseAround  UnderConstruction</title>
          <meta name="description" content="HorseAround" />
          <link rel="icon" href="/favicon.png" />
        </Head>
        <UnderConstructionHead />
      </div>
    </>
  );
}
