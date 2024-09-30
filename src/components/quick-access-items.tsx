'use client'

import Button from '@codegouvfr/react-dsfr/Button'
import { signOut, useSession } from 'next-auth/react'
import Link from 'next/link'
import { FC, useEffect } from 'react'
import { SignInButton } from '~/components/sign-in-button'

export const QuickAccessItems: FC = () => {
  const { data: session } = useSession()

  const handleSignOut = async () => {
    await signOut({ callbackUrl: '/accueil', redirect: true })
  }

  useEffect(() => {
    if (session?.error === 'RefreshTokenError') {
      handleSignOut()
    }
  }, [session])

  if (session) {
    return [
      <Link key="access-app" href="/simulation/choix-du-territoire">
        <Button iconId="fr-icon-arrow-right-line">Démarrer une simulation</Button>
      </Link>,
      <Button key="logout" iconId="fr-icon-logout-box-r-line" priority="tertiary" onClick={handleSignOut}>
        Se déconnecter
      </Button>,
    ]
  }

  return [<SignInButton key="sign-in-button" />]
}
