import { useRouter } from "next/router";
import Image from 'next/image';
import Link from 'next/link';

import { useIntl } from "react-intl";

export default function Home(props) {
  const router = useRouter();
  const { locale, locales, defaultLocale } = router;

  const { formatMessage } = useIntl();
  const f = (id) => formatMessage({ id });

  return (
    <main className="columns is-mobile home-hero">
      <div className="column cover-column">
        <Image 
          src="/images/rafael-full.webp"
          layout="fill"
          objectFit="cover"
        />
      </div>

      <div className="column p-6 title-column">
        <h1 className="is-size-1 block title">
          Rafael Eiki
        </h1>

        <p className="is-size-4 block"><Link href="/developer">Desenvolvedor Full-Stack</Link></p>
        <p className="is-size-4 block">Pesquisador de EdTech</p>
        <p className="is-size-4 block">Empreendedor</p>

        <div className="column-footer pb-3">
          <span>R.Eiki - 2021</span>
          
          <style jsx>{`
            .column-footer {
              position: absolute;
              bottom: 0;
            }
          `}</style>
        </div>
      </div>
    </main>
  );
}
