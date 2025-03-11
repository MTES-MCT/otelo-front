'use client'

import { RiIconClassName } from '@codegouvfr/react-dsfr'
import Alert from '@codegouvfr/react-dsfr/Alert'
import Tabs from '@codegouvfr/react-dsfr/Tabs'
import { FC } from 'react'
import { tss } from 'tss-react'
import { AccommodationRateInput } from '~/components/simulations/settings/accommodation-rate-input'
import { LongTermVacancyAlert } from '~/components/simulations/settings/long-term-vacancy-alert'
import { VacancyAccommodationRatesInput } from '~/components/simulations/settings/vacancy-accommodation-rates-input'
import { useAccommodationRatesByEpci } from '~/hooks/use-accommodation-rate-epci'

interface EpcisAccommodationRatesProps {
  bassinEpcis: Array<{ code: string; name: string; region: string }>
}

interface TabChildrenProps {
  epci: string
}

const TabChildren: FC<TabChildrenProps> = ({ epci }) => {
  const { data: rates } = useAccommodationRatesByEpci()
  const epciRates = rates?.[epci]
  if (!epciRates) return null

  return (
    <div>
      <div style={{ marginBottom: '1rem' }}>
        <Alert
          description={
            <span>
              Le volume de logements vacants longue durée est de {epciRates.vacancy.nbAccommodation} logements en {epciRates.vacancy.year}.
              <span style={{ fontSize: '0.8rem' }}>
                {' '}
                (soit <span style={{ fontWeight: 'bold' }}> {epciRates.vacancy.txLvLongue.toFixed(2)}% du parc privé total</span>)
              </span>
            </span>
          }
          severity="info"
          small
        />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', justifyContent: 'space-between' }}>
        <VacancyAccommodationRatesInput epci={epci} longTermValue={epciRates.vacancy.txLvLongue} shortTermValue={epciRates.txLv} />
        <LongTermVacancyAlert />
        <AccommodationRateInput txKey="txRS" epci={epci} label="Taux cible de résidences secondaires" />
      </div>
    </div>
  )
}

export const EpcisAccommodationRates: FC<EpcisAccommodationRatesProps> = ({ bassinEpcis }) => {
  const { classes } = useStyles()
  const tabs = bassinEpcis.map((bassinEpci) => ({
    content: <TabChildren epci={bassinEpci.code} />,
    iconId: 'ri-road-map-line' as RiIconClassName,
    label: bassinEpci.name,
  }))

  return <Tabs classes={{ panel: classes.backgroundWhite }} tabs={tabs} />
}

const useStyles = tss.create({
  backgroundWhite: {
    backgroundColor: 'white',
  },
})
