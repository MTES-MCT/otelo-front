import { fr } from '@codegouvfr/react-dsfr'
import classNames from 'classnames'
import { DemographicSettingsSimulationStepper } from '~/components/simulations/settings/demographic-settings-simulation-stepper'
import { SimulationSettingsFormContextWrapper } from '~/components/simulations/settings/modification/simulation-settings-form-context-wrapper'
import UpdateDemographicSettingsSimulationSideMenu from '~/components/simulations/settings/modification/update-demographic-settings-simulation-side-menu'
import { SimulationFormRatesProviderContextWrapper } from '~/components/simulations/settings/simulation-form-context-wrapper'
import { getSimulationWithResults } from '~/server-only/simulation/get-simulation-with-results'
import styles from '../../../simulation-layout.module.css'

type PageProps = {
  children: React.ReactNode
  params: {
    id: string
  }
}

export default async function ModifySimulationLayout({ children, params }: PageProps) {
  const { id } = params

  const simulation = await getSimulationWithResults(params.id)
  const epcis = simulation.scenario.epciScenarios.map((e) => e.epciCode)

  return (
    <SimulationSettingsFormContextWrapper>
      <SimulationFormRatesProviderContextWrapper epcis={epcis}>
        <div className="fr-container">
          <div className={classNames(styles.layoutContainer, 'fr-flex')}>
            <UpdateDemographicSettingsSimulationSideMenu id={id} />

            <div className={fr.cx('fr-col-md-9')} style={{ background: fr.colors.decisions.background.alt.blueFrance.default }}>
              <div className={fr.cx('fr-container')}>
                <DemographicSettingsSimulationStepper />
                {children}
              </div>
            </div>
          </div>
        </div>
      </SimulationFormRatesProviderContextWrapper>
    </SimulationSettingsFormContextWrapper>
  )
}
