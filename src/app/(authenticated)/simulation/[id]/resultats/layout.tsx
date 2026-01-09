import { SimulationsBreadcrumb } from '~/components/simulations/breadcrumbs/simulations-breadcrumb'
import { getGroupedSimulationWithResults } from '~/server-only/simulation/get-grouped-simulations-with-results'

export default async function SimulationResultLayout({ children, params }: { children: React.ReactNode; params: { id: string } }) {
  const { simulations: groupedSimulations } = await getGroupedSimulationWithResults(params.id)
  const simulation = groupedSimulations[params.id]
  return (
    <>
      <div className="fr-container">
        <SimulationsBreadcrumb simulation={simulation} />
      </div>
      {children}
    </>
  )
}
