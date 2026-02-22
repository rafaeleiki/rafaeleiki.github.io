"use client";

import Image from 'next/image';
import useTranslation from '../hooks/useTranslation';

export default function GridMedia({
  prefix,
  title,
  subtitle,
  time,
  description,
  imageSrc,
  long,
}) {
  const { f, fShared } = useTranslation(prefix);

  return (
    <article className="flex gap-4 rounded-xl bg-white/60 backdrop-blur-sm p-4 shadow-sm hover:shadow-md transition-shadow">
      {imageSrc && (
        <div className="shrink-0 w-12 h-12 md:w-16 md:h-16 relative">
          <Image
            alt=""
            src={imageSrc}
            width={64}
            height={64}
            className="rounded-lg object-contain"
          />
        </div>
      )}
      <div className="min-w-0 flex-1">
        <p className="font-semibold text-primary">{f(title)}</p>
        <p className="text-sm text-dark-light/70">
          {f(subtitle)}
          <span className="ml-2 text-dark-light/50">{f(time)}</span>
        </p>
        {long ? (
          <details className="mt-2">
            <summary className="cursor-pointer text-accent font-semibold text-sm hover:underline">
              {fShared('grid-media.more')} &#9660;
            </summary>
            <p className="mt-2 text-sm text-dark-light/80 leading-relaxed">
              {f(description)}
            </p>
          </details>
        ) : (
          <p className="mt-2 text-sm text-dark-light/80 leading-relaxed">
            {f(description)}
          </p>
        )}
      </div>
    </article>
  );
}
