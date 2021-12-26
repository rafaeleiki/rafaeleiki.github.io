import Image from 'next/image';
import Link from 'next/link';
import { useIntl } from 'react-intl';

import {
  TEXT_COLUMN,
  EXPERIENCE_GRID,
  EDUCATION_GRID,
} from './_constants';

function Grid({title, grid}) {
  const { formatMessage } = useIntl();
  const fCompany = (company, id) => formatMessage({ id: `experiences.${company}.${id}` });

  return (
    <div>
      {
        grid.map((columns, i) => (
          <div className="section columns">
            { columns.map((column) => 
                column.type === TEXT_COLUMN 
                ? (<div className="column text-column">
                    { i === 0 && 
                      (<h1 className="title is-size-1 block">{title}</h1>) 
                    }
                    { column.experiences.map(({ company, imageSrc }) => (
                      <article class="media">
                        <figure class="media-left">
                          <p class="image is-64x64">
                            <Image
                              src={imageSrc}
                              width={64}
                              height={64}
                            />
                          </p>
                        </figure>
                        <div class="media-content">
                          <div class="content">
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
                    <div className="column image-column">
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
            <li><Link href="/"><a href="#">Home</a></Link></li>
            <li className="is-active"><a href="#" aria-current="page">{ f({ id: 'title' }) }</a></li>
          </ul>
        </nav>
      </div>

      { <Grid title={f({ id: 'experiences.title' })} grid={EXPERIENCE_GRID} /> }

      { <Grid title={f({ id: 'education.title' })} grid={EDUCATION_GRID} /> }

    </main>
  );
}
