import { fr } from '@codegouvfr/react-dsfr'
import { NextStepLink } from '~/components/simulations/next-step-link'
import { SelectHorizonPeriod } from '~/components/simulations/select-horizon-period'

export default async function TemporalChoicePage() {
  const href = `/simulation/parametrages-demographique`

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <SelectHorizonPeriod />
      <div className={fr.cx('fr-ml-auto', 'fr-my-1w')}>
        <NextStepLink href={href} query="projection" />
      </div>
    </div>
  )
}
