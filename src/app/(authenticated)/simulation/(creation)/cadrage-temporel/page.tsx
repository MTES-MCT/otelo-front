import type { Metadata } from 'next'
import { NextStepLink } from '~/components/simulations/settings/next-step-link'
import { SelectProjectionPeriod } from '~/components/simulations/settings/select-projection-period'

export const metadata: Metadata = {
  title: 'Elaborer scenario - étape 2 sur 6 - Otelo',
}
export default async function TemporalChoicePage() {
  const href = `/simulation/parametrages-demographique`

  return (
    <div className="fr-flex fr-direction-column fr-background-default--grey fr-p-2w fr-px-md-5w">
      <SelectProjectionPeriod />
      <div className="fr-ml-auto fr-my-1w">
        <NextStepLink href={href} query="projection" defaultValue="2030" />
      </div>
    </div>
  )
}
