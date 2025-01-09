'use client'

import { Tag } from '@codegouvfr/react-dsfr/Tag'
import { useQueryState } from 'nuqs'
import { FC } from 'react'
import { tss } from 'tss-react'
import { useSearchParams } from 'next/navigation'
import { fr } from '@codegouvfr/react-dsfr'
import { getOmphaleLabel } from '~/utils/omphale-label'

interface CreationGuideTagProps {
  step: {
    data?: string
    disabled?: boolean
    label: string
    path: string
    queryKey: string
  }
}

export const CreationGuideTag: FC<CreationGuideTagProps> = ({ step }) => {
  const { data, disabled = false, label, path, queryKey } = step
  const [value] = useQueryState(queryKey)
  const { classes } = useStyles({ disabled, value })
  const searchParams = useSearchParams()
  const newSearchParams = new URLSearchParams(searchParams.toString())
  const href = `${path}${newSearchParams.toString() ? `?${newSearchParams.toString()}` : ''}`

  let formattedValue = value && Number(value) < 1 ? (Number(value) * 100).toFixed(2) : value

  if (data) {
    formattedValue = data
  }
  if (queryKey === 'omphale') {
    formattedValue = getOmphaleLabel(value)
  }
  const defaultTagProps = {
    value: formattedValue,
  }

  const tagProps = value
    ? {
        iconId: 'fr-icon-checkbox-circle-line' as const,
        ...defaultTagProps,
        linkProps: {
          href,
        },
      }
    : defaultTagProps

  return (
    <Tag iconId="fr-icon-question-line" className={classes.tag} {...tagProps}>
      {formattedValue ?? label}
    </Tag>
  )
}

const useStyles = tss.withParams<{ disabled: boolean; value: string | null }>().create(({ disabled, value }) => {
  let backgroundColor = undefined
  let hoverBackgroundColor = undefined
  let color = undefined

  if (!value) {
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
