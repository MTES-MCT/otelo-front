'use client'

import Select from '@codegouvfr/react-dsfr/SelectNext'
import { parseAsString, useQueryStates } from 'nuqs'
import { tss } from 'tss-react'

type SelectOmphaleProps = {
  onChange?: (value: string) => void
}

export const SelectOmphale = ({ onChange }: SelectOmphaleProps) => {
  const { classes } = useStyles()
  const [queryStates, setQueryStates] = useQueryStates({
    omphale: parseAsString,
    population: parseAsString,
  })

  const scenarios = [
    {
      id: 'central',
      label: 'Scénario de Décohabitation: Décélération',
      value: 'Central_B',
    },
    {
      id: 'central',
      label: 'Scénario de Décohabitation: Tendanciel',
      value: 'Central_C',
    },
    {
      id: 'central',
      label: 'Scénario de Décohabitation: Accélération',
      value: 'Central_H',
    },
    {
      id: 'basse',
      label: 'Scénario de Décohabitation: Décélération',
      value: 'PB_B',
    },
    {
      id: 'basse',
      label: 'Scénario de Décohabitation: Tendanciel',
      value: 'PB_C',
    },
    {
      id: 'basse',
      label: 'Scénario de Décohabitation: Accélération',
      value: 'PB_H',
    },
    {
      id: 'haute',
      label: 'Scénario de Décohabitation: Décélération',
      value: 'PH_B',
    },
    {
      id: 'haute',
      label: 'Scénario de Décohabitation: Tendanciel',
      value: 'PH_C',
    },
    {
      id: 'haute',
      label: 'Scénario de Décohabitation: Accélération',
      value: 'PH_H',
    },
  ]

  const handleChange = (value: string) => {
    if (onChange) {
      onChange(value)
    }
    setQueryStates({ omphale: value })
  }
  const filteredScenarios = scenarios.filter((scenario) => scenario.id === queryStates.population)
  return (
    <Select
      label=""
      className={classes.select}
      placeholder="Choix du scénario"
      nativeSelectProps={{
        onChange: (event) => handleChange(event.target.value),
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
