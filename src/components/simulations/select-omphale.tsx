'use client'

import Select from '@codegouvfr/react-dsfr/SelectNext'
import { parseAsString, useQueryStates } from 'nuqs'

export const SelectOmphale = () => {
  const [queryStates, setQueryStates] = useQueryStates({
    omphale: parseAsString,
  })
  const scenarios = [
    {
      label: 'Population: Central | Décohabitation: Décélération',
      value: 'Central_B',
    },
    {
      label: 'Population: Central | Décohabitation: Tendanciel',
      value: 'Central_C',
    },
    {
      label: 'Population: Central | Décohabitation: Accélération',
      value: 'Central_H',
    },
    {
      label: 'Population: Basse | Décohabitation: Décélération',
      value: 'PB_B',
    },
    {
      label: 'Population: Basse | Décohabitation: Tendanciel',
      value: 'PB_C',
    },
    {
      label: 'Population: Basse | Décohabitation: Accélération',
      value: 'PB_H',
    },
    {
      label: 'Population: Haute | Décohabitation: Décélération',
      value: 'PH_B',
    },
    {
      label: 'Population: Haute | Décohabitation: Tendanciel',
      value: 'PH_C',
    },
    {
      label: 'Population: Haute | Décohabitation: Accélération',
      value: 'PH_H',
    },
  ]
  return (
    <Select
      label=""
      placeholder="Choix du scénario"
      nativeSelectProps={{
        onChange: (event) => setQueryStates({ omphale: event.target.value }),
        value: queryStates.omphale ?? undefined,
      }}
      options={scenarios}
      style={{ marginTop: '1rem' }}
    />
  )
}
