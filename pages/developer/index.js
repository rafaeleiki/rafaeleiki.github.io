import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { useIntl } from 'react-intl';

import {
  TEXT_COLUMN,
  EXPERIENCE_GRID,
  EDUCATION_GRID,
} from './_constants';

const intersectionOptions = {
  threshold: 0.2,
};

function Grid({title, initialGrid}) {
  const [grid, setGrid] = useState(initialGrid);
  const containerRef = useRef(null);

  const { formatMessage } = useIntl();
  const fCompany = (company, id) => formatMessage({ id: `experiences.${company}.${id}` });

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const [entry] = entries;

      if (entry.isIntersecting) {
        const { index } = entry.target.dataset;

        const newGrid = [...grid];
        newGrid[index].show = true;

        setGrid(newGrid);
        observer.unobserve(entry.target);
      }
    }, intersectionOptions);

    if (containerRef.current) {
      containerRef.current.querySelectorAll('.section.columns:not(.show)').forEach((e) => observer.observe(e));
    }

    return () => observer.disconnect();
  }, [containerRef, grid]);

  return (
    <div ref={containerRef}>
      {
        grid.map(({ show, columns }, i) => (
          <div key={i} data-index={i} className={`section columns ${ show ? 'show' : '' }`}>
            { columns.map((column, i) => 
                column.type === TEXT_COLUMN 
                ? (<div className="column text-column" key={i}>
                    { i === 0 && 
                      (<h1 className="title is-size-1 block">{title}</h1>) 
                    }
                    { column.experiences.map(({ company, imageSrc }, i) => (
                      <article className="media" key={i}>
                        <figure className="media-left">
                          <p className="image is-64x64">
                            <Image
                              src={imageSrc}
                              width={64}
                              height={64}
                            />
                          </p>
                        </figure>
                        <div className="media-content">
                          <div className="content">
                            <p>
                              <strong>{ fCompany(company, 'title') }</strong>{' '}
                              <small className="is-inline-block">@{ fCompany(company, 'company') }</small>{'  '} 
                              <small className="is-inline-block">{ fCompany(company, 'time') }</small>
                              <br />
                              { fCompany(company, 'description') }
                            </p>
                          </div>
                        </div>
                      </article>
                    )) }
                  </div>)
                : (
                    <div className="column image-column" key={i}>
                      <Image
                        src={column.imageSrc}
                        layout="fill"
                        objectFit="cover"
                        objectPosition={column.objectPosition}
                      />
                    </div>
                  )
              ) 
            }
          </div>    
        ))
      }
    </div>
  );
}

export default function Developer() {

  const { formatMessage: f } = useIntl();

  return (
    <main className="navbar-padded-contrainer container">
      <div className="block px-5 py-6">
        <nav className="breadcrumb mt-6" aria-label="breadcrumbs">
          <ul>
            <li><Link href="/"><a href="#">{ f({ id: 'navbar.home' }) }</a></Link></li>
            <li className="is-active"><a href="#" aria-current="page">{ f({ id: 'title' }) }</a></li>
          </ul>
        </nav>
      </div>

      { <Grid title={f({ id: 'experiences.title' })} initialGrid={EXPERIENCE_GRID} key="experiences-section" /> }

      { <Grid title={f({ id: 'education.title' })} initialGrid={EDUCATION_GRID} key="education-section" /> }

    </main>
  );
}
