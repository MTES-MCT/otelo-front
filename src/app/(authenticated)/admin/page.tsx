import { UsersTableHeader } from '~/components/admin/users/users-table-header'
import { UsersTable } from '~/components/admin/users/users-table'
import { TSession } from '~/types/next-auth'
import { redirect } from 'next/navigation'
import { auth } from '~/lib/auth/auth'

export default async function AdminPage() {
  const session = (await auth()) as TSession

  if (session.user.role !== 'ADMIN') {
    redirect('/accueil')
  }

  return (
    <>
      <h1>Gestion des utilisateurs</h1>
      <UsersTableHeader />
      <UsersTable />
    </>
  )
}
