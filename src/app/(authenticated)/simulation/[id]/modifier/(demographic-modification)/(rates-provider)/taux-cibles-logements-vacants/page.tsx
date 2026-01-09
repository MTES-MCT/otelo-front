import Button from '@codegouvfr/react-dsfr/Button'
import { ModifyEpcisAccommodationRates } from '~/components/simulations/settings/epcis-accommodation-rates/modify-epcis-accomodation-rates'
import { NextStepLinkWithoutValidation } from '~/components/simulations/settings/next-step-link'
import { getGroupedSimulationWithResults } from '~/server-only/simulation/get-grouped-simulations-with-results'

type PageProps = {
  params: {
    id: string
  }
}

export default async function TauxCiblesLogementsPage({ params }: PageProps) {
  const { simulations: groupedSimulations } = await getGroupedSimulationWithResults(params.id)
  const simulation = groupedSimulations[params.id]
  const href = `/simulation/${params.id}/modifier/taux-cibles-residences-secondaires`

  return (
    <>
      <div className="fr-flex fr-direction-column fr-background-default--grey">
        <ModifyEpcisAccommodationRates epcis={simulation.epcis} />
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
