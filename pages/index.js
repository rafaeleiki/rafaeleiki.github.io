import { useRouter } from "next/router";
import Image from 'next/image';
import Link from 'next/link';

import { useIntl } from "react-intl";
import Footer from "../components/footer";

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
          priority
        />
      </div>

      <div className="column p-6 title-column">
        <h1 className="main-link is-size-1 block special title">{ f({ id: 'name' }) }</h1>

        <p className="main-link is-size-4 block"><Link href="/developer">{ f({ id: 'developer' }) }</Link></p>
        <p className="main-link is-size-4 block"><Link href="/researcher">{ f({ id: 'researcher' }) }</Link></p>
        <p className="main-link is-size-4 block">{ f({ id: 'entrepreneur' }) }</p>

        <div className="column-footer pb-3">
          <Footer />
        </div>
      </div>
    </main>
  );
}
