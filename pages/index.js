import Image from 'next/image';
import Link from '../components/link';

import Footer from "../components/footer";
import useTranslation from "../components/hooks/useTranslation";

export default function Home(props) {

  const { f } = useTranslation('/');

  return (
    <main className="columns is-mobile home-hero">
      <div className="column cover-column">
        <Image
          alt={f('main-image-alt')}
          src="/images/rafael-full.webp"
          layout="fill"
          objectFit="cover"
          priority
        />
      </div>

      <div className="column p-6 title-column">
        <h1 className="main-link is-size-1 block special title">{ f('name') }</h1>

        <p className="main-link is-size-4 block"><Link href="/developer">{ f('developer') }</Link></p>
        <p className="main-link is-size-4 block"><Link href="/researcher">{ f('researcher') }</Link></p>

        <div className="column-footer pb-3">
          <Footer />
        </div>
      </div>
    </main>
  );
}
