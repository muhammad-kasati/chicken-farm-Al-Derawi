import 'server-only'

const dictionaries = {
  ar: () => import('./ar.json').then((module) => module.default),
  he: () => import('./he.json').then((module) => module.default),
}

export const getDictionary = async (locale: 'ar' | 'he') => dictionaries[locale]()
