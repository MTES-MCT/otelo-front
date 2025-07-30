'use client'

import Input from '@codegouvfr/react-dsfr/Input'
import { FC, useState } from 'react'
import { useEpcisRates } from '~/app/(authenticated)/simulation/(creation)/(rates-provider)/rates-provider'
import { useAccommodationRatesByEpci } from '~/hooks/use-accommodation-rate-epci'

type CreateRestructurationDisparitionRatesInputProps = {
  epci: string
}

export const CreateRestructurationDisparitionRatesInput: FC<CreateRestructurationDisparitionRatesInputProps> = ({ epci }) => {
  const { rates, updateRates } = useEpcisRates()
  const { data: accommodationRates } = useAccommodationRatesByEpci([epci])
  const accommodationRate = accommodationRates?.[epci]
  const urbanRenewalAccommodations = accommodationRate?.urbanRenewal ?? 0
  const ratesByEpci = rates[epci]
  const restructuringRate = ratesByEpci.restructuringRate
  const disappearanceRate = ratesByEpci.disappearanceRate

  const [restructuringRateInput, setRestructuringRateInput] = useState(`${Number(restructuringRate * 100).toFixed(2)}`)
  const [disappearanceRateInput, setDisappearanceRateInput] = useState(`${Number(disappearanceRate * 100).toFixed(2)}`)

  const handleRestructuringRateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value.replace(',', '.'))
    setRestructuringRateInput(e.target.value)
    if (value > 100) {
      setRestructuringRateInput('100')
    } else if (value < 0) {
      setRestructuringRateInput('0')
    } else {
      setRestructuringRateInput(e.target.value)
    }
    updateRates(epci, { restructuringRate: value / 100 })
  }

  const handleDisappearanceRateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value.replace(',', '.'))
    setDisappearanceRateInput(e.target.value)
    if (value > 100) {
      setDisappearanceRateInput('100')
    } else if (value < 0) {
      setDisappearanceRateInput('0')
    } else {
      setDisappearanceRateInput(e.target.value)
    }
    updateRates(epci, { disappearanceRate: value / 100 })
  }
  const urbanRenewalAccommodationsTotal = Math.round(Math.abs(disappearanceRate - restructuringRate) * urbanRenewalAccommodations)

  return (
    <div className="fr-flex fr-direction-column">
      <div className="fr-flex fr-flex-gap-4v">
        <Input
          className="fr-width-full"
          iconId="ri-percent-line"
          label="Taux annuel de restructuration"
          nativeInputProps={{
            type: 'text',
            value: restructuringRateInput,
            onChange: handleRestructuringRateChange,
          }}
        />
        <Input
          className="fr-width-full"
          iconId="ri-percent-line"
          label="Taux annuel de disparition"
          nativeInputProps={{
            type: 'text',
            value: disappearanceRateInput,
            onChange: handleDisappearanceRateChange,
          }}
        />
      </div>
      <p>
        Avec ce paramétrage, le rythme de renouvellement urbain impliquerait une{' '}
        <strong>{urbanRenewalAccommodationsTotal > 0 ? 'augmentation' : 'diminution'}</strong> de{' '}
        <strong>{urbanRenewalAccommodationsTotal}</strong> logements par an.
      </p>
    </div>
  )
}
