'use client'

import Input from '@codegouvfr/react-dsfr/Input'
import { FC } from 'react'
import { tss } from 'tss-react'
import { useEpcisRates } from '~/app/(authenticated)/simulation/(creation)/(rates-provider)/taux-cibles-logements/rates-provider'
import { LongTermAccomodationRange } from '~/components/simulations/settings/long-term-accomodation-range'

type VacancyAccommodationRatesInputProps = {
  epci: string
  creationMode: boolean
}

export const VacancyAccommodationRatesInput: FC<VacancyAccommodationRatesInputProps> = ({ epci, creationMode }) => {
  const { rates } = useEpcisRates()
  const { classes } = useStyles()
  const ratesByEpci = rates[epci]
  const shortTermVacancyRate = ratesByEpci.shortTermVacancyRate
  const longTermVacancyRate = ratesByEpci.longTermVacancyRate

  return (
    <div className={classes.container}>
      <Input
        disabled
        iconId="ri-percent-line"
        label="Taux cible de logements vacants de courte durée"
        nativeInputProps={{
          type: 'text',
          value: `${Number(shortTermVacancyRate * 100).toFixed(2)}`,
        }}
      />
      <div className={classes.longTermRateContainer}>
        <div className={classes.flex}>
          <Input
            disabled
            iconId="ri-percent-line"
            label="Taux cible de logements vacants de longue durée"
            nativeInputProps={{
              type: 'text',
              value: `${Number(longTermVacancyRate * 100).toFixed(2)}`,
            }}
          />
        </div>
        <div className={classes.flex}>
          <LongTermAccomodationRange creationMode={creationMode} epci={epci} />
        </div>
      </div>
    </div>
  )
}

const useStyles = tss.create({
  container: {
    flexDirection: 'column',
    display: 'flex',
    gap: '1rem',
  },
  longTermRateContainer: {
    display: 'flex',
    gap: '1rem',
  },
  flex: {
    flex: 1,
  },
})
