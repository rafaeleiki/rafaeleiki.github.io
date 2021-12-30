import Image from 'next/image';

import { useIntl } from "react-intl";

export default function Footer() {

  const { formatMessage: f } = useIntl();

  return (
    <footer className="footer">

      <div class="content has-text-centered">
        <span>{ f({ id: 'footer.title' }) }</span>

        <a href="https://github.com/rafaeleiki" target="_blank">
          <Image 
            src="/images/icons/github.svg" 
            width={28}
            height={28}
            className="p-1 testeste"
          />
          { f({ id: 'footer.github' }) }
        </a>
        <a href="https://www.linkedin.com/in/rafaelimamura/" target="_blank">
          <Image
            src="/images/icons/linkedin.svg"
            width={28}
            height={28}
            className="p-1 testeste"
          />
          { f({ id: 'footer.linkedin' }) }
        </a>
      </div>
      
    </footer>
  );
};
