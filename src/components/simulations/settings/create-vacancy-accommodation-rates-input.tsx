'use client'

import Badge from '@codegouvfr/react-dsfr/Badge'
import CallOut from '@codegouvfr/react-dsfr/CallOut'
import Input from '@codegouvfr/react-dsfr/Input'
import classNames from 'classnames'
import { useQueryState } from 'nuqs'
import { FC, useState } from 'react'
import { tss } from 'tss-react'
import { useEpcisRates } from '~/app/(authenticated)/simulation/(creation)/(rates-provider)/rates-provider'
import { CreateLongTermAccomodationRange } from '~/components/simulations/settings/create-long-term-accomodation-range'
import { TAccommodationRates } from '~/schemas/accommodations-rates'
import { formatNumber } from '~/utils/format-numbers'

type CreateVacancyAccommodationRatesInputProps = {
  epci: string
  epciRates: TAccommodationRates
}

export const CreateVacancyAccommodationRatesInput: FC<CreateVacancyAccommodationRatesInputProps> = ({ epci, epciRates }) => {
  const [projectionState] = useQueryState('projection')
  const { rates } = useEpcisRates()
  const { classes } = useStyles()
  const ratesByEpci = rates[epci]
  const [rangeValue, setRangeValue] = useState<number>(0)

  if (!ratesByEpci) return null

  const longTermVacancyRate = ratesByEpci.longTermVacancyRate

  return (
    <div className="fr-flex fr-direction-column fr-flex-gap-2v">
      <span className="fr-text-mention--grey">
        En {epciRates.vacancy.year}, le territoire compte <strong>{formatNumber(epciRates.vacancy.nbAccommodation)}</strong> logements
        vacants. Ce volume représente <strong>{Math.round(epciRates.longTermVacancyRate * 100).toFixed(2)} %</strong> du parc de logements.
      </span>
      <div className="fr-flex fr-align-items-center fr-flex-gap-4v">
        <div className="fr-flex fr-align-items-end fr-flex-gap-2v">
          <span>En {projectionState}, vous ciblez le taux suivant :</span>
          <Input
            label="Taux de vacance de longue durée"
            hideLabel
            iconId="ri-percent-line"
            style={{ width: '25%' }}
            nativeInputProps={{
              type: 'text',
              value: `${Number(longTermVacancyRate * 100).toFixed(2)}`,
              readOnly: true,
            }}
          />
        </div>
        <CreateLongTermAccomodationRange epci={epci} onRangeValueChange={setRangeValue} />
      </div>
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
          <span>
            Le volume de logements vacants de longue durée diminuera de <strong>{rangeValue}%</strong>, en ligne avec les exigences de
            sobriété foncière.
          </span>
          <br />
          <span className="fr-text--sm fr-text-mention--grey fr-mb-0">Source des données : Fichiers fonciers</span>
        </>
      </CallOut>
    </div>
  )
}

const useStyles = tss.create({
  badgeIcon: {
    '&::before': {
      '--icon-size': '12px',
    },
  },
})
