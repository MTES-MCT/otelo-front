'use client'

import Button from '@codegouvfr/react-dsfr/Button'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { useQueryState } from 'nuqs'
import { FC } from 'react'

type NextStepLinkProps = {
  defaultValue?: string
  href: string
  label?: string
  query: string
  isDisabled?: boolean
  priority?: 'secondary' | 'primary' | 'tertiary' | 'tertiary no outline' | undefined
}

export const NextStepLinkWithoutValidation: FC<Pick<NextStepLinkProps, 'href' | 'label' | 'priority'>> = ({ href, label = 'Suivant' }) => {
  const searchParams = useSearchParams()
  const searchParamsString = new URLSearchParams(searchParams).toString()
  const hrefWithParams = `${href}${searchParamsString ? `?${searchParamsString}` : ''}`
  return (
    <Button linkProps={{ href: hrefWithParams }} size="large" iconId="ri-arrow-right-line" iconPosition="right">
      {label}
    </Button>
  )
}

export const NextStepLink: FC<NextStepLinkProps> = ({ defaultValue, href, label = 'Suivant', query, isDisabled }) => {
  const [value] = useQueryState(query, {
    defaultValue: defaultValue ?? '',
  })
  const searchParams = useSearchParams()
  const searchParamsString = new URLSearchParams(searchParams).toString()
  const hrefWithParams = `${href}${searchParamsString ? `?${searchParamsString}` : ''}`

  const disabled = isDisabled || !value

  return (
    <Link href={hrefWithParams}>
      <Button disabled={disabled} size="large" iconId="ri-arrow-right-line" iconPosition="right">
        {label}
      </Button>
    </Link>
  )
}
