import { useRouter } from "next/router";
import Image from 'next/image';
import Link from 'next/link';

import { useIntl } from "react-intl";

export default function Home(props) {
  const router = useRouter();
  const { locale, locales, defaultLocale } = router;

  const { formatMessage: f } = useIntl();

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
        <h1 className="is-size-1 block title">{ f({ id: 'name' }) }</h1>

        <p className="is-size-4 block"><Link href="/developer">{ f({ id: 'developer' }) }</Link></p>
        <p className="is-size-4 block">{ f({ id: 'researcher' }) }</p>
        <p className="is-size-4 block">{ f({ id: 'entrepreneur' }) }</p>

        <div className="column-footer pb-3">
          <span>{ f({ id: 'footer' }) }</span>
          
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
