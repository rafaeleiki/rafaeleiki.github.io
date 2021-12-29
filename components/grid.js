import { useEffect, useRef, useState } from 'react';
import { useIntl } from 'react-intl';
import Image from 'next/image';

export const TEXT_COLUMN = 1;
export const IMAGE_COLUMN = 2;

const intersectionOptions = {
  threshold: 0.2,
};

export default function Grid({initialGrid, messagesPrefix}) {
  const [grid, setGrid] = useState(initialGrid);
  const containerRef = useRef(null);

  const { formatMessage: f } = useIntl();
  const fCompany = (company, id) => f({ id: `${messagesPrefix}.${company}.${id}` });

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
        grid.map(({ show, columns }, sectionIndex) => (
          <div key={sectionIndex} data-index={sectionIndex} className={`section columns ${ show ? 'show' : '' }`}>
            { columns.map((column, columnIndex) => 
                column.type === TEXT_COLUMN 
                ? (<div className="column text-column" key={columnIndex}>
                    { sectionIndex === 0 && 
                      (<h1 className="title is-size-1 block">{ f({ id: `${messagesPrefix}.title` }) }</h1>) 
                    }
                    { column.experiences.map(({ company, imageSrc }, experienceIndex) => (
                      <article className="media" key={experienceIndex}>
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
                    <div className="column image-column" key={columnIndex}>
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
