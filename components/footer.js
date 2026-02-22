import Image from 'next/image';

import { useIntl } from "react-intl";
import useTranslation from './hooks/useTranslation';

export default function Footer() {

  const { fShared } = useTranslation();

  return (
    <footer className="footer">

      <div className="content has-text-centered">
        <span>{ fShared('footer.title') } - { new Date().getFullYear() }</span>

        <a href="https://github.com/rafaeleiki" target="_blank" rel="noreferrer">
          <Image
            alt="GitHub"
            src="/images/icons/github.svg"
            width={28}
            height={28}
            className="footer-icon"
          />
          { fShared('footer.github') }
        </a>
        <a href="https://www.linkedin.com/in/rafaelimamura/" target="_blank" rel="noreferrer">
          <Image
            alt="LinkedIn"
            src="/images/icons/linkedin.svg"
            width={28}
            height={28}
            className="footer-icon"
          />
          { fShared('footer.linkedin') }
        </a>
      </div>

    </footer>
  );
};
