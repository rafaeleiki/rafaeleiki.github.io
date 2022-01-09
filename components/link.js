import NextLink from 'next/link';
import { useLanguageQuery } from 'next-export-i18n';

export default function Link({ href, children }) {
  const [query] = useLanguageQuery();

  return (
    <NextLink href={{ pathname: href, query }}>
      { children }
    </NextLink>
  );
}
