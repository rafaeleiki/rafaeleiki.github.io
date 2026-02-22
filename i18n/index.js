var en = require('./translations.en.json');
var pt = require('./translations.pt.json');

const i18n = {
  translations: {
    en: en.i18n,
    pt: pt.i18n,
  },
  defaultLang: 'en',
  languageDataStore: 'query',
};

module.exports = i18n;
