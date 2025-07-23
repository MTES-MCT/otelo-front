import { Metadata } from 'next'
import { LoginForm } from '~/components/auth/login-form'

export const metadata: Metadata = {
  title: 'Connexion',
  description: 'Connexion à Otelo.',
}

export default function PageConnexion() {
  return (
    <div className="fr-container">
      <div className="fr-py-md-6w">
        <LoginForm />
      </div>
    </div>
  )
}
