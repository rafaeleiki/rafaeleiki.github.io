import Head from 'next/head';

import Navbar from '../components/navbar';

import 'bulma/css/bulma.min.css';
import '../styles/global.css';
import '../styles/bulma.customization.css';

// Specific pages CSS
import '../styles/home.css';
import '../styles/researcher.css';

function MyApp({ Component, pageProps }) {
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
