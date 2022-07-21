import Image from 'next/image';
import useTranslation from '../hooks/useTranslation';

export default function GridMedia ({ prefix, title, subtitle, time, description, imageSrc, long }) {

  const { f, fShared } = useTranslation(prefix);

  return (
    <article className="media grid-media">
      {
        imageSrc && (
          <figure className="media-left">
            <p className="image is-64x64">
              <Image
                alt=""
                src={imageSrc}
                width={64}
                height={64}
              />
            </p>
          </figure>
        )
      }
      <div className="media-content">
        <div className="content">
          <p className='mb-1'>
            <strong>{ f(title) }</strong>{' '}
            <small className="is-block">
              { f(subtitle) }{'  '}{ f(time) }
            </small>
          </p>
          {
            long
            ? (
              <details>
                <summary>{ fShared('grid-media.more') }</summary>
                { f(description) }
              </details>
            )
            : <p className='mt-1'>{ f(description) }</p>
          }
        </div>
      </div>
    </article>
  );
};
