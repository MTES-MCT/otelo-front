import { fr } from '@codegouvfr/react-dsfr'
import SimulationSideMenu from '~/components/simulations/settings/simulation-side-menu'
import { SimulationStepper } from '~/components/simulations/settings/simulation-stepper'

type PageProps = {
  children: React.ReactNode
}

export default function SimulationLayout({ children }: PageProps) {
  return (
    <div className={fr.cx('fr-grid-row')}>
      <SimulationSideMenu />

      <div className={fr.cx('fr-col-md-9')} style={{ background: fr.colors.decisions.background.alt.blueFrance.default }}>
        <div className={fr.cx('fr-container')}>
          <SimulationStepper />
          {children}
        </div>
      </div>
    </div>
  )
}
