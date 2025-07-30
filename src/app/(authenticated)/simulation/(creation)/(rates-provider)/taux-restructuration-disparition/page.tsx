import { SearchParams } from 'nuqs'
import { searchParamsCache } from '~/app/(authenticated)/simulation/(creation)/searchParams'
import { NextStepLink } from '~/components/simulations/settings/next-step-link'
import { CreateRestructurationDisparitionRates } from '~/components/simulations/settings/restructuration-disparition-rates/create-restructuration-disparition-rates'
import { getEpcis } from '~/server-only/epcis/get-epcis'

type PageProps = {
  searchParams: Promise<SearchParams>
}

export default async function RestructurationDisparitionRatesPage({ searchParams }: PageProps) {
  const { epcis, baseEpci } = await searchParamsCache.parse(searchParams)
  const simulationsEpcis = await getEpcis(epcis, baseEpci)
  const href = `/simulation/validation-parametrage`

  return (
    <div className="fr-flex fr-direction-column">
      <CreateRestructurationDisparitionRates epcis={simulationsEpcis} />
      <div className="fr-ml-auto fr-my-1w fr-my-auto">
        <NextStepLink href={href} query="omphale" />
      </div>
    </div>
  )
}
