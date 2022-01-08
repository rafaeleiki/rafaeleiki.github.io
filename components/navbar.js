import { useState, useEffect } from 'react';
import { useIntl } from "react-intl";

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from "next/router";

export default function Navbar() {
  const [isOpen, setOpen] = useState(false);

  const { formatMessage: f } = useIntl();

  const router = useRouter();
  const { locale } = router;

  const otherLocale = locale === 'pt' ? 'en' : 'pt';

  const isActiveClass = isOpen ? 'is-active' : '';

  useEffect(() => {
    const closeMenu = () => {
      if (isOpen) {
        setOpen(false);
      }
    }

    document.body.addEventListener('click', closeMenu, true);

    return () => {
      document.body.removeEventListener('click', closeMenu, true);
    }
  }, []);

  return (
    <nav className="navbar is-fixed-top pl-4">
      <div className="navbar-brand">
        <Link href="/">
          <a className="navbar-item">
            <Image
              src="/images/logo-new.webp"
              width={73}
              height={44}
            />
          </a>
        </Link>
        <div
          className={`navbar-burger ${ isActiveClass }`}
          onClick={() => setOpen(!isOpen)}>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>

      <div className={`navbar-menu ${ isActiveClass }`}>
        <div className="navbar-end">
          <Link href="/"><a className="navbar-item">{ f({ id: 'navbar.home' })}</a></Link>
          <Link href="/developer"><a className="navbar-item">{ f({ id: 'navbar.developer' })}</a></Link>
          <Link href="/researcher"><a className="navbar-item">{ f({ id: 'navbar.researcher' })}</a></Link>

          <Link href="#" locale={otherLocale}>
            <a className="navbar-item">{ f({ id: 'navbar.showOtherLanguage' })}</a>
          </Link>

        </div>
      </div>
    </nav>
    );
  };
