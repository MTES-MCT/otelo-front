'use client'

import Alert from '@codegouvfr/react-dsfr/Alert'
import { parseAsFloat, parseAsInteger, useQueryStates } from 'nuqs'
import { FC } from 'react'

export const LongTermVacancyAlert: FC = () => {
  const [queryStates] = useQueryStates({
    projection: parseAsInteger,
    tauxLVLD: parseAsFloat,
  })
  if (!queryStates.tauxLVLD) {
    return null
  }
  return (
    <Alert
      description={`Votre choix de taux de logements vacants longue durée équivaut à 100 logements résorbés sur la période 2021 - ${queryStates.projection}.`}
      severity="warning"
      small
    />
  )
}
