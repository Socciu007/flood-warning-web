import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import English from "../common/locales/en.json";
import Vietnamese from "../common/locales/vi.json";
import storageService from "../services/storage.service.js";
// import { lang } from "../common/const.config";

const resources = {
  eng: {
    translation: English,
  },
  vie: {
    translation: Vietnamese,
  },
};

const language = storageService.get("language");

i18n.use(initReactI18next).init({
  resources,
  lng: language && language !== "" ? language : "eng",
  keySeparator: false,
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
