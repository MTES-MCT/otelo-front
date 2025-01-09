'use client'

import { fr } from '@codegouvfr/react-dsfr'
import Alert from '@codegouvfr/react-dsfr/Alert'
import { useQueryState } from 'nuqs'
import { FC } from 'react'
import { useBassinEpcis } from '~/hooks/use-bassin-epcis'

export const ListEpcis: FC = () => {
  const [epci] = useQueryState('epci')

  const { data } = useBassinEpcis()
  if (!epci || !data) return null

  return (
    <div className={fr.cx('fr-py-5w')}>
      <p>En sélectionnant ce territoire, les EPCIs du bassin d&apos;habitat communs seront inclus dans la simulation.</p>
      <div>
        Les territoires inclus dans la simulation sont :
        <ul>
          {(data || []).map((epci) => (
            <li key={epci.code}>{epci.name}</li>
          ))}
        </ul>
      </div>
      <div className={fr.cx('fr-mt-2w')}>
        <Alert
          description="Les résultats de votre simulation seront donnés à l'échelle de l'EPCI ou à l'échelle du bassin d'habitat."
          severity="info"
          small
        />
      </div>
    </div>
  )
}
