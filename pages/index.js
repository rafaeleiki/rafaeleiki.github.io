import Head from 'next/head'
import { useRouter } from "next/router";
import Image from 'next/image'

import { useIntl } from "react-intl";
import Navbar from '../components/navbar';

export default function Home(props) {
  const router = useRouter();
  const { locale, locales, defaultLocale } = router;

  const { formatMessage } = useIntl();
  const f = (id) => formatMessage({ id });

  return (
    <div className="container is-full">
      <Head>
        <title>Rafael Eiki</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar />

      <main className="columns home-hero">
        <div className="column">
          <Image 
            src="/images/rafael-full.webp"
            layout="responsive"
            width={1000}
            height={1500}
            className="cover-image"
          />
        </div>

        <div className="column p-6 title-column">
          <h1 className="is-size-1 is-hidden-mobile">
            Rafael Eiki
          </h1>

          <p className="is-size-4">Desenvolvedor Full-Stack,</p>
          <p className="is-size-4">Pesquisador de EdTech,</p>
          <p className="is-size-4">Empreendedor</p>
        </div>
      </main>

      <footer className="footer">
        <p>Rafael Eiki - 2021</p>
        <p>Bacharel em Ciência da Computação pela UNICAMP</p>
      </footer>

    </div>
  )
}