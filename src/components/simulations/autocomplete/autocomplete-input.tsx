'use client'

import Input from '@codegouvfr/react-dsfr/Input'
import { parseAsArrayOf, parseAsString, parseAsStringEnum, useQueryStates } from 'nuqs'
import { FC, useState } from 'react'
import { tss } from 'tss-react'
import { AutocompleteResults } from '~/components/simulations/autocomplete/autocomplete-results'
import { GeoApiCommuneResult, GeoApiEpciResult, useGeoApiSearch } from '~/hooks/use-geoapi-search'

type AutocompleteInputProps = {
  hintText: string
  label?: string
}

export const AutocompleteInput: FC<AutocompleteInputProps> = ({ hintText, label }: AutocompleteInputProps) => {
  const { classes } = useStyles()
  const { data, isError, searchQuery, setSearchQuery } = useGeoApiSearch()
  const [queryState, setSearchQueryState] = useQueryStates({
    epcis: parseAsArrayOf(parseAsString).withDefault([]),
    q: parseAsString.withDefault(''),
    region: parseAsString.withDefault(''),
    type: parseAsStringEnum(['bh', 'epcis']),
    epciChart: parseAsString.withDefault(''),
  })
  const [isResultsVisible, setIsResultsVisible] = useState(false)

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value)
    setIsResultsVisible(true)
  }

  const handleInputClick = (item: GeoApiEpciResult | GeoApiCommuneResult) => {
    const code = 'codeEpci' in item ? (item.codeEpci ?? item.code) : item.code
    const region = 'codesRegions' in item ? item.codesRegions[0] : item.codeRegion
    if (!queryState.type || queryState.type === 'bh') {
      setSearchQueryState({ epcis: [code], region, epciChart: code })
    } else {
      setSearchQueryState({
        epcis: queryState.epcis.filter((e) => e !== code).concat(code),
        region,
        epciChart: code,
      })
    }

    setSearchQuery(item.nom)
    setIsResultsVisible(false)
  }

  const hasResults = (data.communes.length > 0 || data.epcis.length > 0) && isResultsVisible

  return (
    <div className={classes.container}>
      <Input
        hintText={hintText}
        label={label}
        nativeInputProps={{ onChange: handleInputChange, value: searchQuery }}
        state={isError ? 'error' : 'default'}
        style={{ marginBottom: 0 }}
      />
      {hasResults && <AutocompleteResults onClick={handleInputClick} data={data} />}
    </div>
  )
}

const useStyles = tss.create({
  container: {
    position: 'relative',
  },
})
