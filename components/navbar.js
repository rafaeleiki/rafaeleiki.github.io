import { useState, useEffect } from 'react';

import Image from 'next/image';
import { useLanguageQuery, LanguageSwitcher } from 'next-export-i18n';

import useTranslation from './hooks/useTranslation';
import Link from './link';

export default function Navbar() {
  const [isOpen, setOpen] = useState(false);

  const { fShared } = useTranslation();
  const [query] = useLanguageQuery();

  const otherLocale = query?.lang === 'pt' ? 'en' : 'pt';

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
          <Link href="/"><a className="navbar-item">{ fShared('navbar.home')}</a></Link>
          <Link href="/developer"><a className="navbar-item">{ fShared('navbar.developer')}</a></Link>
          <Link href="/researcher"><a className="navbar-item">{ fShared('navbar.researcher')}</a></Link>

          <LanguageSwitcher lang={otherLocale}>
            <a className="navbar-item">{ fShared('navbar.showOtherLanguage')}</a>
          </LanguageSwitcher>

        </div>
      </div>
    </nav>
    );
  };
