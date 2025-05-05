'use client'

import { Select } from '@codegouvfr/react-dsfr/Select'
import { useQueryState } from 'nuqs'
import { FC } from 'react'

export const DATA_TYPE_OPTIONS = [
  { label: 'Evolution passée de la population', value: 'population-evolution' },
  { label: 'Evolution passée du nombre de ménages', value: 'menage-evolution' },
  { label: 'Projection en population', value: 'projection-population-evolution' },
  { label: 'Projection en ménages', value: 'projection-menages-evolution' },
]

export const SelectDataType: FC = () => {
  const [type, setType] = useQueryState('type')

  return (
    <Select
      label="Choix du type de données à visualiser"
      nativeSelectProps={{
        onChange: (event) => setType(event.target.value),
        value: type || '',
      }}
    >
      <option value="">Choix du type de données à visualiser</option>
      {DATA_TYPE_OPTIONS.map((item) => (
        <option key={item.value} value={item.value}>
          {item.label}
        </option>
      ))}
    </Select>
  )
}
