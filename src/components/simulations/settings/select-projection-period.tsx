'use client'

import { useQueryState } from 'nuqs'
import { FC, useEffect } from 'react'
import { Range } from '@codegouvfr/react-dsfr/Range'

export const SelectProjectionPeriod: FC = () => {
  const [projection, setProjection] = useQueryState('projection')

  useEffect(() => {
    if (!projection) {
      setProjection('2030')
    }
  }, [projection, setProjection])

  return (
    <Range
      hintText="Faites glisser le curseur pour définir l'horizon de temps de la simulation."
      label="Horizon de temps"
      max={2050}
      min={2021}
      nativeInputProps={{ onChange: (e) => setProjection(e.target.value), value: projection ?? '2030' }}
    />
  )
}
