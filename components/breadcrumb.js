import { useIntl } from 'react-intl';
import Link from 'next/link';

export default function Breadcrumb() {
  const { formatMessage: f } = useIntl();

  return (
    <nav className="breadcrumb mt-6" aria-label="breadcrumbs">
        <ul>
          <li><Link href="/"><a href="#">{ f({ id: 'navbar.home' }) }</a></Link></li>
          <li className="is-active"><a href="#" aria-current="page">{ f({ id: 'title' }) }</a></li>
        </ul>
      </nav>
  );
}
