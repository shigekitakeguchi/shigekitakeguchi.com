import { Locale } from '@/types';

const dictionaries = {
  ja: () => import('@/locales/ja.json').then((module) => module.default),
  en: () => import('@/locales/en.json').then((module) => module.default),
};

export const getDictionary = async (locale: Locale) => {
  return dictionaries[locale]();
};



