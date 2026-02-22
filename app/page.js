"use client";

import Image from 'next/image';
import { LinkWithLocale } from 'next-export-i18n';
import useTranslation from '../components/hooks/useTranslation';
import Footer from '../components/footer';

export default function Home() {
  const { f } = useTranslation('/');

  return (
    <main className="flex flex-col items-center justify-center min-h-screen px-4 pt-20 pb-8">
      <div
        className="w-full max-w-md bg-white/70 backdrop-blur-md rounded-2xl shadow-lg p-8 text-center opacity-0"
        style={{ animation: 'fadeIn 0.8s ease-in-out 0.3s forwards' }}
      >
        {/* Avatar */}
        <div
          className="mx-auto w-[120px] h-[120px] rounded-full overflow-hidden mb-6 ring-4 ring-primary-light/40 opacity-0"
          style={{ animation: 'fadeIn 0.6s ease-in-out 0.6s forwards' }}
        >
          <Image
            alt={f('main-image-alt')}
            src="/images/rafael-full.webp"
            width={120}
            height={120}
            className="object-cover w-full h-full"
            priority
          />
        </div>

        {/* Name */}
        <h1
          className="text-3xl font-bold text-primary mb-1 opacity-0"
          style={{ animation: 'fadeIn 0.6s ease-in-out 0.9s forwards' }}
        >
          {f('name')}
        </h1>

        {/* Roles */}
        <p
          className="text-dark-light/70 mb-1 opacity-0"
          style={{ animation: 'fadeIn 0.6s ease-in-out 1.1s forwards' }}
        >
          {f('developer')}
        </p>
        <p
          className="text-dark-light/70 mb-4 opacity-0"
          style={{ animation: 'fadeIn 0.6s ease-in-out 1.3s forwards' }}
        >
          {f('researcher')}
        </p>

        {/* Tagline */}
        <p
          className="text-dark-light italic mb-6 opacity-0"
          style={{ animation: 'fadeIn 0.6s ease-in-out 1.5s forwards' }}
        >
          &ldquo;{f('tagline')}&rdquo;
        </p>

        {/* Links */}
        <div
          className="flex flex-wrap justify-center gap-3 mb-6 opacity-0"
          style={{ animation: 'fadeIn 0.6s ease-in-out 1.7s forwards' }}
        >
          <LinkWithLocale
            href="/developer"
            className="px-4 py-2 rounded-full bg-primary text-sm font-semibold hover:bg-primary/80 transition-colors"
            style={{ color: '#fff' }}
          >
            Developer
          </LinkWithLocale>
          <LinkWithLocale
            href="/researcher"
            className="px-4 py-2 rounded-full bg-primary text-sm font-semibold hover:bg-primary/80 transition-colors"
            style={{ color: '#fff' }}
          >
            Researcher
          </LinkWithLocale>
        </div>

        {/* Social */}
        <div
          className="flex justify-center gap-4 opacity-0"
          style={{ animation: 'fadeIn 0.6s ease-in-out 1.9s forwards' }}
        >
          <a
            href="https://github.com/rafaeleiki"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 text-dark-light/60 hover:text-accent transition-colors text-sm p-2"
          >
            <Image
              alt="GitHub"
              src="/images/icons/github.svg"
              width={18}
              height={18}
            />
            GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/rafaelimamura/"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 text-dark-light/60 hover:text-accent transition-colors text-sm p-2"
          >
            <Image
              alt="LinkedIn"
              src="/images/icons/linkedin.svg"
              width={18}
              height={18}
            />
            LinkedIn
          </a>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-8 text-dark-light/40 text-sm">
        &copy; {f('name')}
      </div>
    </main>
  );
}
