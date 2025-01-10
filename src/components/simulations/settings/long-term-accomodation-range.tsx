'use client'

import { Range } from '@codegouvfr/react-dsfr/Range'
import { parseAsFloat, useQueryStates } from 'nuqs'
import { FC } from 'react'

type LongTermAccomodationRangeProps = {
  longTermValue: number
  shortTermValue: number
}

export const LongTermAccomodationRange: FC<LongTermAccomodationRangeProps> = ({ longTermValue, shortTermValue }) => {
  const [queryStates, setQueryStates] = useQueryStates({
    tauxLVLD: parseAsFloat,
    tauxLVLDPercent: parseAsFloat,
    tauxLv: parseAsFloat,
  })

  const getComputedTxLv = (value: number, tauxLVLD: number): number => {
    return value - ((tauxLVLD && tauxLVLD / 100) || 0)
  }

  const searchQueryToRangeValue = (queryValue: number | null): number => {
    if (!queryValue) return 100
    const rate = queryValue

    return ((longTermValue - rate) / longTermValue) * 100
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rangeValue = Number(e.target.value)
    const rate = longTermValue * (1 - rangeValue / 100)

    const txLvLD = rangeValue / 100
    setQueryStates({ tauxLVLD: rate, tauxLVLDPercent: txLvLD, tauxLv: getComputedTxLv(shortTermValue, rate) })
  }

  return (
    <Range
      label="Taux cible de logements vacants longue durée"
      max={100}
      min={0}
      nativeInputProps={{
        onChange: handleChange,
        value: searchQueryToRangeValue(queryStates.tauxLVLD),
      }}
    />
  )
}
