'use client'

import { RiIconClassName } from '@codegouvfr/react-dsfr'
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

  return <CreateRestructurationDisparitionRatesInput epci={epci} />
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
