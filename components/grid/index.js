import { useEffect, useRef, useState } from 'react';
import { useIntl } from 'react-intl';
import Image from 'next/image';
import GridMedia from './grid-media';

export const TEXT_COLUMN = 1;
export const IMAGE_COLUMN = 2;

const intersectionOptions = {
  threshold: 0,
};

function GridTitle({ title }) {
  const { formatMessage: f } = useIntl();

  return (
    <h1 className="special title is-size-1 block fade-in">{ f({ id: title }) }</h1>
  );
}

export default function Grid({initialGrid, messagesPrefix}) {
  const [grid, setGrid] = useState(initialGrid);
  const containerRef = useRef(null);

  const hasImage = (columns) => columns.some((col) => col.type === IMAGE_COLUMN);

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
      containerRef.current.querySelectorAll('.columns:not(.show)').forEach((e) => observer.observe(e));
    }

    return () => observer.disconnect();
  }, [containerRef, grid]);

  return (
    <div ref={containerRef}>
      {
        grid.map(({ show, title, columns }, sectionIndex) => (
          <div key={sectionIndex} className="section">
            { title && <GridTitle title={title} /> }
            <div className={`columns grid ${ show ? 'show' : '' } ${ hasImage(columns) ? 'has-image' : '' }`} data-index={sectionIndex}>
              { columns.map((column, columnIndex) =>
                  column.type === TEXT_COLUMN
                  ? (<div className="column text-column" key={columnIndex}>
                      { column.title && <GridTitle title={column.title} /> }
                      { column.experiences.map((experienceItem, experienceIndex) => (
                          <GridMedia {...experienceItem} key={experienceIndex} prefix={messagesPrefix} />
                      )) }
                    </div>)
                  : (
                      <div className="column image-column" key={columnIndex}>
                        <Image
                          src={column.imageSrc}
                          layout="fill"
                          objectFit="cover"
                          objectPosition={column.objectPosition}
                          priority={column.priority}
                        />
                      </div>
                    )
                )
              }
            </div>
          </div>
        ))
      }
    </div>
  );
}
