import { useTranslation } from "next-export-i18n";

export default (page) => {
  const { t } = useTranslation();
  const pageString = page ? `${page}.` : '';

  return {
    f: (key) => t(`${pageString}${key}`),
    fShared: (key) => t(`shared.${key}`),
  };
};
