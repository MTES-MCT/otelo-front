import { fr } from '@codegouvfr/react-dsfr'

import { UnauthenticatedBreadcrumb } from '~/components/breadcrumbs/unauthenticated-breadcrumb'

export default function UnauthenticatedLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <UnauthenticatedBreadcrumb />
      <div style={{ backgroundColor: fr.colors.decisions.background.default.grey.default }}>{children}</div>
    </div>
  )
}
