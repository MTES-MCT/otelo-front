import { createContext, useContext, useState } from 'react'

export interface SimulationSettings {
  id: string
  projection: number
  simulationId: string
  b2_scenario: string
}

interface SimulationSettingsState {
  simulationSettings: SimulationSettings
  setSimulationSettings: (settings: SimulationSettings) => void
}

export const SimulationSettingsContext = createContext<SimulationSettingsState | undefined>(undefined)

export const SimulationSettingsProvider = ({
  children,
  initialSettings,
}: {
  children: React.ReactNode
  initialSettings: SimulationSettings
}) => {
  const [simulationSettings, setSimulationSettings] = useState<SimulationSettings>(initialSettings)

  return (
    <SimulationSettingsContext.Provider value={{ simulationSettings, setSimulationSettings }}>
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
