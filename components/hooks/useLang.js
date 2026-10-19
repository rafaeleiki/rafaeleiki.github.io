'use client';

import { useSyncExternalStore } from 'react';

const LANG_EVENT = 'langchange';
const DEFAULT_LANG = 'en';

const normalizeLang = (value) => (value === 'pt' || value === 'en' ? value : DEFAULT_LANG);

function subscribe(onChange) {
  window.addEventListener('popstate', onChange);
  window.addEventListener(LANG_EVENT, onChange);
  return () => {
    window.removeEventListener('popstate', onChange);
    window.removeEventListener(LANG_EVENT, onChange);
  };
}

const getSnapshot = () => normalizeLang(new URLSearchParams(window.location.search).get('lang'));

const getServerSnapshot = () => DEFAULT_LANG;

function writeLangToUrl(lang) {
  const url = new URL(window.location.href);
  url.searchParams.set('lang', lang);
  window.history.replaceState(null, '', url);
  window.dispatchEvent(new Event(LANG_EVENT));
}

export default function useLang() {
  const lang = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const toggleLang = () => writeLangToUrl(lang === 'en' ? 'pt' : 'en');

  return { lang, toggleLang };
}
