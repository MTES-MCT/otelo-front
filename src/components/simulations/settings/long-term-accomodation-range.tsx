import { Range } from '@codegouvfr/react-dsfr/Range'
import { FC } from 'react'
import { useBassinRates } from '~/app/(authenticated)/simulation/(creation)/(rates-provider)/taux-cibles-logements/rates-provider'

interface LongTermAccomodationRangeProps {
  epci: string
  longTermValue: number
  shortTermValue: number
}

export const LongTermAccomodationRange: FC<LongTermAccomodationRangeProps> = ({ epci, longTermValue, shortTermValue }) => {
  const { rates, updateRates } = useBassinRates()
  const currentRates = rates[epci]

  const getComputedTxLv = (value: number, tauxLVLD: number): number => {
    return value - ((tauxLVLD && tauxLVLD / 100) || 0)
  }

  const getCurrentRangeValue = (): number => {
    if (!currentRates.txLVLD) return 100
    return ((longTermValue - currentRates.txLVLD) / longTermValue) * 100
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rangeValue = Number(e.target.value)
    const rate = longTermValue * (1 - rangeValue / 100)

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
