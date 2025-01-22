'use client'

import { fr, RiIconClassName } from '@codegouvfr/react-dsfr'
import Input from '@codegouvfr/react-dsfr/Input'
import Tabs from '@codegouvfr/react-dsfr/Tabs'
import { useSearchParams } from 'next/navigation'
import { FC } from 'react'
import {
  RateSettings,
  useBassinRates,
} from '~/app/(authenticated)/simulation/(creation)/(rates-provider)/taux-cibles-logements/rates-provider'
import { useBassinEpcis } from '~/hooks/use-bassin-epcis'

interface TabChildrenProps {
  epci: string
  rates: RateSettings
}

const TabChildren: FC<TabChildrenProps> = ({ epci, rates }) => {
  const { txLV, txRS } = rates
  return (
    <div style={{ display: 'flex', gap: '1rem' }}>
      <Input
        disabled
        label=""
        iconId="ri-percent-line"
        hintText="Taux cible de logements vacants"
        nativeInputProps={{ value: (Number(txLV) * 100).toFixed(2) }}
        style={{ flex: 1 }}
      />
      <Input
        disabled
        label=""
        iconId="ri-percent-line"
        hintText="Taux cible de résidences secondaires"
        nativeInputProps={{ value: (Number(txRS) * 100).toFixed(2) }}
        style={{ flex: 1 }}
      />
    </div>
  )
}

export const ValidationSettingsRates: FC = () => {
  const searchParams = useSearchParams()
  const epci = searchParams.get('epci')
  const { data: bassinEpcis } = useBassinEpcis()
  const { rates } = useBassinRates()

  const tabs = Object.entries(rates)
    .sort(([code]) => (code === epci ? -1 : 1))
    .map(([epci, rates]) => ({
      content: <TabChildren epci={epci} rates={rates} />,
      iconId: 'ri-road-map-line' as RiIconClassName,
      label: bassinEpcis?.find((bassinEpci) => bassinEpci.code === epci)?.name,
    }))

  return (
    <div style={{ backgroundColor: fr.colors.decisions.background.default.grey.default, padding: '1rem' }}>
      <h4>Taux cible de résidences secondaires et logements vacants</h4>
      <Tabs tabs={tabs} />
    </div>
  )
}
