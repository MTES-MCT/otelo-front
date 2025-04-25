'use client'

import RadioButtons from '@codegouvfr/react-dsfr/RadioButtons'
import { parseAsArrayOf, parseAsString, parseAsStringEnum, useQueryStates } from 'nuqs'

export const SimulationTypeSelection = () => {
  const [queryStates, setQueryStates] = useQueryStates({
    type: parseAsStringEnum(['bh', 'epcis']).withDefault('bh'),
    epcis: parseAsArrayOf(parseAsString).withDefault([]),
    region: parseAsString.withDefault(''),
    epciChart: parseAsString.withDefault(''),
  })

  return (
    <RadioButtons
      name="radio"
      orientation="horizontal"
      options={[
        {
          hintText: 'Les EPCIs communs du bassin d’habitat seront inclus dans la simulation.',
          label: "Je souhaite simuler à l'échelle du bassin d'habitat",
          nativeInputProps: {
            value: 'bh',
            onChange: () => setQueryStates({ type: 'bh', epciChart: '', epcis: [], region: '' }),
            checked: queryStates.type === 'bh',
          },
        },
        {
          hintText: 'Les EPCIs sélectionnés seront inclus dans la simulation.',
          label: "Je souhaite simuler à l'échelle d'un ou plusieurs EPCIs",
          nativeInputProps: {
            value: 'epcis',
            onChange: () => setQueryStates({ type: 'epcis', epciChart: '', epcis: [], region: '' }),
            checked: queryStates.type === 'epcis',
          },
        },
      ]}
    />
  )
}
