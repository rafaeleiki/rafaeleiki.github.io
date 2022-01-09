import Image from 'next/image';

import { useIntl } from "react-intl";
import useTranslation from './hooks/useTranslation';

export default function Footer() {

  const { fShared } = useTranslation();

  return (
    <footer className="footer">

      <div className="content has-text-centered">
        <span>{ fShared('footer.title') }</span>

        <a href="https://github.com/rafaeleiki" target="_blank">
          <Image
            src="/images/icons/github.svg"
            width={28}
            height={28}
            className="p-1 testeste"
          />
          { fShared('footer.github') }
        </a>
        <a href="https://www.linkedin.com/in/rafaelimamura/" target="_blank">
          <Image
            src="/images/icons/linkedin.svg"
            width={28}
            height={28}
            className="p-1 testeste"
          />
          { fShared('footer.linkedin') }
        </a>
      </div>

    </footer>
  );
};
