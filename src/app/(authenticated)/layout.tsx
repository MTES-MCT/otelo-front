import { Signout } from '~/app/(authenticated)/signout'
import { UserTypeSelectionModal } from '~/components/auth/user-type-selection-modal'
import { ImpersonationBanner } from '~/components/impersonation-banner'

export default function AuthenticatedLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Signout />
      <ImpersonationBanner />
      <div className="fr-py-md-5w fr-py-2w" style={{ flex: 1 }}>
        {children}
        <UserTypeSelectionModal />
      </div>
    </>
  )
}
