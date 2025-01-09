import { fr, RiIconClassName } from '@codegouvfr/react-dsfr'
import Alert from '@codegouvfr/react-dsfr/Alert'
import Tabs from '@codegouvfr/react-dsfr/Tabs'
import { SearchParams } from 'nuqs'
import { FC } from 'react'
import { searchParamsCache } from '~/app/(authenticated)/simulation/(creation)/searchParams'
import { NextStepLink } from '~/components/simulations/settings/next-step-link'
import { getBassinEpcis } from '~/server-only/epcis/get-bassin-epcis'
import styles from './taux-cibles-logements.module.css'
import { TAccommodationRates } from '~/schemas/accommodations-rates'
import { EpcisAccommodationRates } from '~/components/simulations/settings/epcis-accommodation-rates/epcis-accommodation-rates'
import { getAccommodationRatesByEpci } from '~/server-only/accomodation-rates/get-accommodation-rate-by-epci'
type PageProps = {
  searchParams: Promise<SearchParams>
}

export interface TabChildrenProps {
  epci: string
  rates: TAccommodationRates
}
const TabChildren: FC<TabChildrenProps> = ({ epci, rates }) => {
  return (
    <div>
      <div style={{ marginBottom: '1rem' }}>
        <Alert
          description={
            <span>
              Le volume de logements vacants longue durée est de {rates.vacancy.nbAccommodation} logements en 2021.
              <span style={{ fontSize: '0.8rem' }}>
                {' '}
                (soit <span style={{ fontWeight: 'bold' }}> {rates.vacancy.txLvLongue}% du parc privé total</span>)
              </span>
            </span>
          }
          severity="info"
          small
        />
      </div>
      <EpcisAccommodationRates epci={epci} rates={rates} />
    </div>
  )
}

export default async function TargetRatesHousing({ searchParams }: PageProps) {
  const { epci } = await searchParamsCache.parse(searchParams)
  const accommodationRates = await getAccommodationRatesByEpci(epci)
  const bassinEpcis = await getBassinEpcis(epci)

  const tabs = bassinEpcis.map((bassinEpci) => ({
    content: <TabChildren epci={bassinEpci.code} rates={accommodationRates[bassinEpci.code]} />,
    iconId: 'ri-road-map-line' as RiIconClassName,
    label: bassinEpci.name,
  }))

  const href = `/simulation/validation-parametrage`

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <Tabs classes={{ panel: styles.backgroundWhite }} tabs={tabs} />

      <div className={fr.cx('fr-ml-auto', 'fr-my-1w', 'fr-my-auto')}>
        <NextStepLink href={href} query="omphale" />
      </div>
    </div>
  )
}
