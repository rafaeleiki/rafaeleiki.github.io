"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import {
  LanguageSwitcher,
  LinkWithLocale,
  useSelectedLanguage,
} from 'next-export-i18n';

import useTranslation from './hooks/useTranslation';

export default function Navbar() {
  const [isOpen, setOpen] = useState(false);
  const { fShared } = useTranslation();
  const { lang } = useSelectedLanguage();
  const otherLocale = lang === 'pt' ? 'en' : 'pt';

  useEffect(() => {
    const closeMenu = (e) => {
      if (isOpen && !e.target.closest('.burger-btn')) {
        setOpen(false);
      }
    };
    document.body.addEventListener('click', closeMenu, true);
    return () => document.body.removeEventListener('click', closeMenu, true);
  }, [isOpen]);

  const linkClass =
    'px-4 py-2 transition-colors font-semibold nav-link';

  const navLinks = (
    <>
      <LinkWithLocale href="/" className={linkClass}>
        {fShared('navbar.home')}
      </LinkWithLocale>
      <LinkWithLocale href="/developer" className={linkClass}>
        {fShared('navbar.developer')}
      </LinkWithLocale>
      <LinkWithLocale href="/researcher" className={linkClass}>
        {fShared('navbar.researcher')}
      </LinkWithLocale>
      <LanguageSwitcher lang={otherLocale}>
        <span className={linkClass + ' cursor-pointer'}>
          {fShared('navbar.showOtherLanguage')}
        </span>
      </LanguageSwitcher>
    </>
  );

  return (
    <nav
      className="fixed top-0 inset-x-0 z-50 opacity-0 backdrop-blur-sm"
      style={{
        background: 'linear-gradient(45deg, #0c1f1ad6, #043c32dc)',
        animation: 'fadeInTop 0.6s ease-in-out 1.5s forwards',
      }}
    >
      <div className="mx-auto max-w-6xl flex items-center justify-between px-4 h-14">
        <LinkWithLocale href="/">
          <Image
            alt="Rafael Eiki"
            src="/images/logo-new.webp"
            width={73}
            height={44}
            priority
          />
        </LinkWithLocale>

        <button
          className="burger-btn md:hidden flex flex-col justify-center gap-1.5 p-2 text-white"
          onClick={() => setOpen(!isOpen)}
          aria-label="Menu"
        >
          <span className="block w-5 h-0.5 bg-white" />
          <span className="block w-5 h-0.5 bg-white" />
          <span className="block w-5 h-0.5 bg-white" />
        </button>

        <div className="hidden md:flex items-center gap-1">{navLinks}</div>
      </div>

      {isOpen && (
        <div className="md:hidden flex flex-col pb-4 px-4 gap-1">
          {navLinks}
        </div>
      )}
    </nav>
  );
}
