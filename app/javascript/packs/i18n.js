import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from '../../../public/locales/en/translation.json';
import fr from '../../../public/locales/fr/translation.json';

const resources = {
    en,
    fr,
};

i18n
    .use(initReactI18next)
    // for all options read: https://www.i18next.com/overview/configuration-options
    .init({
        resources,
        lng: "en",
        interpolation: {
            escapeValue: false // react already safes from xss
        }
    });


export default i18n;