import { fr } from '@codegouvfr/react-dsfr'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { AuthenticatedBreadcrumb } from '~/components/breadcrumbs/authenticated-breadcrumb'
import { authOptions } from '~/lib/auth/auth.config'

export default async function AuthenticatedLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions)

  if (!session || session.error === 'RefreshTokenError') {
    redirect('/accueil')
  }

  return (
    <>
      <AuthenticatedBreadcrumb />
      <div
        className={fr.cx('fr-p-md-4w', 'fr-py-2w')}
        style={{ backgroundColor: fr.colors.decisions.background.default.grey.default, flex: 1 }}
      >
        {children}
      </div>
    </>
  )
}
