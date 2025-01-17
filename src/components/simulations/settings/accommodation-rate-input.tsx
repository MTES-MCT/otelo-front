'use client'

import Input from '@codegouvfr/react-dsfr/Input'
import { parseAsFloat, useQueryState } from 'nuqs'
import { FC } from 'react'
import { tss } from 'tss-react'

type AccommodationRateInputProps = {
  defaultValue: number
  disabled?: boolean
  label: string
  max?: number
  queryKey: string
}

export const AccommodationRateInput: FC<AccommodationRateInputProps> = ({ defaultValue, disabled = false, label, max, queryKey }) => {
  const [searchQuery, setSearchQuery] = useQueryState(queryKey, parseAsFloat.withDefault(defaultValue))
  const { classes } = useStyles()

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(Number(e.target.value) / 100)

  return (
    <div className={classes.container}>
      <Input
        disabled={disabled}
        iconId="ri-percent-line"
        label={label}
        nativeInputProps={{
          inputMode: 'numeric',
          max: max,
          onChange: handleInputChange,
          pattern: '[0-9]*[.,]?[0-9]*',
          step: '0.01',
          type: 'number',
          value: (Number(searchQuery) * 100).toFixed(2) ?? '',
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
