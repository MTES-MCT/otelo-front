import { fr } from '@codegouvfr/react-dsfr'
import SimulationSideMenu from '~/components/simulations/simulation-side-menu'
import { SimulationStepper } from '~/components/simulations/simulation-stepper'

export default async function SimulationLayout({ children }: { children: React.ReactNode }) {
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
