import { fr } from '@codegouvfr/react-dsfr'
import { SearchParams } from 'nuqs'
import { searchParamsCache } from '~/app/(authenticated)/simulation/(creation)/searchParams'
import { AccommodationRateInput } from '~/components/simulations/settings/accommodation-rate-input'
import { NextStepLink } from '~/components/simulations/settings/next-step-link'
import { getAccommodationRatesByEpci } from '~/server-only/accomodation-rates/get-accommodation-rate-by-epci'

type PageProps = {
  searchParams: Promise<SearchParams>
}

export default async function TargetRatesHousing({ searchParams }: PageProps) {
  const { epci } = await searchParamsCache.parse(searchParams)
  const accommodationRates = await getAccommodationRatesByEpci(epci)
  const href = `/simulation/validation-parametrage`
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <div style={{ display: 'flex', gap: '1rem', justifyContent: 'space-between' }}>
        <AccommodationRateInput defaultValue={accommodationRates.txRs} label="Taux cible de résidences secondaires" queryKey="tauxRS" />
        <AccommodationRateInput defaultValue={accommodationRates.txLv} label="Taux cible de logements vacants" queryKey="tauxLV" />
      </div>
      <div className={fr.cx('fr-ml-auto', 'fr-my-1w', 'fr-my-auto')}>
        <NextStepLink href={href} query="omphale" />
      </div>
    </div>
  )
}
