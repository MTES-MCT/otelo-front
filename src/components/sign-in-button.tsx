'use client'

import { Button } from '@codegouvfr/react-dsfr/Button'
import { signIn } from 'next-auth/react'
import { FC } from 'react'

export const SignInButton: FC = () => {
  const onSignIn = async () => {
    try {
      await signIn('cerema-oidc')
    } catch (error) {
      console.error('Error signing in', error)
    }
  }

  return (
    <Button iconId="fr-icon-account-fill" onClick={onSignIn}>
      S&apos;inscrire ou se connecter
    </Button>
  )
}
