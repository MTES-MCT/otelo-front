'use client'

import { RiIconClassName, fr } from '@codegouvfr/react-dsfr'
import Alert from '@codegouvfr/react-dsfr/Alert'
import Tabs from '@codegouvfr/react-dsfr/Tabs'
import { FC } from 'react'
import { tss } from 'tss-react'
import { AccommodationRateInput } from '~/components/simulations/settings/accommodation-rate-input'
import { VacancyAccommodationRatesInput } from '~/components/simulations/settings/vacancy-accommodation-rates-input'
import { useAccommodationRatesByEpci } from '~/hooks/use-accommodation-rate-epci'
import { TEpcisAccommodationRates } from '~/schemas/accommodations-rates'
import { formatNumber } from '~/utils/format-numbers'

interface EpcisAccommodationRatesProps {
  epcis: Array<{ code: string; name: string; region: string }>
  creationMode?: boolean
}

interface TabChildrenProps {
  epci: string
  rates: TEpcisAccommodationRates
  creationMode: boolean
}

const TabChildren: FC<TabChildrenProps> = ({ epci, rates, creationMode }) => {
  const { classes } = useStyles()
  const epciRates = rates?.[epci]
  if (!epciRates) return null

  return (
    <>
      <div className={fr.cx('fr-mb-2w')}>
        <Alert
          description={
            <>
              <span>
                Le volume de logements vacants longue durée est de {formatNumber(epciRates.vacancy.nbAccommodation)} logements en&nbsp;
                {epciRates.vacancy.year}.
              </span>
              <p className={classes.underline}>
                Le taux de vacance courte durée est de {(Number(epciRates.shortTermVacancyRate) * 100).toFixed(2)}%. Il n'est pas
                modifiable.
              </p>
            </>
          }
          severity="info"
          small
        />
      </div>
      <div className={classes.inputsContainer}>
        <VacancyAccommodationRatesInput creationMode={creationMode} epci={epci} />
        <AccommodationRateInput txKey="txRS" epci={epci} label="Taux cible de résidences secondaires" />
      </div>
    </>
  )
}

export const EpcisAccommodationRates: FC<EpcisAccommodationRatesProps> = ({ epcis, creationMode = false }) => {
  const { classes } = useStyles()
  const epcisCodes = epcis.map((epci) => epci.code)
  const { data: rates } = useAccommodationRatesByEpci(epcisCodes)
  if (!rates) return null

  const tabs = epcis.map((epci) => ({
    content: <TabChildren creationMode={creationMode} epci={epci.code} rates={rates} />,
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
  underline: {
    textDecoration: 'underline',
  },
  bold: {
    fontWeight: 'bold',
  },
})
