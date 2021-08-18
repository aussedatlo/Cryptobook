import i18next from "i18next";
import { initReactI18next } from "react-i18next";

import commonEn from "./common/en.json";
import commonFr from "./common/fr.json";

i18next.use(initReactI18next).init({
  fallbackLng: "en",
  debug: __DEV__,
  interpolation: {
    escapeValue: false, // react already safes from xss
  },
  resources: {
    en: {
      common: commonEn,
    },
    fr: {
      common: commonFr,
    },
  },
});

export const changeLaguage = (languageKey: string) => {
  i18next.changeLanguage(languageKey); // -> returns a Promise
};

export default i18next;
