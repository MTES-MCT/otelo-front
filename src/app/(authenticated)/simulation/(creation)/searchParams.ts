import { createSearchParamsCache, parseAsArrayOf, parseAsString, parseAsStringEnum } from 'nuqs/server'

export const searchParamsCache = createSearchParamsCache({
  epcis: parseAsArrayOf(parseAsString).withDefault([]),
  type: parseAsStringEnum(['bh', 'epcis']).withDefault('bh'),
  omphale: parseAsString.withDefault(''),
  projection: parseAsString.withDefault(''),
  q: parseAsString.withDefault(''),
  region: parseAsString.withDefault(''),
})
