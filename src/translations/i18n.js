import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './en.json'
import ta from './ta.json';

i18next.use(initReactI18next).init({
    compatibilityJSON: 'v3',
    lng: 'en',
    fallbackLng: 'en',
    resources: {
        en: en,
        ta: ta,
    },
    react: {
        useSuspense: false
    },
    interpolation: {
        escapeValue: false // react already safes from xss
    }
});

export default i18next;