'use client'

import Input from '@codegouvfr/react-dsfr/Input'
import { FC } from 'react'
import { tss } from 'tss-react'
import { useBassinRates } from '~/app/(authenticated)/simulation/(creation)/taux-cibles-logements/rates-provider'

type AccommodationRateInputProps = {
  disabled?: boolean
  epci: string
  label: string
  max?: number
  txKey: string
}

export const AccommodationRateInput: FC<AccommodationRateInputProps> = ({ disabled = false, epci, label, max, txKey }) => {
  const { rates, updateRates } = useBassinRates()
  const { classes } = useStyles()
  const ratesByEpci = rates[epci]
  const value = ratesByEpci[txKey as keyof typeof ratesByEpci]

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => updateRates(epci, { [txKey]: Number(e.target.value) / 100 })

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
          value: (Number(value) * 100).toFixed(2) ?? '',
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
