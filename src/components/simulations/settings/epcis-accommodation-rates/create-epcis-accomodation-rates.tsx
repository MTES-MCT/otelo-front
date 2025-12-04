'use client'

import { RiIconClassName, fr } from '@codegouvfr/react-dsfr'
import Alert from '@codegouvfr/react-dsfr/Alert'
import Tabs from '@codegouvfr/react-dsfr/Tabs'
import { FC } from 'react'
import { CreateVacancyAccommodationRatesInput } from '~/components/simulations/settings/create-vacancy-accommodation-rates-input'
import { useAccommodationRatesByEpci } from '~/hooks/use-accommodation-rate-epci'
import { TEpcisAccommodationRates } from '~/schemas/accommodations-rates'

interface CreateEpcisAccomodationRatesProps {
  epcis: Array<{ code: string; name: string; region: string }>
}

interface TabChildrenProps {
  epci: string
  rates: TEpcisAccommodationRates
}

const TabChildren: FC<TabChildrenProps> = ({ epci, rates }) => {
  const epciRates = rates?.[epci]
  if (!epciRates) return null

  return (
    <>
      <div className={fr.cx('fr-mb-2w')}>
        <Alert
          description={
            <span>
              Le taux de vacance de courte durée est fixé par Otelo à&nbsp;
              <strong>{(Number(epciRates.shortTermVacancyRate) * 100).toFixed(2)}%</strong>. Il s'agit du taux généralement retenu pour
              garantir une bonne fluidité du parc. Il n'est pas modifiable.
            </span>
          }
          severity="info"
          small
        />
      </div>
      <div className="fr-flex fr-direction-column fr-flex-gap-2v fr-justify-content-space-between">
        <CreateVacancyAccommodationRatesInput epci={epci} epciRates={epciRates} />
      </div>
    </>
  )
}

export const CreateEpcisAccommodationRates: FC<CreateEpcisAccomodationRatesProps> = ({ epcis }) => {
  const epcisCodes = epcis.map((epci) => epci.code)
  const { data: rates } = useAccommodationRatesByEpci(epcisCodes)
  if (!rates) return null

  const tabs = epcis.map((epci) => ({
    content: <TabChildren epci={epci.code} rates={rates} />,
    iconId: 'ri-road-map-line' as RiIconClassName,
    label: epci.name,
  }))

  return <Tabs classes={{ panel: 'fr-background-default--grey' }} tabs={tabs} />
}
