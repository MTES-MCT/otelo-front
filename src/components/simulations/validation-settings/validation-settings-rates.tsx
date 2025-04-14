'use client'

import { RiIconClassName, fr } from '@codegouvfr/react-dsfr'
import Input from '@codegouvfr/react-dsfr/Input'
import Tabs from '@codegouvfr/react-dsfr/Tabs'
import { useSearchParams } from 'next/navigation'
import { FC } from 'react'
import { tss } from 'tss-react'
import {
  RateSettings,
  useBassinRates,
} from '~/app/(authenticated)/simulation/(creation)/(rates-provider)/taux-cibles-logements/rates-provider'
import { useBassinEpcis } from '~/hooks/use-bassin-epcis'

interface TabChildrenProps {
  epci: string
  rates: RateSettings
}

const TabChildren: FC<TabChildrenProps> = ({ rates }) => {
  const { classes } = useStyles()
  const { txLV, txLVLD, txRS } = rates

  return (
    <div className={classes.container}>
      <Input
        disabled
        label=""
        iconId="ri-percent-line"
        hintText="Taux cible de logements vacants"
        nativeInputProps={{ value: (Number(txLV) * 100).toFixed(2) }}
        className={classes.flex}
        stateRelatedMessage={`dont ${Number(txLVLD).toFixed(2)}% de logements vacants de longue durée`}
        state="info"
      />
      <Input
        disabled
        className={classes.flex}
        label=""
        iconId="ri-percent-line"
        hintText="Taux cible de résidences secondaires"
        nativeInputProps={{ value: (Number(txRS) * 100).toFixed(2) }}
      />
    </div>
  )
}

export const ValidationSettingsRates: FC<{ epci?: string }> = ({ epci }) => {
  const searchParams = useSearchParams()
  const epciParams = epci ?? searchParams.get('epci')
  const { data: bassinEpcis } = useBassinEpcis(epci)
  console.log('bassin', bassinEpcis)
  const { rates } = useBassinRates()

  const tabs = Object.entries(rates)
    .sort(([code]) => (code === epciParams ? -1 : 1))
    .map(([epci, rates]) => ({
      content: <TabChildren epci={epci} rates={rates} />,
      iconId: 'ri-road-map-line' as RiIconClassName,
      label: bassinEpcis?.find((bassinEpci) => bassinEpci.code === epci)?.name,
    }))

  return (
    <div className={fr.cx('fr-p-2w')} style={{ backgroundColor: fr.colors.decisions.background.default.grey.default }}>
      <h4>Taux cible de résidences secondaires et logements vacants</h4>
      <Tabs tabs={tabs} />
    </div>
  )
}

const useStyles = tss.create({
  container: {
    display: 'flex',
    gap: '1rem',
  },
  flex: {
    flex: 1,
  },
})
