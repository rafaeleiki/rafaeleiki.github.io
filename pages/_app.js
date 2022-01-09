import { useEffect } from "react";
import Head from 'next/head';
import { useRouter } from "next/router";

import Navbar from '../components/navbar';

import 'bulma/css/bulma.min.css';
import '../styles/global.css';
import '../styles/bulma.customization.css';

// Specific pages CSS
import '../styles/home.css';
import '../styles/researcher.css';

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = (url) => {
      if (isProduction) gtag.pageview(url);
    };
    router.events.on("routeChangeComplete", handleRouteChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);

  return (
    <>
      <Head>
        <title>Rafael Eiki</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar />

      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
