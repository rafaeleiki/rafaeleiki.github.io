"use client";

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import GridMedia from './grid-media';
import useTranslation from '../hooks/useTranslation';

export const TEXT_COLUMN = 1;
export const IMAGE_COLUMN = 2;

function GridTitle({ title, prefix }) {
  const { f } = useTranslation(prefix);

  return (
    <h2
      className="text-3xl md:text-4xl font-bold text-primary mb-6 opacity-0"
      style={{ animation: 'fadeIn 0.6s ease-in-out forwards' }}
    >
      {f(title)}
    </h2>
  );
}

function GridRow({ section, messagesPrefix }) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  const { title, columns } = section;
  const hasImage = columns.some((col) => col.type === IMAGE_COLUMN);

  useEffect(() => {
    const el = ref.current;
    if (!el || inView) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0, rootMargin: '50px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [inView]);

  return (
    <div ref={ref} className="py-6" style={{ minHeight: '1px' }}>
      {title && <GridTitle prefix={messagesPrefix} title={title} />}

      <div
        className={`grid gap-8 ${
          hasImage
            ? 'grid-cols-1 md:grid-cols-2'
            : `grid-cols-1 md:grid-cols-${columns.length}`
        }`}
      >
        {columns.map((column, columnIndex) =>
          column.type === TEXT_COLUMN ? (
            <div
              key={columnIndex}
              style={{
                opacity: inView ? undefined : 0,
                animation: inView
                  ? `${columnIndex === 0 ? 'fadeInLeft' : 'fadeInRight'} 0.6s ease-in-out ${0.2 + columnIndex * 0.3}s both`
                  : undefined,
              }}
            >
              {column.title && (
                <GridTitle prefix={messagesPrefix} title={column.title} />
              )}
              <div className="space-y-6">
                {column.experiences.map((experienceItem, experienceIndex) => (
                  <GridMedia
                    {...experienceItem}
                    key={experienceIndex}
                    prefix={messagesPrefix}
                  />
                ))}
              </div>
            </div>
          ) : (
            <div
              key={columnIndex}
              className={`relative min-h-[300px] md:min-h-[350px] rounded-xl overflow-hidden ${
                hasImage && columns.length > 1 && columnIndex === 0
                  ? 'md:order-first'
                  : ''
              }`}
              style={{
                opacity: inView ? undefined : 0,
                animation: inView
                  ? `${columnIndex === 0 ? 'fadeInLeft' : 'fadeInRight'} 0.6s ease-in-out 0.2s both`
                  : undefined,
              }}
            >
              <Image
                alt={column.alt || ''}
                src={column.imageSrc}
                fill
                className="object-cover transition-transform duration-300 hover:scale-105"
                style={{ objectPosition: column.objectPosition || 'center' }}
                priority={column.priority}
              />
            </div>
          )
        )}
      </div>

      {hasImage && (
        <style>{`
          @media (max-width: 767px) {
            .grid > div:has(img) { order: -1; }
          }
        `}</style>
      )}
    </div>
  );
}

export default function Grid({ initialGrid, messagesPrefix }) {
  return (
    <div>
      {initialGrid.map((section, sectionIndex) => (
        <GridRow
          key={sectionIndex}
          section={section}
          messagesPrefix={messagesPrefix}
        />
      ))}
    </div>
  );
}
