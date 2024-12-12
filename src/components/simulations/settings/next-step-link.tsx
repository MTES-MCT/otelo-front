'use client'

import Button from '@codegouvfr/react-dsfr/Button'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { useQueryState } from 'nuqs'
import { FC } from 'react'

type NextStepLinkProps = {
  href: string
  label?: string
  query: string
}

export const NextStepLink: FC<NextStepLinkProps> = ({ href, label = 'Étape suivante', query }) => {
  const [value] = useQueryState(query)
  const searchParams = useSearchParams()
  const searchParamsString = new URLSearchParams(searchParams).toString()
  const hrefWithParams = `${href}${searchParamsString ? `?${searchParamsString}` : ''}`

  return (
    <Link href={hrefWithParams}>
      <Button disabled={!value}>{label}</Button>
    </Link>
  )
}
