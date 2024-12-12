'use client'

import Select from '@codegouvfr/react-dsfr/SelectNext'
import { parseAsString, useQueryStates } from 'nuqs'
import { tss } from 'tss-react'

export const SelectOmphale = () => {
  const { classes } = useStyles()
  const [queryStates, setQueryStates] = useQueryStates({
    omphale: parseAsString,
    population: parseAsString,
  })

  const scenarios = [
    {
      id: 'central',
      label: 'Population: Central | Décohabitation: Décélération',
      value: 'Central_B',
    },
    {
      id: 'central',
      label: 'Population: Central | Décohabitation: Tendanciel',
      value: 'Central_C',
    },
    {
      id: 'central',
      label: 'Population: Central | Décohabitation: Accélération',
      value: 'Central_H',
    },
    {
      id: 'basse',
      label: 'Population: Basse | Décohabitation: Décélération',
      value: 'PB_B',
    },
    {
      id: 'basse',
      label: 'Population: Basse | Décohabitation: Tendanciel',
      value: 'PB_C',
    },
    {
      id: 'basse',
      label: 'Population: Basse | Décohabitation: Accélération',
      value: 'PB_H',
    },
    {
      id: 'haute',
      label: 'Population: Haute | Décohabitation: Décélération',
      value: 'PH_B',
    },
    {
      id: 'haute',
      label: 'Population: Haute | Décohabitation: Tendanciel',
      value: 'PH_C',
    },
    {
      id: 'haute',
      label: 'Population: Haute | Décohabitation: Accélération',
      value: 'PH_H',
    },
  ]

  const filteredScenarios = scenarios.filter((scenario) => scenario.id === queryStates.population)
  return (
    <Select
      label=""
      className={classes.select}
      placeholder="Choix du scénario"
      nativeSelectProps={{
        onChange: (event) => setQueryStates({ omphale: event.target.value }),
        value: queryStates.omphale ?? undefined,
      }}
      options={filteredScenarios}
    />
  )
}

const useStyles = tss.create({
  select: {
    marginTop: '1rem',
  },
})
