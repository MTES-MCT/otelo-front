'use client'

import { RiIconClassName } from '@codegouvfr/react-dsfr'
import { Alert } from '@codegouvfr/react-dsfr/Alert'
import Tabs from '@codegouvfr/react-dsfr/Tabs'
import { FC } from 'react'
import { tss } from 'tss-react'
import { CreateRestructurationDisparitionRatesInput } from '~/components/simulations/settings/restructuration-disparition-rates/create-restructuration-disparition-rates.input'
import { useAccommodationRatesByEpci } from '~/hooks/use-accommodation-rate-epci'
import { TEpcisAccommodationRates } from '~/schemas/accommodations-rates'

interface CreateRestructurationDisparitionRatesProps {
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
    <div>
      <div className="fr-mb-2w">
        <Alert
          description="
            Le taux annuel de disparition correspond à la proportion du parc de logement qui a disparu durant une année. Cela peut
            correspondre à des logements démolis ou à des logements disparus du fait de fusions ou de changements d'usage (par exemple la
            transformation d'un logement en local d'activité)."
          severity="info"
          small
        />
        <Alert
          description="
            Les restructurations correspondent aux créations de nouveaux logements au sein du parc existant, à travers la division de logement ou de changement d'usages (par exemple la transformation de locaux d'activités en logements). Le taux de restructuration correspond au volume de logements créés par ces phénomènes de restructuration, rapporté à l'ensemble du parc."
          severity="info"
          small
        />
        <div className="fr-mt-4w">Par défaut, Otelo vous propose de reconduire les taux annuels mesurés entre 2015 et 2021.</div>
      </div>
      <CreateRestructurationDisparitionRatesInput epci={epci} />
    </div>
  )
}

export const CreateRestructurationDisparitionRates: FC<CreateRestructurationDisparitionRatesProps> = ({ epcis }) => {
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
})
