import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import translationEN from "./public/locales/en/translation.json";
import translationFR from "./public/locales/fr/translation.json";

// don't want to use this?
// have a look at the Quick start guide 
// for passing in lng and translations on init


 const resources = {
   en: {
     translation: translationEN
   },
   fr: {
     translation: translationFR
   }
 };

i18n
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    resources,
    fallbackLng: 'fr',
    debug: true,

    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    }
  });


export default i18n;