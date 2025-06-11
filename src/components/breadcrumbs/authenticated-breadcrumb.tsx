'use client'

import { fr } from '@codegouvfr/react-dsfr'
import { usePathname } from 'next/navigation'
import { AdminBreadcrumb } from '~/components/admin/admin-breadcrumb'
import { FaqBreadcrumb } from '~/components/faq/faq-breadcrumb'
import { CreateSimulationBreadcrumb } from '~/components/simulations/breadcrumbs/create-simulation-breadcrumb'
import { UpdateSimulationBreadcrumb } from '~/components/simulations/breadcrumbs/modify-simulation-breadcrumb'
import { SimulationsBreadcrumb } from '~/components/simulations/breadcrumbs/simulations-breadcrumb'

type BreadcrumbPaths = 'admin' | 'guide' | 'resultats' | 'simulation' | 'modifier'

export const AuthenticatedBreadcrumb = () => {
  const pathname = usePathname()
  const breadcrumbComponents: Record<BreadcrumbPaths, JSX.Element | null> = {
    admin: <AdminBreadcrumb />,
    guide: <FaqBreadcrumb />,
    simulation: <CreateSimulationBreadcrumb />,
    resultats: <SimulationsBreadcrumb />,
    modifier: <UpdateSimulationBreadcrumb />,
  }

  // Check if the pathname matches any of our breadcrumb paths
  const matchingPath = Object.keys(breadcrumbComponents).filter((path) => pathname?.includes(path)) as BreadcrumbPaths[]
  const lastPath = matchingPath[matchingPath.length - 1]

  return matchingPath ? <div className={fr.cx('fr-container')}>{breadcrumbComponents[lastPath]}</div> : null
}
