'use client'

import Checkbox from '@codegouvfr/react-dsfr/Checkbox'
import { useBadHousingSettings } from '~/app/(authenticated)/simulation/[id]/modifier/simulation-scenario-bad-housing-modification-provider'

export const SelectHebergesAccommodationTypes = () => {
  const { badHousingSettings, setBadHousingSettings } = useBadHousingSettings()
  const {
    heberges: { free, particular, temporary },
  } = badHousingSettings

  const handleToggle = (type: string) => {
    setBadHousingSettings({
      ...badHousingSettings,
      heberges: {
        ...badHousingSettings.heberges,
        [type]: !badHousingSettings.heberges[type as keyof typeof badHousingSettings.heberges],
      },
    })
  }


  return (
    <Checkbox
      legend="Type d'hébergement"
      options={[
        {
          label: 'Logés chez un particulier',
          nativeInputProps: {
            checked: particular,
            name: 'particular',
            onChange: () => handleToggle('particular'),
            value: 'particular',
          },
        },
        {
          label: 'Logés à titre gratuit',
          nativeInputProps: {
            checked: free,
            name: 'free',
            onChange: () => handleToggle('free'),
            value: 'free',
          },
        },
        {
          label: 'Logés temporairement',
          nativeInputProps: {
            checked: temporary,
            name: 'temporary',
            onChange: () => handleToggle('temporary'),
            value: 'temporary',
          },
        },
      ]}
      orientation="horizontal"
    />
  )
}
