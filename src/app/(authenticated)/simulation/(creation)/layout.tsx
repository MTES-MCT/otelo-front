import { fr } from '@codegouvfr/react-dsfr'
import DemographicSettingsSimulationSideMenu from '~/components/simulations/settings/demographic-settings-simulation-side-menu'
import { DemographicSettingsSimulationStepper } from '~/components/simulations/settings/demographic-settings-simulation-stepper'

type PageProps = {
  children: React.ReactNode
}

export default function CreateSimulationLayout({ children }: PageProps) {
  return (
    <div className={fr.cx('fr-grid-row')}>
      <DemographicSettingsSimulationSideMenu />

      <div className={fr.cx('fr-col-md-9')} style={{ background: fr.colors.decisions.background.alt.blueFrance.default }}>
        <div className={fr.cx('fr-container')}>
          <DemographicSettingsSimulationStepper />
          {children}
        </div>
      </div>
    </div>
  )
}
