import Head from "next/head";

import Page404 from "../components/page404";

export default function UnderConstruction() {
  return (
    <>
      <div className="home">
        <Head>
          <title>HorseAround 404</title>
          <meta name="description" content="HorseAround" />
          <link rel="icon" href="/favicon.png" />
        </Head>
        <Page404 />
      </div>
    </>
  );
}