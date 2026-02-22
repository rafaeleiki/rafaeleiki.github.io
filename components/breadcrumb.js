"use client";

import { LinkWithLocale } from 'next-export-i18n';
import useTranslation from './hooks/useTranslation';

const navKeyMap = {
  '/developer': 'navbar.developer',
  '/researcher': 'navbar.researcher',
};

export default function Breadcrumb({ messagePrefix }) {
  const { fShared } = useTranslation(messagePrefix);
  const navKey = navKeyMap[messagePrefix] || '';

  return (
    <nav
      className="mt-6 text-sm opacity-0"
      style={{ animation: 'fadeIn 0.6s ease-in-out forwards' }}
      aria-label="breadcrumbs"
    >
      <ol className="flex gap-2 text-dark-light/70">
        <li>
          <LinkWithLocale href="/" className="hover:text-accent transition-colors">
            {fShared('navbar.home')}
          </LinkWithLocale>
        </li>
        <li className="before:content-['/'] before:mr-2">{fShared(navKey)}</li>
      </ol>
    </nav>
  );
}
