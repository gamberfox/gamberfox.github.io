// src/i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import HttpApi from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

// Language resources
const resources = {
  en: {
    translation: {
      "welcome": "Welcome",
      "description": "This is an example of i18n in React.",
      "you can choose another language":"You can choose another language",
      "spanish":"spanish",
      "english":"english",

      "language-proficiency":"I have a high proficiency in the english language, this has helped me since a lot of resources for learning are in english",

      "home":"home"
    }
  },
  es: {
    translation: {
      "welcome": "Bienvenido",
      "description": "Este es un ejemplo de i18n en React.",
      "you can choose another language":"Puedes elegir otro idioma",
      "spanish":"español",
      "english":"ingles",

      "language-proficiency":"mi manejo del ingles es excepcional, esto me ha ayudado ya que muchos recursos para aprender sobre programacion estan en ingles",

      "home":"inicio"
    }
  }
//   jp: {
//     translation: {
//       "welcome": "sd",
//       "description": "Este es un ejemplo de i18n en React.",
//       "you can choose another language":"Puedes elegir otro idioma",
//       "spanish":"español",
//       "english":"ingles"
//     }
//   }
};

i18n
  .use(HttpApi)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en', // Default language
    fallbackLng: 'en',
    debug: true,
    interpolation: {
      escapeValue: false, // React already safes from xss
    }
  });

export default i18n;
