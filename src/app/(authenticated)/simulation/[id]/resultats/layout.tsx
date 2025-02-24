import { fr } from '@codegouvfr/react-dsfr'
import { SimulationScenarioSummary } from '~/components/simulations/results/simulation-scenario-summary/simulation-scenario-summary'
import { getSimulationWithResults } from '~/server-only/simulation/get-simulation-with-results'

export default async function SimulationResultLayout({ children, params }: { children: React.ReactNode; params: { id: string } }) {
  const simulation = await getSimulationWithResults(params.id)
  return (
    <div style={{ display: 'flex' }}>
      <div className={fr.cx('fr-col-2')}>
        <SimulationScenarioSummary scenario={simulation.scenario} epcis={simulation.epcis} />
      </div>
      <div className={fr.cx('fr-col-9')}>
        <div>{children}</div>
      </div>
    </div>
  )
}
