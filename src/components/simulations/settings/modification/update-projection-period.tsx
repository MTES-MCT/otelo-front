'use client'

import { Range } from '@codegouvfr/react-dsfr/Range'
import { FC } from 'react'
import { useSimulationSettings } from '~/app/(authenticated)/simulation/[id]/modifier/(demographic-modification)/simulation-scenario-modification-provider'

export const UpdateProjectionPeriod: FC = () => {
  const { simulationSettings, setSimulationSettings } = useSimulationSettings()

  const currentYear = new Date().getFullYear()

  const { projection } = simulationSettings

  const handleChange = (value: string) => setSimulationSettings({ ...simulationSettings, projection: Number(value) })

  return (
    <Range
      hintText="Faites glisser le curseur pour définir l'horizon de résorption de la simulation."
      label="Horizon de résorption de la simulation"
      max={2050}
      min={currentYear}
      nativeInputProps={{
        onChange: (e) => handleChange(e.target.value),
        value: projection,
      }}
    />
  )
}
