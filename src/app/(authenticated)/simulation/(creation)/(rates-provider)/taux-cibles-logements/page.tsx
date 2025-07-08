import { fr } from '@codegouvfr/react-dsfr'
import { SearchParams } from 'nuqs'
import { searchParamsCache } from '~/app/(authenticated)/simulation/(creation)/searchParams'
import { EpcisAccommodationRates } from '~/components/simulations/settings/epcis-accommodation-rates/epcis-accommodation-rates'
import { NextStepLink } from '~/components/simulations/settings/next-step-link'
import { getEpcis } from '~/server-only/epcis/get-epcis'
import styles from './taux-cibles-logements.module.css'

type PageProps = {
  searchParams: Promise<SearchParams>
}

export default async function TargetRatesHousing({ searchParams }: PageProps) {
  const { epcis, baseEpci } = await searchParamsCache.parse(searchParams)
  const simulationsEpcis = await getEpcis(epcis, baseEpci)
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
