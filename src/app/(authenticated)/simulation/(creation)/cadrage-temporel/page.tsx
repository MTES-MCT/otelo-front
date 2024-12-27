import { fr } from '@codegouvfr/react-dsfr'
import { NextStepLink } from '~/components/simulations/settings/next-step-link'
import { SelectHorizonPeriod } from '~/components/simulations/settings/select-horizon-period'
import classes from './cadrage-temporel.module.css'
export default async function TemporalChoicePage() {
  const href = `/simulation/parametrages-demographique`

  return (
    <div className={classes.container}>
      <SelectHorizonPeriod />
      <div className={fr.cx('fr-ml-auto', 'fr-my-1w')}>
        <NextStepLink href={href} query="projection" />
      </div>
    </div>
  )
}
