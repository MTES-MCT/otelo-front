import { fr } from '@codegouvfr/react-dsfr'
import { SearchParams } from 'nuqs'
import { searchParamsCache } from '~/app/(authenticated)/simulation/(creation)/searchParams'
import { EpcisAccommodationRates } from '~/components/simulations/settings/epcis-accommodation-rates/epcis-accommodation-rates'
import { NextStepLink } from '~/components/simulations/settings/next-step-link'
import { getBassinEpcis } from '~/server-only/epcis/get-bassin-epcis'
import { getEpcis } from '~/server-only/epcis/get-epcis'
import styles from './taux-cibles-logements.module.css'

type PageProps = {
  searchParams: Promise<SearchParams>
}

export default async function TargetRatesHousing({ searchParams }: PageProps) {
  const { epcis, type } = await searchParamsCache.parse(searchParams)
  let simulationsEpcis = []
  if (type === 'epcis') {
    simulationsEpcis = await getEpcis(epcis)
  } else {
    simulationsEpcis = await getBassinEpcis(epcis[0])
  }
  const href = `/simulation/validation-parametrage`

  return (
    <div className={styles.container}>
      <EpcisAccommodationRates creationMode={true} epcis={simulationsEpcis} />

      <div className={fr.cx('fr-ml-auto', 'fr-my-1w', 'fr-my-auto')}>
        <NextStepLink href={href} query="omphale" />
      </div>
    </div>
  )
}
