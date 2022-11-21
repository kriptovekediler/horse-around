import Head from "next/head";
import useWindowSize from "../hooks/useWindowSize";
import PageHead from "../components/pageHead";
import JoinTheCommunityBox from "../components/joinTheCommunityBox";
import JoinTheCommunityForm from "../components/joinTheCommunityForm";

export default function BecomeaSeller() {
  const size = useWindowSize();
  return (
    <>
      <div className="home">
        <Head>
          <title>HorseAround</title>
          <meta name="description" content="HorseAround" />
          <link rel="icon" href="/favicon.png" />
        </Head>
        <PageHead
          title="Become a Seller"
          subTitle="Sell and Collect extraordinary horses"
          imgSrc="../bg/becomeaSeller.png"
          bg="bg-becomeaSeller"
        />
        <JoinTheCommunityBox />
        <JoinTheCommunityForm />
      </div>
    </>
  );
}
