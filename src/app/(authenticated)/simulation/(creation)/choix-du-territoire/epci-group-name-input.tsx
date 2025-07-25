'use client'

import Input from '@codegouvfr/react-dsfr/Input'
import { parseAsString, useQueryStates } from 'nuqs'
import { FC } from 'react'

type EpciGroupNameInputProps = {
  value: string
}

export const EpciGroupNameInput: FC<EpciGroupNameInputProps> = ({ value }) => {
  const [_, setQueryStates] = useQueryStates({
    epciGroupName: parseAsString,
  })
  return (
    <Input
      label="Nom du groupe EPCI"
      hintText="Donnez un nom à cette sélection d'EPCI pour la réutiliser plus tard"
      nativeInputProps={{
        value,
        onChange: (e) => {
          setQueryStates({ epciGroupName: e.target.value })
        },
        placeholder: 'Ex: Métropole du Grand Paris Est',
      }}
    />
  )
}
