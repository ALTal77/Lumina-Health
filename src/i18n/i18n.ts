import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import enTranslations from './en.json';
import arTranslations from './ar.json';

const savedLang = localStorage.getItem('lumina_lang') || 'en';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: enTranslations },
      ar: { translation: arTranslations },
    },
    lng: savedLang,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

export const updateHtmlDir = (lang: string) => {
  const dir = lang === 'ar' ? 'rtl' : 'ltr';
  document.documentElement.dir = dir;
  document.documentElement.lang = lang;
  localStorage.setItem('lumina_lang', lang);
};

// Initial update on setup
updateHtmlDir(savedLang);

export default i18n;
