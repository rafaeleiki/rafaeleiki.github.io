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
    <div className="">
      <Head>
        <title>Rafael Eiki</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar />

      <main className="columns is-mobile home-hero">
        <div className="column cover-column">
          <Image 
            src="/images/rafael-full.webp"
            layout="fill"
            objectFit="cover"
            width={1000}
            height={1500}
          />
        </div>

        <div className="column p-6 title-column">
          <h1 className="is-size-1 block">
            Rafael Eiki
          </h1>

          <p className="is-size-4 block">Desenvolvedor Full-Stack</p>
          <p className="is-size-4 block">Pesquisador de EdTech</p>
          <p className="is-size-4 block">Empreendedor</p>

          <div className="column-footer">
            sadsad
            <style jsx>{`
              .column-footer {
                position: absolute;
                bottom: 0;
              }
            `}</style>
          </div>
        </div>
      </main>

    </div>
  )
}