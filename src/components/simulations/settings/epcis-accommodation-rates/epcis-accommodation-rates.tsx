'use client'

import { RiIconClassName, fr } from '@codegouvfr/react-dsfr'
import Alert from '@codegouvfr/react-dsfr/Alert'
import Tabs from '@codegouvfr/react-dsfr/Tabs'
import { FC } from 'react'
import { tss } from 'tss-react'
import { AccommodationRateInput } from '~/components/simulations/settings/accommodation-rate-input'
import { LongTermVacancyAlert } from '~/components/simulations/settings/long-term-vacancy-alert'
import { VacancyAccommodationRatesInput } from '~/components/simulations/settings/vacancy-accommodation-rates-input'
import { useAccommodationRatesByEpci } from '~/hooks/use-accommodation-rate-epci'
import { TEpcisAccommodationRates } from '~/schemas/accommodations-rates'

interface EpcisAccommodationRatesProps {
  epcis: Array<{ code: string; name: string; region: string }>
}

interface TabChildrenProps {
  epci: string
  rates: TEpcisAccommodationRates
}

const TabChildren: FC<TabChildrenProps> = ({ epci, rates }) => {
  const { classes } = useStyles()
  const epciRates = rates?.[epci]
  if (!epciRates) return null

  return (
    <div>
      <div className={fr.cx('fr-mb-2w')}>
        <Alert
          description={
            <span>
              Le volume de logements vacants longue durée est de {epciRates.vacancy.nbAccommodation} logements en {epciRates.vacancy.year}.
              <span className={classes.smallText}>
                {' '}
                (soit <span className={classes.bold}> {epciRates.vacancy.txLvLongue.toFixed(2)}% du parc privé total</span>)
              </span>
            </span>
          }
          severity="info"
          small
        />
      </div>
      <div className={classes.inputsContainer}>
        <VacancyAccommodationRatesInput epci={epci} longTermValue={epciRates.vacancy.txLvLongue} shortTermValue={epciRates.txLv} />
        <LongTermVacancyAlert />
        <AccommodationRateInput txKey="txRS" epci={epci} label="Taux cible de résidences secondaires" />
      </div>
    </div>
  )
}

export const EpcisAccommodationRates: FC<EpcisAccommodationRatesProps> = ({ epcis }) => {
  const { classes } = useStyles()
  const epcisCodes = epcis.map((epci) => epci.code)
  const { data: rates } = useAccommodationRatesByEpci(epcisCodes)

  if (!rates) return null

  const tabs = epcis.map((epci) => ({
    content: <TabChildren epci={epci.code} rates={rates} />,
    iconId: 'ri-road-map-line' as RiIconClassName,
    label: epci.name,
  }))

  return <Tabs classes={{ panel: classes.backgroundWhite }} tabs={tabs} />
}

const useStyles = tss.create({
  backgroundWhite: {
    backgroundColor: 'white',
  },
  inputsContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    justifyContent: 'space-between',
  },
  smallText: {
    fontSize: '0.8rem',
  },
  bold: {
    fontWeight: 'bold',
  },
})
