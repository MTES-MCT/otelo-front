'use client'

import Input from '@codegouvfr/react-dsfr/Input'
import { useQueryState } from 'nuqs'
import { FC } from 'react'
import { tss } from 'tss-react'

type AccommodationRateInputProps = {
  defaultValue: number
  isPercentage?: boolean
  label: string
  max?: number
  queryKey: string
}

export const AccommodationRateInput: FC<AccommodationRateInputProps> = ({ defaultValue, isPercentage = false, label, max, queryKey }) => {
  const defaultValueFormatted = isPercentage ? Number(defaultValue * 100).toFixed(2) : Number(defaultValue).toFixed(2)
  const [searchQuery, setSearchQuery] = useQueryState(queryKey, {
    defaultValue: defaultValueFormatted,
  })
  const { classes } = useStyles()
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)

  return (
    <div className={classes.container}>
      <Input
        iconId="ri-percent-line"
        label={label}
        nativeInputProps={{
          inputMode: 'numeric',
          max: max,
          onChange: handleInputChange,
          pattern: '[0-9]*[.,]?[0-9]*',
          step: '0.01',
          type: 'number',
          value: searchQuery ?? '',
        }}
      />
    </div>
  )
}

const useStyles = tss.create({
  container: {
    width: '100%',
  },
})
