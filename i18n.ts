export const locales = ['en', 'ja'] as const
export type Locale = (typeof locales)[number]

export const defaultLocale: Locale = 'en'

// Pages Router用のヘルパー関数
export function getMessages(locale: Locale) {
  return import(`./messages/${locale}.json`).then((mod) => mod.default)
}


