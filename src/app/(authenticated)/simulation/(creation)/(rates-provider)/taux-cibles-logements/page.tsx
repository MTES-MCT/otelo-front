import { fr } from '@codegouvfr/react-dsfr'
import { SearchParams } from 'nuqs'
import { searchParamsCache } from '~/app/(authenticated)/simulation/(creation)/searchParams'
import { EpcisAccommodationRates } from '~/components/simulations/settings/epcis-accommodation-rates/epcis-accommodation-rates'
import { NextStepLink } from '~/components/simulations/settings/next-step-link'
import { getBassinEpcis } from '~/server-only/epcis/get-bassin-epcis'

type PageProps = {
  searchParams: Promise<SearchParams>
}

export default async function TargetRatesHousing({ searchParams }: PageProps) {
  const { epci } = await searchParamsCache.parse(searchParams)
  const bassinEpcis = await getBassinEpcis(epci)
  const href = `/simulation/validation-parametrage`

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <EpcisAccommodationRates bassinEpcis={bassinEpcis} />

      <div className={fr.cx('fr-ml-auto', 'fr-my-1w', 'fr-my-auto')}>
        <NextStepLink href={href} query="omphale" />
      </div>
    </div>
  )
}
