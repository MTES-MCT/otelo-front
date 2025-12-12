import { fr } from '@codegouvfr/react-dsfr'
import { ModifyEpcisAccommodationRates } from '~/components/simulations/settings/epcis-accommodation-rates/modify-epcis-accomodation-rates'
import { NextStepLinkWithoutValidation } from '~/components/simulations/settings/next-step-link'
import { getSimulationWithResults } from '~/server-only/simulation/get-simulation-with-results'

type PageProps = {
  params: {
    id: string
  }
}

export default async function TauxCiblesLogementsPage({ params }: PageProps) {
  const simulation = await getSimulationWithResults(params.id)
  const href = `/simulation/${params.id}/modifier/validation-parametrage`

  return (
    <div className="fr-flex fr-direction-column fr-mt-2w">
      <ModifyEpcisAccommodationRates epcis={simulation.epcis} />
      <div className={fr.cx('fr-ml-auto', 'fr-my-1w', 'fr-my-auto')}>
        <NextStepLinkWithoutValidation href={href} />
      </div>
    </div>
  )
}
