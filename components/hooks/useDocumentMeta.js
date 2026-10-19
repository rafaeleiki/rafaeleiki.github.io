'use client';

import { useEffect } from 'react';

const META_FIELDS = [
  { selector: 'meta[name="description"]', key: 'description' },
  { selector: 'meta[property="og:locale"]', key: 'ogLocale' },
  { selector: 'meta[property="og:title"]', key: 'title' },
  { selector: 'meta[property="og:description"]', key: 'description' },
  { selector: 'meta[name="twitter:title"]', key: 'title' },
  { selector: 'meta[name="twitter:description"]', key: 'description' },
];

export default function useDocumentMeta(meta) {
  useEffect(() => {
    document.documentElement.lang = meta.htmlLang;
    document.title = meta.title;

    for (const { selector, key } of META_FIELDS) {
      document.querySelector(selector)?.setAttribute('content', meta[key]);
    }

    const titleElement = document.querySelector('title');
    if (!titleElement) return undefined;

    const observer = new MutationObserver(() => {
      if (document.title !== meta.title) document.title = meta.title;
    });
    observer.observe(titleElement, { childList: true, characterData: true, subtree: true });

    return () => observer.disconnect();
  }, [meta]);
}
