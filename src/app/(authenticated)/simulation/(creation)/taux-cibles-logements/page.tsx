import { fr } from '@codegouvfr/react-dsfr'
import Alert from '@codegouvfr/react-dsfr/Alert'
import { SearchParams } from 'nuqs'
import { searchParamsCache } from '~/app/(authenticated)/simulation/(creation)/searchParams'
import { AccommodationRateInput } from '~/components/simulations/settings/accommodation-rate-input'
import { LongTermVacancyAlert } from '~/components/simulations/settings/long-term-vacancy-alert'
import { NextStepLink } from '~/components/simulations/settings/next-step-link'
import { VacancyAccommodationRatesInput } from '~/components/simulations/settings/vacancy-accommodation-rates-input'
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
      <div style={{ marginBottom: '1rem' }}>
        <Alert
          description={
            <span>
              Le volume de logements vacants longue durée est de {accommodationRates.vacancy.nbAccommodation} logements en 2021.{' '}
              <span style={{ fontSize: '0.8rem' }}>
                (soit
                <span style={{ fontWeight: 'bold' }}> {accommodationRates.vacancy.txLvLongue}% du parc privé total</span>)
              </span>
            </span>
          }
          severity="info"
          small
        />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', justifyContent: 'space-between' }}>
        <VacancyAccommodationRatesInput txLv={accommodationRates.txLv} txLvLongue={accommodationRates.vacancy.txLvLongue} />

        <LongTermVacancyAlert />
        <AccommodationRateInput defaultValue={accommodationRates.txRs} label="Taux cible de résidences secondaires" queryKey="tauxRS" />
      </div>

      <div className={fr.cx('fr-ml-auto', 'fr-my-1w', 'fr-my-auto')}>
        <NextStepLink href={href} query="omphale" />
      </div>
    </div>
  )
}
