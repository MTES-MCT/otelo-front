import { fr } from '@codegouvfr/react-dsfr'
import { NextStepLink } from '~/components/simulations/settings/next-step-link'
import { SelectProjectionPeriod } from '~/components/simulations/settings/select-projection-period'
import classes from './cadrage-temporel.module.css'
export default async function TemporalChoicePage() {
  const href = `/simulation/parametrages-demographique`

  return (
    <div className={classes.container}>
      <SelectProjectionPeriod />
      <div className={fr.cx('fr-ml-auto', 'fr-my-1w')}>
        <NextStepLink href={href} query="projection" defaultValue="2030" />
      </div>
    </div>
  )
}
