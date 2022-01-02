import { useIntl } from 'react-intl';
import Image from 'next/image';

export default function GridMedia ({ title, subtitle, time, description, imageSrc, long }) {

  const { formatMessage: f } = useIntl();

  return (
    <article className="media grid-media">
      {
        imageSrc && (
          <figure className="media-left">
            <p className="image is-64x64">
              <Image
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
            <strong>{ f({ id: title }) }</strong>{' '}
            <small className="is-block">
              { f({ id: subtitle }) }{'  '}{ f({ id: time }) }
            </small>
          </p>
          {
            long
            ? (
              <details>
                <summary>{ f({ id: 'grid-media.more' }) }</summary>
                { f({ id: description }) }
              </details>
            )
            : <p className='mt-1'>{ f({ id: description }) }</p>
          }
        </div>
      </div>
    </article>
  );
};
