'use client'

import Input from '@codegouvfr/react-dsfr/Input'
import { FC } from 'react'
import { tss } from 'tss-react'
import { useEpcisRates } from '~/app/(authenticated)/simulation/(creation)/(rates-provider)/taux-cibles-logements/rates-provider'
import { LongTermAccomodationRange } from '~/components/simulations/settings/long-term-accomodation-range'

type VacancyAccommodationRatesInputProps = {
  epci: string
  longTermValue: number
  shortTermValue: number
  creationMode: boolean
}

export const VacancyAccommodationRatesInput: FC<VacancyAccommodationRatesInputProps> = ({
  epci,
  longTermValue,
  shortTermValue,
  creationMode,
}) => {
  const { rates } = useEpcisRates()
  const { classes } = useStyles()
  const ratesByEpci = rates[epci]
  const txLv = ratesByEpci.txLV

  return (
    <div className={classes.container}>
      <div className={classes.flex}>
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
      <div className={classes.flex}>
        <LongTermAccomodationRange creationMode={creationMode} epci={epci} longTermValue={longTermValue} shortTermValue={shortTermValue} />
      </div>
    </div>
  )
}

const useStyles = tss.create({
  container: {
    display: 'flex',
    gap: '1rem',
  },
  flex: {
    flex: 1,
  },
})
