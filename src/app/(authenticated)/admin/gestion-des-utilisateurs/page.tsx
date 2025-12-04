import { fr } from '@codegouvfr/react-dsfr'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { UsersTable } from '~/components/admin/users/users-table'
import { UsersTableHeader } from '~/components/admin/users/users-table-header'
import { authOptions } from '~/lib/auth/auth.config'
import { TSession } from '~/types/next-auth'

export default async function AdminPage() {
  const session = (await getServerSession(authOptions)) as TSession

  if (session.user.role !== 'ADMIN') {
    redirect('/tableaux-de-bord')
  }

  return (
    <div className={fr.cx('fr-container', 'fr-py-10v')}>
      <h1>Gestion des utilisateurs</h1>
      <UsersTableHeader />
      <UsersTable />
    </div>
  )
}
