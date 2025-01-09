import { fr } from '@codegouvfr/react-dsfr'
import { AuthenticatedBreadcrumb } from '~/components/breadcrumbs/authenticated-breadcrumb'

export default async function AuthenticatedLayout({ children }: { children: React.ReactNode }) {
  // const session = await auth()

  // if (!session || session.error === 'RefreshTokenError') {
  //   redirect('/accueil')
  // }

  return (
    <main>
      <AuthenticatedBreadcrumb />
      <div className={fr.cx('fr-p-md-4w', 'fr-my-4w')} style={{ backgroundColor: fr.colors.decisions.background.default.grey.default }}>
        {children}
      </div>
    </main>
  )
}
