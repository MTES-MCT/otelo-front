'use client'

import { RadioButtons } from '@codegouvfr/react-dsfr/RadioButtons'
import classNames from 'classnames'
import { parseAsString, useQueryState } from 'nuqs'
import { FC } from 'react'
import styles from './charts.module.css'

export const PopulationScenariosSelection: FC = () => {
  const [population, setPopulation] = useQueryState('population', parseAsString)

  const RADIO_OPTIONS = [
    {
      label: 'Basse',
      nativeInputProps: {
        value: 'basse',
        checked: population === 'basse',
        onChange: () => setPopulation('basse'),
      },
    },
    {
      label: 'Centrale',
      nativeInputProps: {
        value: 'central',
        checked: population === 'central',
        onChange: () => setPopulation('central'),
      },
    },
    {
      label: 'Haute',
      nativeInputProps: {
        value: 'haute',
        checked: population === 'haute',
        onChange: () => setPopulation('haute'),
      },
    },
  ]

  return (
    <div className={styles.compactRadio}>
      <RadioButtons
        legend="Choisissez une projection d'évolution de la population"
        orientation="horizontal"
        options={RADIO_OPTIONS}
        name="population-scenario"
        classes={{
          inputGroup: 'fr-radio-rich fr-width-full fr-height-full',
          content: classNames('fr-justify-content-space-between fr-flex', styles.noWrap),
        }}
      />
    </div>
  )
}
