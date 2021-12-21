import type { NextPage } from "next";
import Head from "next/head";

import { PageContainer } from "@/components/PageContainer";

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Survivor Pool</title>
        <meta
          name="description"
          content="Create & win American football pools."
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        ></link>
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        ></link>
      </Head>
      <PageContainer></PageContainer>
      <footer></footer>
    </div>
  );
};

export default Home;
