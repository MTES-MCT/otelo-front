import { fr } from '@codegouvfr/react-dsfr'
import { UnauthenticatedBreadcrumb } from '~/components/breadcrumbs/unauthenticated-breadcrumb'

export default function UnauthenticatedLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ backgroundColor: fr.colors.decisions.background.default.grey.default }}>
      <div className={fr.cx('fr-py-6v')}>
        <UnauthenticatedBreadcrumb />
        {children}
      </div>
    </div>
  )
}
