"use client";

import Image from 'next/image';
import useTranslation from './hooks/useTranslation';

export default function Footer() {
  const { fShared } = useTranslation();

  return (
    <footer className="py-8 text-center text-sm text-dark-light">
      <div className="flex items-center justify-center gap-4 mb-2">
        <a
          href="https://github.com/rafaeleiki"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1.5 text-dark-light hover:text-accent transition-colors p-2 min-w-[44px] min-h-[44px]"
        >
          <Image
            alt="GitHub"
            src="/images/icons/github.svg"
            width={20}
            height={20}
          />
          {fShared('footer.github')}
        </a>
        <a
          href="https://www.linkedin.com/in/rafaelimamura/"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1.5 text-dark-light hover:text-accent transition-colors p-2 min-w-[44px] min-h-[44px]"
        >
          <Image
            alt="LinkedIn"
            src="/images/icons/linkedin.svg"
            width={20}
            height={20}
          />
          {fShared('footer.linkedin')}
        </a>
      </div>
      <span className="text-dark-light/60">
        &copy; {fShared('footer.title')}
      </span>
    </footer>
  );
}
