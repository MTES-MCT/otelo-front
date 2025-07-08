import { fr } from '@codegouvfr/react-dsfr'
import { SimulationsBreadcrumb } from '~/components/simulations/breadcrumbs/simulations-breadcrumb'
import { SimulationScenarioSummary } from '~/components/simulations/results/simulation-scenario-summary/simulation-scenario-summary'
import { getSimulationWithResults } from '~/server-only/simulation/get-simulation-with-results'
import styles from './resultats.module.css'

export default async function SimulationResultLayout({ children, params }: { children: React.ReactNode; params: { id: string } }) {
  const simulation = await getSimulationWithResults(params.id)
  return (
    <>
      <SimulationsBreadcrumb simulation={simulation} />
      <div className={styles.layoutContainer}>
        <div className={fr.cx('fr-col-2')}>
          <SimulationScenarioSummary scenario={simulation.scenario} epcis={simulation.epcis} />
        </div>
        <div className={fr.cx('fr-col-9')}>
          <div>{children}</div>
        </div>
      </div>
    </>
  )
}
