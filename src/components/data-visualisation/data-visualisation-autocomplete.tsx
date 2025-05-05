'use client'

import { parseAsString, parseAsStringEnum, useQueryStates } from 'nuqs'
import { AutocompleteInput } from '~/components/simulations/autocomplete/autocomplete-input'
import { GeoApiCommuneResult, GeoApiEpciResult } from '~/hooks/use-geoapi-search'

export const DatavisualisationAutocomplete = () => {
  const [_, setSearchQueryState] = useQueryStates({
    epci: parseAsString,
    type: parseAsStringEnum([
      'projection-population-evolution',
      'projection-menages-evolution',
      'population-evolution',
      'menage-evolution',
    ]),
  })
  const handleInputClick = (item: GeoApiEpciResult | GeoApiCommuneResult) => {
    const code = 'codeEpci' in item ? (item.codeEpci ?? item.code) : item.code
    setSearchQueryState({
      epci: code,
    })
  }
  return (
    <AutocompleteInput
      hintText="Saisissez le nom de l'EPCI du territoire concerné, ou par défaut, vous pouvez saisir le nom de la commune ou son code postal."
      onClick={handleInputClick}
    />
  )
}
