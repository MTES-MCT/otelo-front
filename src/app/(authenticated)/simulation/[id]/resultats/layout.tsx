import { SimulationsBreadcrumb } from '~/components/simulations/breadcrumbs/simulations-breadcrumb'
import { getSimulationWithResults } from '~/server-only/simulation/get-simulation-with-results'

export default async function SimulationResultLayout({ children, params }: { children: React.ReactNode; params: { id: string } }) {
  const simulation = await getSimulationWithResults(params.id)
  return (
    <div className="fr-flex fr-direction-column fr-container">
      <SimulationsBreadcrumb simulation={simulation} />
      {/* <div className={fr.cx('fr-col-2')}> */}
      {/* <SimulationScenarioSummary scenario={simulation.scenario} epcis={simulation.epcis} />
        </div> */}
      <div className="fr-container">{children}</div>
    </div>
  )
}
