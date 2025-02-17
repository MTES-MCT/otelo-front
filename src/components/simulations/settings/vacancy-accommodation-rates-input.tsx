'use client'

import Input from '@codegouvfr/react-dsfr/Input'
import { FC } from 'react'
import { useBassinRates } from '~/app/(authenticated)/simulation/(creation)/(rates-provider)/taux-cibles-logements/rates-provider'
import { LongTermAccomodationRange } from '~/components/simulations/settings/long-term-accomodation-range'

type VacancyAccommodationRatesInputProps = {
  epci: string
  longTermValue: number
  shortTermValue: number
}

export const VacancyAccommodationRatesInput: FC<VacancyAccommodationRatesInputProps> = ({ epci, longTermValue, shortTermValue }) => {
  const { rates } = useBassinRates()
  const ratesByEpci = rates[epci]
  const txLv = ratesByEpci.txLV

  return (
    <div style={{ display: 'flex', gap: '1rem' }}>
      <div style={{ flex: 1 }}>
        <Input
          disabled
          iconId="ri-percent-line"
          label="Taux cible de logements vacants"
          nativeInputProps={{
            type: 'text',
            value: `${Number(txLv * 100).toFixed(2)}`,
          }}
        />
      </div>
      <div style={{ flex: 1 }}>
        <LongTermAccomodationRange epci={epci} longTermValue={longTermValue} shortTermValue={shortTermValue} />
      </div>
    </div>
  )
}
