import Head from "next/head";
import type { AppProps } from "next/app";

import Providers from "src/components/providers";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
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
      <Providers>
        <Component {...pageProps} />
      </Providers>
    </>
  );
}

export default MyApp;
