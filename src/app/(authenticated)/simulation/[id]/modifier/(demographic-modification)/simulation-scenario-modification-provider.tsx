import { createContext, useContext, useState } from 'react'
import { TEpcisAccommodationRates } from '~/schemas/accommodations-rates'
import { TScenario } from '~/schemas/scenario'

export interface SimulationInitialSettings {
  id: string
  projection: number
  simulationId: string
  b2_scenario: string
  epciScenarios: TScenario['epciScenarios']
}

export interface SimulationSettings {
  id: string
  projection: number
  simulationId: string
  b2_scenario: string
  epciScenarios: TEpcisAccommodationRates
}

interface SimulationSettingsState {
  simulationSettings: SimulationSettings
  setSimulationSettings: (settings: SimulationSettings) => void
  updateRates: (epciId: string, newRates: Partial<TEpcisAccommodationRates[string]>) => void
}

export const SimulationSettingsContext = createContext<SimulationSettingsState | undefined>(undefined)

function transformInitialSettings(initialSettings: SimulationInitialSettings): SimulationSettings {
  const epciScenariosRecord = initialSettings.epciScenarios.reduce((acc, scenario) => {
    acc[scenario.epciCode] = {
      vacancyRate: scenario.b2_tx_vacance_longue + scenario.b2_tx_vacance_courte,
      longTermVacancyRate: scenario.b2_tx_vacance_longue,
      shortTermVacancyRate: scenario.b2_tx_vacance_courte,
      txRs: scenario.b2_tx_rs,
      vacancy: {
        nbAccommodation: 0,
        year: undefined,
      },
      restructuringRate: scenario.b2_tx_restructuration,
      disappearanceRate: scenario.b2_tx_disparition,
    }
    return acc
  }, {} as TEpcisAccommodationRates)

  return {
    ...initialSettings,
    epciScenarios: epciScenariosRecord,
  }
}

export const SimulationSettingsProvider = ({
  children,
  initialSettings,
}: {
  children: React.ReactNode
  initialSettings: SimulationInitialSettings
}) => {
  const transformedSettings = transformInitialSettings(initialSettings)
  const [simulationSettings, setSimulationSettings] = useState<SimulationSettings>(transformedSettings)

  const updateRates = (epciId: string, newRates: Partial<TEpcisAccommodationRates[string]>) => {
    setSimulationSettings((prevSettings) => ({
      ...prevSettings,
      epciScenarios: {
        ...prevSettings.epciScenarios,
        [epciId]: {
          ...prevSettings.epciScenarios[epciId],
          ...newRates,
        },
      },
    }))
  }

  return (
    <SimulationSettingsContext.Provider value={{ simulationSettings, setSimulationSettings, updateRates }}>
      {children}
    </SimulationSettingsContext.Provider>
  )
}

export const useSimulationSettings = () => {
  const context = useContext(SimulationSettingsContext)
  if (context === undefined) {
    throw new Error('useSimulationSettings must be used within a SimulationSettingsProvider')
  }
  return context
}
