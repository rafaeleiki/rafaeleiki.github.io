import { IntlProvider } from "react-intl";
import { useRouter } from "next/router";

import * as locales from "../content/locale";

import 'bulma/css/bulma.min.css';
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
      <Component {...pageProps} />
    </IntlProvider>
  );
}

export default MyApp;
