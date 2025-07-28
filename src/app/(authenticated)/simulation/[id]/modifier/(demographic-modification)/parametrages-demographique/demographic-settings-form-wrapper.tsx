'use client'

import { useQueryState } from 'nuqs'
import { useEffect } from 'react'
import { useSimulationSettings } from '~/app/(authenticated)/simulation/[id]/modifier/(demographic-modification)/simulation-scenario-modification-provider'
import { OmphaleScenariosChart } from '~/components/charts/omphale-scenarios-chart'
import { PopulationScenariosChart } from '~/components/charts/population-scenarios-chart'
import { DemographicSettingsHeader } from '~/components/simulations/settings/demographic-settings-header'
import { TOmphaleDemographicEvolution, TPopulationDemographicEvolution } from '~/schemas/demographic-evolution'

type DemographicSettingsFormWrapperProps = {
  populationEvolution: TPopulationDemographicEvolution
  omphaleEvolution: TOmphaleDemographicEvolution
  epcis: string[]
  scenarioId: string
}

export const DemographicSettingsFormWrapper = ({
  epcis,
  populationEvolution,
  omphaleEvolution,
  scenarioId,
}: DemographicSettingsFormWrapperProps) => {
  const [epciChart, setEpciChart] = useQueryState('epciChart')
  const { simulationSettings, setSimulationSettings } = useSimulationSettings()
  const handleChange = (value: string) =>
    setSimulationSettings({
      ...simulationSettings,
      b2_scenario: value,
    })

  useEffect(() => {
    if (!epciChart) {
      setEpciChart(epcis[0])
    }
  }, [epcis, epciChart, setEpciChart])

  if (!epciChart) return null

  return (
    <DemographicSettingsHeader epcis={epcis}>
      <PopulationScenariosChart demographicEvolution={populationEvolution} />
      <OmphaleScenariosChart demographicEvolution={omphaleEvolution} scenarioId={scenarioId} onChange={handleChange} />
    </DemographicSettingsHeader>
  )
}
