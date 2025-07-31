import { fr } from '@codegouvfr/react-dsfr'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { authOptions } from '~/lib/auth/auth.config'
import { TSession } from '~/types/next-auth'

export default async function StatistiquesPage() {
  const session = (await getServerSession(authOptions)) as TSession

  if (session.user.role !== 'ADMIN') {
    redirect('/accueil')
  }

  return (
    <div className={fr.cx('fr-container', 'fr-py-10v')}>
      <h1>Statistiques</h1>
      <p>Page de statistiques en cours de développement</p>
    </div>
  )
}