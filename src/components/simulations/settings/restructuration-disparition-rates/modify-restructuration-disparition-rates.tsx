'use client'

import { RiIconClassName } from '@codegouvfr/react-dsfr'
import Tabs from '@codegouvfr/react-dsfr/Tabs'
import { FC } from 'react'
import { tss } from 'tss-react'
import { useSimulationSettings } from '~/app/(authenticated)/simulation/[id]/modifier/(demographic-modification)/simulation-scenario-modification-provider'
import { ModifyRestructurationDisparitionRatesInput } from '~/components/simulations/settings/restructuration-disparition-rates/modify-restructuration-disparition-rates.input'
import { TEpcisAccommodationRates } from '~/schemas/accommodations-rates'

interface ModifyRestructurationDisparitionRatesProps {
  epcis: Array<{ code: string; name: string; region: string }>
}

interface TabChildrenProps {
  epci: string
  rates: TEpcisAccommodationRates
}

const TabChildren: FC<TabChildrenProps> = ({ epci, rates }) => {
  const epciRates = rates?.[epci]
  if (!epciRates) return null

  return <ModifyRestructurationDisparitionRatesInput epci={epci} />
}

export const ModifyRestructurationDisparitionRates: FC<ModifyRestructurationDisparitionRatesProps> = ({ epcis }) => {
  const { classes } = useStyles()
  const { simulationSettings } = useSimulationSettings()
  const rates = simulationSettings.epciScenarios
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
