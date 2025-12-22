import Button from '@codegouvfr/react-dsfr/Button'
import { ModifyEpcisSecondaryAccommodationRates } from '~/components/simulations/settings/epcis-accommodation-rates/modify-epcis-secondary-accomodation-rates'
import { NextStepLinkWithoutValidation } from '~/components/simulations/settings/next-step-link'
import { getSimulationWithResults } from '~/server-only/simulation/get-simulation-with-results'

type PageProps = {
  params: {
    id: string
  }
}

export default async function TargetSecondaryResidencesRates({ params }: PageProps) {
  const simulation = await getSimulationWithResults(params.id)

  const href = `/simulation/${params.id}/modifier/taux-restructuration-disparition`

  return (
    <>
      <div className="fr-flex fr-direction-column fr-background-default--grey">
        <ModifyEpcisSecondaryAccommodationRates epcis={simulation.epcis} />
      </div>
      <div className="fr-flex fr-flex-gap-6v fr-justify-content-end fr-py-4w fr-px-2w">
        {/* todo: extract to a component and set preivous url href*/}
        <Button priority="secondary" size="large">
          Précédent
        </Button>
        <NextStepLinkWithoutValidation href={href} />
      </div>
    </>
  )
}
