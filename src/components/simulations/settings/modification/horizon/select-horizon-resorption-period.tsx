'use client'

import { Range } from '@codegouvfr/react-dsfr/Range'
import { FC } from 'react'
import { useBadHousingSettings } from '~/app/(authenticated)/simulation/[id]/modifier/simulation-scenario-bad-housing-modification-provider'

export const SelectResorptionHorizonPeriod: FC = () => {
  const { badHousingSettings, setBadHousingSettings } = useBadHousingSettings()

  const currentYear = new Date().getFullYear()

  const { horizon } = badHousingSettings

  const handleChange = (value: string) => setBadHousingSettings({ ...badHousingSettings, horizon: Number(value) - currentYear })

  return (
    <Range
      hintText="Faites glisser le curseur pour définir l'horizon de résorption de la simulation."
      label="Horizon de résorption de la simulation"
      max={2050}
      min={currentYear}
      nativeInputProps={{
        onChange: (e) => handleChange(e.target.value),
        value: horizon + currentYear,
      }}
    />
  )
}
