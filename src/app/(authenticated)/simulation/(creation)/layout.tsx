import classNames from 'classnames'
import { AuthenticatedBreadcrumb } from '~/components/breadcrumbs/authenticated-breadcrumb'
import DemographicSettingsSimulationSideMenu from '~/components/simulations/settings/demographic-settings-simulation-side-menu'
import { DemographicSettingsSimulationStepper } from '~/components/simulations/settings/demographic-settings-simulation-stepper'
import { SimulationFormRatesProviderContextWrapper } from '~/components/simulations/settings/simulation-form-context-wrapper'
import styles from '../simulation-layout.module.css'

type PageProps = {
  children: React.ReactNode
}

export default function CreateSimulationLayout({ children }: PageProps) {
  return (
    <div className="fr-container">
      <SimulationFormRatesProviderContextWrapper>
        <div className={classNames(styles.layoutContainer, 'fr-flex')}>
          <nav className="fr-col-md-3">
            <AuthenticatedBreadcrumb />
            <DemographicSettingsSimulationSideMenu />
          </nav>

          <div className="fr-col-md-9">
            <main className="fr-container">
              <DemographicSettingsSimulationStepper />
              {children}
            </main>
          </div>
        </div>
      </SimulationFormRatesProviderContextWrapper>
    </div>
  )
}
