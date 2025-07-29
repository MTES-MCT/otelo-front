import { NextStepLinkWithoutValidation } from '~/components/simulations/settings/next-step-link'
import { ModifyRestructurationDisparitionRates } from '~/components/simulations/settings/restructuration-disparition-rates/modify-restructuration-disparition-rates'
import { getSimulationWithResults } from '~/server-only/simulation/get-simulation-with-results'

type PageProps = {
  params: {
    id: string
  }
}

export default async function RestructurationDisparitionRatesPage({ params }: PageProps) {
  const simulation = await getSimulationWithResults(params.id)
  const href = `/simulation/${params.id}/modifier/validation-parametrage`
  return (
    <div className="fr-flex fr-direction-column">
      <ModifyRestructurationDisparitionRates epcis={simulation.epcis} />
      <div className="fr-ml-auto fr-my-1w fr-my-auto">
        <NextStepLinkWithoutValidation href={href} />
      </div>
    </div>
  )
}
