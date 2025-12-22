'use client'

import Button from '@codegouvfr/react-dsfr/Button'
import { FC } from 'react'
import { ScenarioNamingModal, useScenarioNamingModal } from '~/components/simulations/settings/scenario-naming-modal'

export const RestructurationDisparitionFooter: FC = () => {
  const modal = useScenarioNamingModal()

  return (
    <>
      <div className="fr-flex fr-flex-gap-6v fr-justify-content-end fr-py-4w fr-px-2w">
        {/* todo: extract to a component and set preivous url href*/}
        <Button priority="secondary" size="large">
          Précédent
        </Button>
        <Button size="large" onClick={() => modal.open()}>
          Suivant
        </Button>
      </div>
      <ScenarioNamingModal />
    </>
  )
}
