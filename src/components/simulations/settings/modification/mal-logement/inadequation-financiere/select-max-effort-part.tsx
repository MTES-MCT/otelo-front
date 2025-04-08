'use client'

import { Range } from '@codegouvfr/react-dsfr/Range'
import { useBadHousingSettings } from '~/app/(authenticated)/simulation/[id]/modifier/mal-logement/simulation-scenario-bad-housing-modification-provider'

export const SelectMaxEffortPart = () => {
  const { badHousingSettings, setBadHousingSettings } = useBadHousingSettings()
  return (
    <Range
      label="Taux net maximal"
      max={100}
      min={0}
      nativeInputProps={{
        onChange: (e) =>
          setBadHousingSettings({
            ...badHousingSettings,
            inadequationFinanciere: { ...badHousingSettings.inadequationFinanciere, maxEffort: Number(e.target.value) },
          }),
        value: badHousingSettings.inadequationFinanciere.maxEffort,
      }}
    />
  )
}
