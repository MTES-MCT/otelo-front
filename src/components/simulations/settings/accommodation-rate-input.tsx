'use client'

import Input from '@codegouvfr/react-dsfr/Input'
import { FC, useState } from 'react'
import { tss } from 'tss-react'
import { useEpcisRates } from '~/app/(authenticated)/simulation/(creation)/(rates-provider)/taux-cibles-logements/rates-provider'

type AccommodationRateInputProps = {
  disabled?: boolean
  epci: string
  label: string
  txKey: string
}

export const AccommodationRateInput: FC<AccommodationRateInputProps> = ({ disabled = false, epci, label, txKey }) => {
  const { rates, updateRates } = useEpcisRates()
  const { classes } = useStyles()
  const ratesByEpci = rates[epci]
  const value = ratesByEpci[txKey as keyof typeof ratesByEpci]
  const [valueInput, setValueInput] = useState(`${Number(value * 100).toFixed(2)}`)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value.replace(',', '.'))
    setValueInput(e.target.value)
    updateRates(epci, { [txKey]: value / 100 })
  }

  return (
    <div className={classes.container}>
      <Input
        disabled={disabled}
        iconId="ri-percent-line"
        label={label}
        nativeInputProps={{
          onChange: handleInputChange,
          type: 'text',
          value: valueInput,
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
