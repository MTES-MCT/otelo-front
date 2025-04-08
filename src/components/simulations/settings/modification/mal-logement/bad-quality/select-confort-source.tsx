'use client'

import { Select } from '@codegouvfr/react-dsfr/Select'
import { useBadHousingSettings } from '~/app/(authenticated)/simulation/[id]/modifier/mal-logement/simulation-scenario-bad-housing-modification-provider'

export const SelectConfortSource = () => {
  const { badHousingSettings, setBadHousingSettings } = useBadHousingSettings()
  return (
    <Select
      label="Confort"
      nativeSelectProps={{
        name: 'confort',
        onChange: (e) =>
          setBadHousingSettings({ ...badHousingSettings, badQuality: { ...badHousingSettings.badQuality, confort: e.target.value } }),
        value: badHousingSettings.badQuality.confort,
      }}
    >
      <option value="" selected disabled hidden>
        Selectionnez une option
      </option>
      <option value="abs_sani">Absence sanitaire</option>
      <option value="abs_sani_chauff">Absence sanitaire et chauffage</option>
    </Select>
  )
}
