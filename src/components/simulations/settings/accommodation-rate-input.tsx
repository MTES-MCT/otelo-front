'use client'

import Input from '@codegouvfr/react-dsfr/Input'
import { useQueryState } from 'nuqs'
import { FC } from 'react'
import { tss } from 'tss-react'

type AccommodationRateInputProps = {
  defaultValue: number
  label: string
  queryKey: string
}

export const AccommodationRateInput: FC<AccommodationRateInputProps> = ({ defaultValue, label, queryKey }) => {
  const [searchQuery, setSearchQuery] = useQueryState(queryKey, { defaultValue: Number(defaultValue * 100).toFixed(2) })
  const { classes } = useStyles()
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)

  return (
    <div className={classes.container}>
      <Input
        iconId="ri-percent-line"
        label={label}
        nativeInputProps={{
          inputMode: 'numeric',
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
