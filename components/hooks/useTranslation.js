"use client";

import { useTranslation as nextTranslation } from "next-export-i18n";

const useTranslation = (page) => {
  const { t } = nextTranslation();
  const pageString = page ? `${page}.` : '';

  return {
    f: (key) => t(`${pageString}${key}`),
    fShared: (key) => t(`shared.${key}`),
  };
};

export default useTranslation;
