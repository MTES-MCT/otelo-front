import { ModifyRestructurationDisparitionRates } from '~/components/simulations/settings/restructuration-disparition-rates/modify-restructuration-disparition-rates'
import { UpdateSimulationForm } from '~/components/simulations/settings/update-simulation-form'
import { getSimulationWithResults } from '~/server-only/simulation/get-simulation-with-results'

type PageProps = {
  params: {
    id: string
  }
}

export default async function RestructurationDisparitionRatesPage({ params }: PageProps) {
  const simulation = await getSimulationWithResults(params.id)
  return (
    <>
      <div className="fr-flex fr-direction-column fr-background-default--grey">
        <ModifyRestructurationDisparitionRates epcis={simulation.epcis} />
      </div>
      <UpdateSimulationForm id={params.id} />
    </>
  )
}
