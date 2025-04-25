'use client'

import { fr } from '@codegouvfr/react-dsfr'
import { parseAsStringEnum, useQueryState } from 'nuqs'
import { BassinHabitatSimulation } from '~/app/(authenticated)/simulation/(creation)/choix-du-territoire/bassin-habitat-simulation'
import { EpcisSimulation } from '~/app/(authenticated)/simulation/(creation)/choix-du-territoire/epcis-simulation'
import { NextStepLink } from '~/components/simulations/settings/next-step-link'

export const WrapperSimulationTypePage = () => {
  const href = `/simulation/cadrage-temporel`
  const [simulationTypeQuery] = useQueryState('type', parseAsStringEnum(['bh', 'epcis']).withDefault('bh'))

  const nextStepLinkComponent = (
    <div className={fr.cx('fr-ml-auto', 'fr-my-1w')}>
      <NextStepLink href={href} query="epcis" />
    </div>
  )

  if (simulationTypeQuery === 'bh') {
    return (
      <>
        <BassinHabitatSimulation />
        {nextStepLinkComponent}
      </>
    )
  }
  return (
    <>
      <EpcisSimulation />
      {nextStepLinkComponent}
    </>
  )
}
