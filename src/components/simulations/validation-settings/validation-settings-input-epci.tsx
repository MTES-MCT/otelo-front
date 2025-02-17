'use client'

import Input from '@codegouvfr/react-dsfr/Input'
import { FC } from 'react'
import { useEpci } from '~/hooks/use-epci'

export const ValidationSettingsInputEpci: FC = () => {
  const { data: epci } = useEpci()

  return <Input disabled label="" hintText="Commune" nativeInputProps={{ value: epci?.name }} style={{ flex: 1 }} />
}
