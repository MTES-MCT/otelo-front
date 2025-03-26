'use client'

import Input from '@codegouvfr/react-dsfr/Input'
import { parseAsArrayOf, parseAsString, useQueryStates } from 'nuqs'
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
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, setSearchQueryState] = useQueryStates({
    epci: parseAsString.withDefault(''),
    epcis: parseAsArrayOf(parseAsString).withDefault([]),
    q: parseAsString.withDefault(''),
    region: parseAsString.withDefault(''),
  })
  const [isResultsVisible, setIsResultsVisible] = useState(false)

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value)
    setIsResultsVisible(true)
  }

  const handleInputClick = (item: GeoApiEpciResult | GeoApiCommuneResult) => {
    if ('codeEpci' in item) {
      setSearchQueryState({ epci: item.codeEpci ?? item.code, epcis: [], region: item.codeRegion })
    } else {
      setSearchQueryState({ epci: item.code ?? item.code, epcis: [], region: item.codesRegions[0] })
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
