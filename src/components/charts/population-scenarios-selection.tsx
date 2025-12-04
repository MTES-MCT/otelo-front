'use client'

import Button from '@codegouvfr/react-dsfr/Button'
import { RadioButtons } from '@codegouvfr/react-dsfr/RadioButtons'
import classNames from 'classnames'
import { parseAsString, useQueryState } from 'nuqs'
import { FC, useState } from 'react'
import styles from './charts.module.css'

export const PopulationScenariosSelection: FC = () => {
  const [population, setPopulation] = useQueryState('population', parseAsString)
  const [knowMore, setKnowMore] = useState(false)

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
      <Button
        priority="tertiary no outline"
        iconPosition="right"
        iconId={knowMore ? 'ri-arrow-up-s-line' : 'ri-arrow-down-s-line'}
        onClick={() => setKnowMore(!knowMore)}
        size="small"
      >
        En savoir plus sur les hypothèses d'influence
      </Button>
      {knowMore && (
        <p className="fr-text--sm fr-text-mention--grey fr-mt-1v">
          Les projections de nombre de ménages proposées par Otelo sont établies à partir du modèle Omphale, produit par l'Insee. Il permet
          d'obtenir des projections de population sur la période 2018-2050 à partir de scénarios qui reposent sur différentes hypothèses de
          natalité, de mortalité et de migration. Ces projections de population sont ensuite transformées en projections de nombre de
          ménages à l'aide d'une méthode conçue en partenariat par la DHUP, l'Insee et le SDES selon plusieurs scénarios de décohabitation.
        </p>
      )}
    </div>
  )
}
