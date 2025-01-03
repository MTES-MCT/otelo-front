import { DemographicEvolutionChart } from '~/components/charts/demographic-evolution-chart'
import { FlowRequirementsChart } from '~/components/charts/flow-requirements-char'
import { StockEvolutionChart } from '~/components/charts/stock-evolution-chart'
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
        vacancy={simulation.results.vacantAccomodationEvolution}
        badQuality={simulation.results.badQuality}
      />
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <h5 style={{ paddingLeft: '2rem', paddingTop: '2rem' }}>Besoin en flux - Evolution du besoin démographique en logements</h5>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'space-between' }}>
          <DemographicEvolutionChart data={simulation} />
          <FlowRequirementsChart data={simulation} />
        </div>
      </div>
      <StockEvolutionChart data={simulation} />
    </>
  )
}
