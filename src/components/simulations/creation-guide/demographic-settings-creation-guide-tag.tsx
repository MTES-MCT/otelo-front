'use client'

import { RiIconClassName, fr } from '@codegouvfr/react-dsfr'
import { Tag } from '@codegouvfr/react-dsfr/Tag'
import { useSearchParams } from 'next/navigation'
import { parseAsString, useQueryState } from 'nuqs'
import { FC } from 'react'
import { tss } from 'tss-react'
import { useEpcisRates } from '~/app/(authenticated)/simulation/(creation)/(rates-provider)/rates-provider'

interface CreationGuideTagProps {
  step: {
    data?: string | Array<string>
    disabled?: boolean
    iconId?: string
    path: string
    queryKeys: Array<string>
  }
}

export const DemographicSettingsGuideTag: FC<CreationGuideTagProps> = ({ step }) => {
  const { data, disabled = false, path, queryKeys, iconId = 'fr-icon-checkbox-circle-line' } = step
  const [value] = useQueryState(queryKeys[0])
  const [baseEpci] = useQueryState('baseEpci', parseAsString)
  const { rates } = useEpcisRates()
  const { classes } = useStyles({ disabled, value, queryKeys })
  const searchParams = useSearchParams()
  const newSearchParams = new URLSearchParams(searchParams.toString())
  const href = `${path}${newSearchParams.toString() ? `?${newSearchParams.toString()}` : ''}`

  // Handle horizon de temps display
  if (path === '/simulation/cadrage-temporel' && value) {
    return (
      <Tag className={classes.tag} iconId="ri-time-line" linkProps={{ href }}>
        2021 - {value}
      </Tag>
    )
  }

  if (queryKeys.includes('omphale')) {
    if (value) {
      const scenario = value.split('_')[0]
      const decohabitation = value.split('_')[1]

      let formattedScenario = ''
      let formattedDecohabitation = ''

      if (scenario === 'Central') {
        formattedScenario = 'centrale'
      }
      if (scenario === 'PB') {
        formattedScenario = 'basse'
      }
      if (scenario === 'PH') {
        formattedScenario = 'haute'
      }
      if (decohabitation === 'H') {
        formattedDecohabitation = 'haute'
      }
      if (decohabitation === 'B') {
        formattedDecohabitation = 'basse'
      }
      if (decohabitation === 'C') {
        formattedDecohabitation = 'tendanciel'
      }

      return (
        <>
          <Tag className={classes.tag} iconId="ri-group-line" linkProps={{ href }}>
            Population: {formattedScenario}
          </Tag>
          <Tag className={classes.tag} iconId="ri-home-4-line" linkProps={{ href }}>
            Ménages: {formattedDecohabitation}
          </Tag>
        </>
      )
    }
  }

  // Handle rates display for taux-cibles-logements step
  if (path === '/simulation/taux-cibles-logements') {
    if (baseEpci) {
      const epciRates = rates[baseEpci]

      if (epciRates) {
        const longTermVacancyPercent = (epciRates.longTermVacancyRate * 100).toFixed(2)
        const secondaryResidencePercent = (epciRates.txRS * 100).toFixed(2)

        return (
          <>
            <Tag className={classes.tag} iconId="ri-home-4-line" linkProps={{ href }}>
              Taux cible logements vacants: {longTermVacancyPercent}%
            </Tag>
            <Tag className={classes.tag} iconId="ri-home-line" linkProps={{ href }}>
              Taux cible résidences secondaires: {secondaryResidencePercent}%
            </Tag>
          </>
        )
      }
    }
  }

  // Handle rates display for taux-restructuration-disparition step
  if (path === '/simulation/taux-restructuration-disparition') {
    if (baseEpci) {
      const epciRates = rates[baseEpci]

      if (epciRates) {
        const restructuringPercent = (epciRates.restructuringRate * 100).toFixed(2)
        const disappearancePercent = (epciRates.disappearanceRate * 100).toFixed(2)

        return (
          <>
            <Tag className={classes.tag} iconId="ri-link" linkProps={{ href }}>
              Restructuration: {restructuringPercent}%
            </Tag>
            <Tag className={classes.tag} iconId="ri-link-unlink" linkProps={{ href }}>
              Disparition: {disappearancePercent}%
            </Tag>
          </>
        )
      }
    }
  }

  let formattedValue = value && Number(value) < 1 ? (Number(value) * 100).toFixed(2) : value
  if (data && typeof data === 'string') {
    formattedValue = data
  }

  const defaultTagProps = {
    value: formattedValue,
  }

  const tagProps = {
    iconId: iconId as RiIconClassName,
    ...defaultTagProps,
    linkProps: {
      href,
    },
  }

  // EPCIS
  if (data && Array.isArray(data)) {
    return data.map((item) => (
      <Tag key={item} iconId="ri-map-pin-2-line" className={classes.tag} linkProps={{ href }}>
        {item}
      </Tag>
    ))
  }
  if (!data && !!formattedValue) {
    return (
      <Tag className={classes.tag} {...tagProps}>
        {formattedValue}
      </Tag>
    )
  }
}

const useStyles = tss
  .withParams<{ disabled: boolean; value: string | null; queryKeys: string[] }>()
  .create(({ disabled, value, queryKeys }) => {
    let backgroundColor = undefined
    let hoverBackgroundColor = undefined
    let color = undefined

    if (!value && queryKeys.length === 1) {
      backgroundColor = `${fr.colors.decisions.background.contrast.grey.default} !important`
      hoverBackgroundColor = `${fr.colors.decisions.background.contrast.grey.hover} !important`
      color = `${fr.colors.decisions.text.default.grey.default} !important`
    }

    if (disabled) {
      backgroundColor = `${fr.colors.decisions.background.disabled.grey.default} !important`
      hoverBackgroundColor = undefined
      color = `${fr.colors.decisions.text.disabled.grey.default} !important`
    }

    return {
      tag: {
        '&:hover': {
          backgroundColor: hoverBackgroundColor,
        },
        backgroundColor,
        color,
        cursor: disabled ? 'not-allowed' : undefined,
      },
    }
  })
