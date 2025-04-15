import { fr } from '@codegouvfr/react-dsfr'
import classNames from 'classnames'
import { WrapperSimulationTypePage } from '~/app/(authenticated)/simulation/(creation)/choix-du-territoire/wrapper-simulation-type-page'
import { SimulationTypeSelection } from '~/components/simulations/settings/simulation-type-selection'
import classes from './choix-du-territoire.module.css'

export default async function TerritorialChoicePage() {
  return (
    <div className={classes.container}>
      <div className={classNames(fr.cx('fr-mb-2w'), classes.typeSelectionContainer)}>
        <SimulationTypeSelection />
      </div>
      <WrapperSimulationTypePage />
    </div>
  )
}
