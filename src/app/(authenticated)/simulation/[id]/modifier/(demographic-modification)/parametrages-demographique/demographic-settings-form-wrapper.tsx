'use client'

import { useSimulationSettings } from '~/app/(authenticated)/simulation/[id]/modifier/(demographic-modification)/simulation-scenario-modification-provider'
import { OmphaleScenariosChart } from '~/components/charts/omphale-scenarios-chart'
import { PopulationScenariosChart } from '~/components/charts/population-scenarios-chart'
import { DemographicSettingsHeader } from '~/components/simulations/settings/demographic-settings-header'
import { TOmphaleDemographicEvolution, TPopulationDemographicEvolution } from '~/schemas/demographic-evolution'

type DemographicSettingsFormWrapperProps = {
  populationEvolution: TPopulationDemographicEvolution
  omphaleEvolution: TOmphaleDemographicEvolution
}

export const DemographicSettingsFormWrapper = ({ populationEvolution, omphaleEvolution }: DemographicSettingsFormWrapperProps) => {
  const { simulationSettings, setSimulationSettings } = useSimulationSettings()
  const handleChange = (value: string) => setSimulationSettings({ ...simulationSettings, b2_scenario: value })

  return (
    <DemographicSettingsHeader>
      <PopulationScenariosChart demographicEvolution={populationEvolution} />
      <OmphaleScenariosChart demographicEvolution={omphaleEvolution} onChange={handleChange} />
    </DemographicSettingsHeader>
  )
}
