'use client'

import { fr } from '@codegouvfr/react-dsfr'
import Alert from '@codegouvfr/react-dsfr/Alert'
import { parseAsArrayOf, parseAsString, parseAsStringEnum, useQueryStates } from 'nuqs'
import { FC } from 'react'
import { useBassinEpcis } from '~/hooks/use-bassin-epcis'
import { useEpcis } from '~/hooks/use-epcis'

export const ListEpcis: FC = () => {
  const [queryStates] = useQueryStates({
    epcis: parseAsArrayOf(parseAsString).withDefault([]),
    type: parseAsStringEnum(['bh', 'epcis']).withDefault('bh'),
  })

  const { data } = useBassinEpcis()
  const { data: customEpcis } = useEpcis()

  const epcis = !queryStates.type || queryStates.type === 'bh' ? data : customEpcis
  if (!epcis) return null

  const description =
    !queryStates.type || queryStates.type === 'bh'
      ? "Les résultats de votre simulation seront donnés à l'échelle de l'EPCI ou à l'échelle du bassin d'habitat."
      : "Les résultats de votre simulation seront donnés à l'échelle EPCI."

  return (
    <div className={fr.cx('fr-py-5w')}>
      <div>
        Les territoires inclus dans la simulation sont :
        <ul>
          {epcis.map((epci) => (
            <li key={epci.code}>{epci.name}</li>
          ))}
        </ul>
      </div>
      <div className={fr.cx('fr-mt-2w')}>
        <Alert description={description} severity="info" small />
      </div>
    </div>
  )
}
