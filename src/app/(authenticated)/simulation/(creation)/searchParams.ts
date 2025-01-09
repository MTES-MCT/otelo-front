import { createSearchParamsCache, parseAsString } from 'nuqs/server'

export const searchParamsCache = createSearchParamsCache({
  epci: parseAsString.withDefault(''),
  omphale: parseAsString.withDefault(''),
  projection: parseAsString.withDefault(''),
  q: parseAsString.withDefault(''),
  region: parseAsString.withDefault(''),
  tauxLV: parseAsString,
  tauxLVLD: parseAsString,
  tauxRS: parseAsString,
})
