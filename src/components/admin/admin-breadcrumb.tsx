'use client'

import Breadcrumb from '@codegouvfr/react-dsfr/Breadcrumb'

export const AdminBreadcrumb = () => {
  return (
    <Breadcrumb
      currentPageLabel="Gestion des utilisateurs"
      homeLinkProps={{
        href: '/admin',
      }}
      segments={[]}
    />
  )
}
