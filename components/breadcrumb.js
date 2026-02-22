import Link from './link';
import useTranslation from './hooks/useTranslation';

const navKeyMap = {
  '/developer': 'navbar.developer',
  '/researcher': 'navbar.researcher',
};

export default function Breadcrumb({ messagePrefix }) {
  const { fShared } = useTranslation(messagePrefix);
  const navKey = navKeyMap[messagePrefix] || '';

  return (
    <nav className="breadcrumb mt-6" aria-label="breadcrumbs">
        <ul>
          <li><Link href="/"><a href="#">{ fShared('navbar.home') }</a></Link></li>
          <li className="is-active"><a href="#" aria-current="page">{ fShared(navKey) }</a></li>
        </ul>
      </nav>
  );
}
