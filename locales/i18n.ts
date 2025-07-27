import i18n from "i18next";
import {initReactI18next} from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import translationEN from "./lang/en.json";
import translationAR from "./lang/ar.json";
import translationHE from "./lang/he.json";

const resources = {
	en: {translation: translationEN},
	ar: {translation: translationAR},
	he: {translation: translationHE},
};

i18n.use(LanguageDetector) // מזהה אוטומטית את שפת הדפדפן
	.use(initReactI18next) // מחבר ל-React
	.init({
		resources,
		fallbackLng: "he",
		interpolation: {
			escapeValue: false,
		},
	});

export default i18n;
