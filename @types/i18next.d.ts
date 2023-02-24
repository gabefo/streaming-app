/**
 * If you want to enable locale keys typechecking and enhance IDE experience.
 *
 * Requires `resolveJsonModule:true` in your tsconfig.json.
 *
 * @link https://www.i18next.com/overview/typescript
 */
import 'i18next'

import type _404 from 'public/locales/en/404.json'
import type common from 'public/locales/en/common.json'
import type genres from 'public/locales/en/genres.json'
import type movieDetails from 'public/locales/en/movie-details.json'

interface I18nNamespaces {
  common: typeof common
  genres: typeof genres
  'movie-details': typeof movieDetails
  '404': typeof _404
}

declare module 'i18next' {
  interface CustomTypeOptions {
    defaultNS: 'common'
    resources: I18nNamespaces
  }
}
