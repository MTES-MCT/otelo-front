import { DemographicEvolutionChart } from '~/components/charts/demographic-evolution-chart'
import { SimulationNeedsSummary } from '~/components/simulations/results/simulation-needs-summary/simulation-needs-summary'
import { getSimulationWithResults } from '~/server-only/simulation/get-simulation-with-results'

export default async function Resultats({ params }: { params: { id: string } }) {
  const simulation = await getSimulationWithResults(params.id)

  return (
    <>
      <SimulationNeedsSummary
        projection={simulation.scenario.projection}
        totalStock={simulation.results.totalStock}
        total={simulation.results.total}
        totalFlux={simulation.results.totalFlux}
      />
      <DemographicEvolutionChart data={simulation} />
    </>
  )
}
