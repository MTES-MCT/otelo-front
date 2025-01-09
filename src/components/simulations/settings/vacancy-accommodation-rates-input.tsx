'use client'

import { FC } from 'react'
import { AccommodationRateInput } from '~/components/simulations/settings/accommodation-rate-input'
import { LongTermAccomodationRange } from '~/components/simulations/settings/long-term-accomodation-range'

type VacancyAccommodationRatesInputProps = {
  epci: string
  longTermValue: number
  shortTermValue: number
}

export const VacancyAccommodationRatesInput: FC<VacancyAccommodationRatesInputProps> = ({ epci, longTermValue, shortTermValue }) => {
  return (
    <div style={{ display: 'flex', gap: '1rem' }}>
      <div style={{ flex: 1 }}>
        <AccommodationRateInput txKey="txLV" epci={epci} label="Taux cible de logements vacants" disabled />
      </div>
      <div style={{ flex: 1 }}>
        <LongTermAccomodationRange epci={epci} longTermValue={longTermValue} shortTermValue={shortTermValue} />
      </div>
    </div>
  )
}
