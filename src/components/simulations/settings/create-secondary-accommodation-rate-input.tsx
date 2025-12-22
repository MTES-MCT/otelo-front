'use client'

import Input from '@codegouvfr/react-dsfr/Input'
import { useQueryState } from 'nuqs'
import { FC, useEffect, useState } from 'react'
import { useEpcisRates } from '~/app/(authenticated)/simulation/(creation)/(rates-provider)/rates-provider'

type CreateAccommodationRateInputProps = {
  disabled?: boolean
  epci: string
  label: string
  txKey: string
}

export const CreateSecondaryAccommodationRateInput: FC<CreateAccommodationRateInputProps> = ({ disabled = false, epci, label, txKey }) => {
  const [projectionState] = useQueryState('projection')

  const { rates, updateRates } = useEpcisRates()
  const ratesByEpci = rates[epci]
  const [valueInput, setValueInput] = useState<string | undefined>(undefined)
  useEffect(() => {
    if (!!ratesByEpci && ratesByEpci[txKey as keyof typeof ratesByEpci]) {
      setValueInput(`${Number(ratesByEpci[txKey as keyof typeof ratesByEpci] * 100).toFixed(2)}`)
    }
  }, [])

  if (!ratesByEpci) return null

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value.replace(',', '.'))
    setValueInput(e.target.value)
    if (value > 100) {
      setValueInput('100')
    } else if (value < 0) {
      setValueInput('0')
    } else {
      setValueInput(e.target.value)
    }
    updateRates(epci, { [txKey]: value / 100 })
  }

  return (
    <div className="fr-flex fr-align-items-end fr-flex-gap-2v">
      <span>En {projectionState}, vous ciblez le taux suivant :</span>

      <Input
        disabled={disabled}
        hideLabel
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
