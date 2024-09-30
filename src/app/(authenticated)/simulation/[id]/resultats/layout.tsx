import { SimulationHeaderResults } from '~/components/simulations/results/simulation-header-results'
import { SimulationScenarioSummary } from '~/components/simulations/results/simulation-scenario-summary/simulation-scenario-summary'
import { getSimulationWithResults } from '~/server-only/simulation/get-simulation-with-results'

export default async function SimulationResultLayout({ children, params }: { children: React.ReactNode; params: { id: string } }) {
  const simulation = await getSimulationWithResults(params.id)

  return (
    <div style={{ display: 'flex' }}>
      <SimulationScenarioSummary scenario={simulation.scenario} epci={simulation.epci} />
      <div style={{ flex: 1 }}>
        <SimulationHeaderResults />
        <div>{children}</div>
      </div>
    </div>
  )
}
