import { useState } from 'react';
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
  
  return (
    <nav className="navbar is-transparent is-fixed-top pl-4">
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
          className="navbar-burger" 
          onClick={() => setOpen(!isOpen)}>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>

      <div className={`navbar-menu ${ isOpen && 'is-active' }`}>
        <div className="navbar-end">
        <Link href="/">
            <a className="navbar-item">{ f({ id: 'navbar.home' })}</a>
          </Link>

          <a className="navbar-item is-flex" href="https://github.com/rafaeleiki" target="_blank">
            <Image 
              src="/images/icons/github.svg" 
              width={28}
              height={28}
              className="p-1"
            />
            { f({ id: 'navbar.github' }) }
          </a>
          <a className="navbar-item is-flex" href="https://www.linkedin.com/in/rafaelimamura/" target="_blank">
            <Image
              src="/images/icons/linkedin.svg"
              width={28}
              height={28}
              className="p-1"
            />
            { f({ id: 'navbar.linkedin' }) }
          </a>

          <Link href="#" locale={otherLocale}>
            <a className="navbar-item">{ f({ id: 'navbar.showOtherLanguage' })}</a>
          </Link>
          
        </div>
      </div>
    </nav>
    );
  };
  