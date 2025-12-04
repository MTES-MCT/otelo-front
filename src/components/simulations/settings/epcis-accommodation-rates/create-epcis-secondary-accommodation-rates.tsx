'use client'

import { RiIconClassName } from '@codegouvfr/react-dsfr'
import Badge from '@codegouvfr/react-dsfr/Badge'
import CallOut from '@codegouvfr/react-dsfr/CallOut'
import Tabs from '@codegouvfr/react-dsfr/Tabs'
import classNames from 'classnames'
import { FC } from 'react'
import { tss } from 'tss-react'
import { CreateSecondaryAccommodationRateInput } from '~/components/simulations/settings/create-secondary-accommodation-rate-input'
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
  const { classes } = useStyles()
  const epciRates = rates?.[epci]
  if (!epciRates) return null

  return (
    <div className="fr-flex fr-direction-column fr-flex-gap-2v fr-justify-content-space-between">
      <span className="fr-text-mention--grey">
        En {epciRates.vacancy.year}, le territoire compte <strong>XXX - voir avec Luc la source (filocom?)</strong> résidences secondaires.
      </span>

      <CreateSecondaryAccommodationRateInput txKey="txRS" epci={epci} label="Taux cible de résidences secondaires" />
      <CallOut
        className="fr-mt-2w"
        title={
          <Badge severity="success" noIcon small>
            <span className={classNames(classes.badgeIcon, 'ri-leaf-line fr-mr-1v')} />
            <span className="fr-text--uppercase">Taux favorable</span>
          </Badge>
        }
      >
        <>
          <span>XXXXXXX - en attente du texte</span>
          <br />
          <span className="fr-text--sm fr-text-mention--grey fr-mb-0">Source des données : Filocom</span>
        </>
      </CallOut>
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

const useStyles = tss.create({
  badgeIcon: {
    '&::before': {
      '--icon-size': '12px',
    },
  },
})
