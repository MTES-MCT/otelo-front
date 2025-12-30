'use client'

import { RiIconClassName } from '@codegouvfr/react-dsfr'
import Tabs from '@codegouvfr/react-dsfr/Tabs'
import { useQueryState } from 'nuqs'
import { FC } from 'react'
import { CreateSecondaryAccommodationRateInput } from '~/components/simulations/settings/create-secondary-accommodation-rate-input'
import ParcsComparisonCharts from '~/components/simulations/settings/epcis-accommodation-rates/parc-comparison-charts'
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
  const [projection] = useQueryState('projection')

  const epciRates = rates?.[epci]
  if (!epciRates) return null

  return (
    <div className="fr-flex fr-direction-column fr-flex-gap-2v fr-justify-content-space-between">
      <span className="fr-text-mention--grey">
        Le taux observé en {epciRates.vacancy.year} s'élève à <strong>{Number(epciRates.txRs * 100).toFixed(2)} %</strong>.
      </span>
      <div className="fr-flex fr-direction-column fr-flex-gap-6v fr-justify-content-space-between">
        <CreateSecondaryAccommodationRateInput
          epci={epci}
          label={`Quel objectif de taux souhaitez-vous fixer pour l'horizon ${projection} ?`}
        />
        <ParcsComparisonCharts epci={epci} />
      </div>
    </div>
  )
}

export const CreateEpcisSecondaryAccommodationRates: FC<CreateEpcisAccomodationRatesProps> = ({ epcis }) => {
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
