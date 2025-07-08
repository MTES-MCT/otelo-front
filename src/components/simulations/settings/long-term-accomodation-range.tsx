import { Range } from '@codegouvfr/react-dsfr/Range'
import { FC, useEffect } from 'react'
import { useEpcisRates } from '~/app/(authenticated)/simulation/(creation)/(rates-provider)/taux-cibles-logements/rates-provider'

interface LongTermAccomodationRangeProps {
  epci: string
  creationMode: boolean
}

export const LongTermAccomodationRange: FC<LongTermAccomodationRangeProps> = ({ epci, creationMode }) => {
  const { defaultRates, rates, updateRates } = useEpcisRates()
  const currentRates = rates[epci]
  const defaultEpciRates = defaultRates[epci]
  useEffect(() => {
    if (creationMode) {
      const reductionAmount = (15 / 100) * defaultEpciRates.longTermVacancyRate
      const longTermRate = defaultEpciRates.longTermVacancyRate - reductionAmount

      updateRates(epci, {
        longTermVacancyRate: longTermRate,
      })
    }
  }, [])

  const getCurrentRangeValue = (): number => {
    if (currentRates?.longTermVacancyRate === undefined || !defaultEpciRates?.longTermVacancyRate) return 0
    const reduction = defaultEpciRates.longTermVacancyRate - currentRates.longTermVacancyRate
    const percentage = (reduction / defaultEpciRates.longTermVacancyRate) * 100
    return Math.round(percentage * 100) / 100
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rangeValue = Number(e.target.value)
    const reductionAmount = (rangeValue / 100) * defaultEpciRates.longTermVacancyRate
    const longTermRate = defaultEpciRates.longTermVacancyRate - reductionAmount

    updateRates(epci, {
      longTermVacancyRate: longTermRate,
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
