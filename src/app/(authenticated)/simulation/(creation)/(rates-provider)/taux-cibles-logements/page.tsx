import { fr } from '@codegouvfr/react-dsfr'
import { SearchParams } from 'nuqs'
import { searchParamsCache } from '~/app/(authenticated)/simulation/(creation)/searchParams'
import { CreateEpcisAccommodationRates } from '~/components/simulations/settings/epcis-accommodation-rates/create-epcis-accomodation-rates'
import { NextStepLink } from '~/components/simulations/settings/next-step-link'
import { getEpcis } from '~/server-only/epcis/get-epcis'
import styles from './taux-cibles-logements.module.css'

type PageProps = {
  searchParams: Promise<SearchParams>
}

export default async function TargetRatesHousing({ searchParams }: PageProps) {
  const { epcis, baseEpci } = await searchParamsCache.parse(searchParams)
  const simulationsEpcis = await getEpcis(epcis, baseEpci)
  const href = `/simulation/taux-restructuration-disparition`

  return (
    <div className={styles.container}>
      <CreateEpcisAccommodationRates epcis={simulationsEpcis} />

      <div className={fr.cx('fr-ml-auto', 'fr-my-1w', 'fr-my-auto')}>
        <NextStepLink href={href} query="omphale" />
      </div>
    </div>
  )
}
