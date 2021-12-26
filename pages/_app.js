import { IntlProvider } from "react-intl";
import { useRouter } from "next/router";
import Head from 'next/head';

import * as locales from "../content/locale";
import Navbar from '../components/navbar';

import 'bulma/css/bulma.min.css';
import '../styles/global.css';
import '../styles/home.css';

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const { locale, defaultLocale, pathname } = router;
  const localeCopy = locales[locale];
  const messages = localeCopy[pathname];

  return (
    <IntlProvider
      locale={locale}
      defaultLocale={defaultLocale}
      messages={messages}
    >
      <Head>
        <title>Rafael Eiki</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar />

      <Component {...pageProps} />
    </IntlProvider>
  );
}

export default MyApp;
