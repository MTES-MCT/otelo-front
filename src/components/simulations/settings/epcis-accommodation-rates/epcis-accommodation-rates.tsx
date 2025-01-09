'use client'

import { FC } from 'react'
import { RatesProvider } from '~/app/(authenticated)/simulation/(creation)/taux-cibles-logements/rates-provider'
import { AccommodationRateInput } from '~/components/simulations/settings/accommodation-rate-input'
import { LongTermVacancyAlert } from '~/components/simulations/settings/long-term-vacancy-alert'
import { VacancyAccommodationRatesInput } from '~/components/simulations/settings/vacancy-accommodation-rates-input'
import { TAccommodationRates } from '~/schemas/accommodations-rates'

interface EpcisAccommodationRatesProps {
  epci: string
  rates: TAccommodationRates
}

export const EpcisAccommodationRates: FC<EpcisAccommodationRatesProps> = ({ epci, rates }) => {
  return (
    <RatesProvider
      initialRates={{
        [epci]: { txLv: rates.txLv, txRs: rates.txRs, vacancy: { ...rates.vacancy, txLvLongue: 0 } },
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', justifyContent: 'space-between' }}>
        <VacancyAccommodationRatesInput epci={epci} longTermValue={rates.vacancy.txLvLongue} shortTermValue={rates.txLv} />
        <AccommodationRateInput txKey="txRS" epci={epci} label="Taux cible de résidences secondaires" />
      </div>
      <div style={{ marginTop: '1rem' }}>
        <LongTermVacancyAlert />
      </div>
    </RatesProvider>
  )
}
