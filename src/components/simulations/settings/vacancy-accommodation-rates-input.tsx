'use client'

import { FC } from 'react'
import { AccommodationRateInput } from '~/components/simulations/settings/accommodation-rate-input'
import { LongTermAccomodationRange } from '~/components/simulations/settings/long-term-accomodation-range'

type VacancyAccommodationRatesInputProps = {
  txLv: number
  txLvLongue: number
}

export const VacancyAccommodationRatesInput: FC<VacancyAccommodationRatesInputProps> = ({ txLv, txLvLongue }) => {
  return (
    <div style={{ display: 'flex', gap: '1rem' }}>
      <div style={{ flex: 1 }}>
        <AccommodationRateInput defaultValue={txLv} label="Taux cible de logements vacants" queryKey="tauxLv" disabled />
      </div>
      <div style={{ flex: 1 }}>
        <LongTermAccomodationRange longTermValue={txLvLongue} shortTermValue={txLv} />
      </div>
    </div>
  )
}
