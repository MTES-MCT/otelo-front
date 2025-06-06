import { Range } from '@codegouvfr/react-dsfr/Range'
import { FC, useEffect } from 'react'
import {
  getComputedTxLv,
  useEpcisRates,
} from '~/app/(authenticated)/simulation/(creation)/(rates-provider)/taux-cibles-logements/rates-provider'

interface LongTermAccomodationRangeProps {
  epci: string
  longTermValue: number
  shortTermValue: number
  creationMode: boolean
}

export const LongTermAccomodationRange: FC<LongTermAccomodationRangeProps> = ({ epci, longTermValue, shortTermValue, creationMode }) => {
  const { rates, updateRates } = useEpcisRates()
  const currentRates = rates[epci]
  useEffect(() => {
    if (creationMode) {
      const defaultRate = (15 / 100) * longTermValue
      updateRates(epci, {
        txLV: getComputedTxLv(shortTermValue, defaultRate),
        txLVLD: defaultRate,
      })
    }
  }, [])

  const getCurrentRangeValue = (): number => {
    if (!currentRates.txLVLD) return 0
    return (currentRates.txLVLD / longTermValue) * 100
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rangeValue = Number(e.target.value)
    const rate = (rangeValue / 100) * longTermValue

    updateRates(epci, {
      txLV: getComputedTxLv(shortTermValue, rate),
      txLVLD: rate,
    })
  }

  return (
    <Range
      label="Réduction du taux  de logements vacants longue durée"
      max={100}
      min={0}
      nativeInputProps={{
        onChange: handleChange,
        value: getCurrentRangeValue(),
      }}
    />
  )
}
