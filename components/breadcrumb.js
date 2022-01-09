import Link from './link';
import useTranslation from './hooks/useTranslation';

export default function Breadcrumb({ messagePrefix }) {
  const { f, fShared } = useTranslation(messagePrefix);

  return (
    <nav className="breadcrumb mt-6" aria-label="breadcrumbs">
        <ul>
          <li><Link href="/"><a href="#">{ fShared('navbar.home') }</a></Link></li>
          <li className="is-active"><a href="#" aria-current="page">{ f('title') }</a></li>
        </ul>
      </nav>
  );
}
