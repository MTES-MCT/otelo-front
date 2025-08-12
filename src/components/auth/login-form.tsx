'use client'

import { Button } from '@codegouvfr/react-dsfr/Button'
import { Input } from '@codegouvfr/react-dsfr/Input'
import { ProConnectButton } from '@codegouvfr/react-dsfr/ProConnectButton'
import { zodResolver } from '@hookform/resolvers/zod'
import { signIn } from 'next-auth/react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { FC, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { RedAsterisk } from '~/components/ui/red-asterisk'
import { proConnectProviderId } from '~/lib/auth/providers/pro-connect'

const loginSchema = z.object({
  email: z.string().email('Adresse email invalide'),
  password: z.string().min(8, 'Le mot de passe doit contenir au moins 8 caractères'),
})

type LoginFormData = z.infer<typeof loginSchema>

export const LoginForm: FC = () => {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [authError, setAuthError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  })

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true)
    setAuthError(null)
    try {
      const result = await signIn('credentials', {
        email: data.email,
        password: data.password,
        redirect: false,
        callbackUrl: '/accueil',
      })
      if (result?.error) {
        setAuthError('Email ou mot de passe incorrect.')
        return
      }
      if (result?.ok && result.url) {
        router.push(result.url)
        return
      }
      // Fallback: navigate to home if URL is missing but no error
      router.push('/accueil')
    } catch (error) {
      console.error('Error signing in', error)
      setAuthError('Une erreur est survenue. Veuillez réessayer.')
    } finally {
      setIsLoading(false)
    }
  }

  const onProConnectSignIn = async () => {
    try {
      await signIn(proConnectProviderId, {
        callbackUrl: '/accueil',
      })
    } catch (error) {
      console.error('Error signing in with ProConnect', error)
    }
  }

  return (
    <div className="fr-container">
      <div className="fr-flex fr-justify-content-space-between fr-direction-column fr-direction-md-row">
        <div>
          <h1 className="fr-h3 fr-mb-3w">Connexion avec votre adresse email</h1>
          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <Input
              label={
                <div className="fr-flex fr-direction-row fr-align-items-center fr-flex-gap-2v">
                  Adresse email
                  <RedAsterisk />
                </div>
              }
              state={errors.email ? 'error' : 'default'}
              stateRelatedMessage={errors.email?.message}
              nativeInputProps={{
                ...register('email'),
                type: 'email',
                autoComplete: 'email',
                placeholder: 'nom@domaine.fr',
              }}
            />

            <Input
              label={
                <div className="fr-flex fr-direction-row fr-align-items-center fr-flex-gap-2v">
                  Mot de passe
                  <RedAsterisk />
                </div>
              }
              state={errors.password ? 'error' : 'default'}
              stateRelatedMessage={errors.password?.message}
              nativeInputProps={{
                ...register('password'),
                type: 'password',
                autoComplete: 'current-password',
              }}
            />

            {authError && (
              <div className="fr-alert fr-alert--error fr-mb-3w" role="alert">
                <p className="fr-alert__title">Échec de la connexion</p>
                <p>{authError}</p>
              </div>
            )}
            <div className="fr-flex fr-justify-content-space-between fr-align-items-center">
              <div className="fr-flex fr-direction-column fr-direction-sm-row fr-align-items-center fr-flex-gap-2v">
                <p className="fr-mb-0">Première visite ?</p>
                <Link className="fr-link" href="/inscription">
                  Créer un compte
                </Link>
              </div>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? 'Connexion en cours...' : 'Se connecter'}
              </Button>
            </div>
          </form>
        </div>
        <div style={{ borderLeft: '1px solid var(--border-default-grey)' }}></div>
        <div className="fr-px-4w">
          <h2 className="fr-h3 fr-mb-3w">Connexion avec ProConnect</h2>
          <p className="fr-text--sm fr-mb-3w">Connectez-vous facilement avec votre compte ProConnect</p>
          <ProConnectButton onClick={onProConnectSignIn} />
        </div>
      </div>
    </div>
  )
}
