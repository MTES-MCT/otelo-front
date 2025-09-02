'use client'

import { fr } from '@codegouvfr/react-dsfr'
import { Tag } from '@codegouvfr/react-dsfr/Tag'
import { usePathname, useSearchParams } from 'next/navigation'
import { useQueryState } from 'nuqs'
import { FC } from 'react'
import { tss } from 'tss-react'
import { getOmphaleLabel } from '~/utils/omphale-label'

interface CreationGuideTagProps {
  step: {
    data?: string | Array<string>
    disabled?: boolean
    label: string
    path: string
    queryKeys: Array<string>
  }
}

export const DemographicSettingsCreationGuideTag: FC<CreationGuideTagProps> = ({ step }) => {
  const { data, disabled = false, label, path, queryKeys } = step
  const [value] = useQueryState(queryKeys[0])
  const pathname = usePathname()

  // Simulate value for steps with empty queryKeys based on path conditions
  const shouldSimulateValue =
    (queryKeys.length === 0 && pathname === path) ||
    (label === 'Taux de résidences secondaires / logements vacants' &&
      ['/simulation/taux-restructuration-disparition', '/simulation/validation-parametrage'].includes(pathname)) ||
    (label === 'Taux de restructuration et taux de disparition' && pathname === '/simulation/validation-parametrage')
  // console.log('should', step.label, shouldSimulateValue, value)

  const effectiveValue = shouldSimulateValue ? step.label : value

  const { classes } = useStyles({ disabled, value: effectiveValue, queryKeys })
  const searchParams = useSearchParams()
  const newSearchParams = new URLSearchParams(searchParams.toString())
  const href = `${path}${newSearchParams.toString() ? `?${newSearchParams.toString()}` : ''}`

  let formattedValue = effectiveValue && Number(effectiveValue) < 1 ? (Number(effectiveValue) * 100).toFixed(2) : effectiveValue

  if (data && typeof data === 'string') {
    formattedValue = data
  }

  if (queryKeys.includes('omphale')) {
    formattedValue = getOmphaleLabel(effectiveValue)
  }
  const defaultTagProps = {
    value: formattedValue,
  }

  const tagProps = effectiveValue
    ? {
        iconId: 'fr-icon-checkbox-circle-line' as const,
        ...defaultTagProps,
        linkProps: {
          href,
        },
      }
    : defaultTagProps

  if (data && Array.isArray(data)) {
    return data.map((item) => (
      <Tag key={item} iconId="fr-icon-checkbox-circle-line" className={classes.tag} linkProps={{ href }}>
        {item}
      </Tag>
    ))
  }
  return (
    <Tag iconId="fr-icon-question-line" className={classes.tag} {...tagProps}>
      {formattedValue ?? label}
    </Tag>
  )
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
