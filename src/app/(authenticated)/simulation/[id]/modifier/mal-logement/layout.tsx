import { fr } from '@codegouvfr/react-dsfr'
import { BadHousingSettingsFormContextWrapper } from '~/components/simulations/settings/modification/mal-logement/bad-housing-settings-form-context-wrapper'
import BadHousingSettingsSimulationSideMenu from '~/components/simulations/settings/modification/mal-logement/bad-housing-settings-simulation-side-menu'
import { BadHousingSettingsSimulationStepper } from '~/components/simulations/settings/modification/mal-logement/bad-housing-settings-simulation-stepper'

type PageProps = {
  children: React.ReactNode
  params: {
    id: string
  }
}

export default function ModifySimulationLayout({ children, params }: PageProps) {
  return (
    <div className={fr.cx('fr-grid-row')}>
      <BadHousingSettingsFormContextWrapper>
        <BadHousingSettingsSimulationSideMenu id={params.id} />

        <div className={fr.cx('fr-col-md-9')} style={{ background: fr.colors.decisions.background.alt.blueFrance.default }}>
          <div className={fr.cx('fr-container')}>
            <BadHousingSettingsSimulationStepper />
            {children}
          </div>
        </div>
      </BadHousingSettingsFormContextWrapper>
    </div>
  )
}
