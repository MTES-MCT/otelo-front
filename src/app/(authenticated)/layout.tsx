import { fr } from '@codegouvfr/react-dsfr'
import { Signout } from '~/app/(authenticated)/signout'
import { UserTypeSelectionModal } from '~/components/auth/user-type-selection-modal'
import { AuthenticatedBreadcrumb } from '~/components/breadcrumbs/authenticated-breadcrumb'

export default function AuthenticatedLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Signout />
      <AuthenticatedBreadcrumb />
      <div
        className={fr.cx('fr-p-md-4w', 'fr-py-2w')}
        style={{ backgroundColor: fr.colors.decisions.background.default.grey.default, flex: 1 }}
      >
        {children}
        <UserTypeSelectionModal />
      </div>
    </>
  )
}
