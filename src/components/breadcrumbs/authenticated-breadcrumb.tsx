'use client'

import { fr } from '@codegouvfr/react-dsfr'
import { usePathname } from 'next/navigation'
import { AdminBreadcrumb } from '~/components/admin/admin-breadcrumb'
import { FaqBreadcrumb } from '~/components/faq/faq-breadcrumb'
import { CreateSimulationBreadcrumb } from '~/components/simulations/breadcrumbs/create-simulation-breadcrumb'
import { SimulationsBreadcrumb } from '~/components/simulations/breadcrumbs/simulations-breadcrumb'

type BreadcrumbPaths = 'admin' | 'guide-utilisateur' | 'resultats' | 'simulation'

export const AuthenticatedBreadcrumb = () => {
  const pathname = usePathname()

  const breadcrumbComponents: Record<BreadcrumbPaths, JSX.Element> = {
    admin: <AdminBreadcrumb />,
    'guide-utilisateur': <FaqBreadcrumb />,
    resultats: <SimulationsBreadcrumb />,
    simulation: <CreateSimulationBreadcrumb />,
  }

  // Check if the pathname matches any of our breadcrumb paths
  const matchingPath = Object.keys(breadcrumbComponents).find((path) => pathname?.includes(path)) as BreadcrumbPaths | undefined

  return matchingPath ? <div className={fr.cx('fr-container')}>{breadcrumbComponents[matchingPath]}</div> : null
}
