'use client'

import { fr } from '@codegouvfr/react-dsfr'
import { usePathname } from 'next/navigation'
import { AdminBreadcrumb } from '~/components/admin/admin-breadcrumb'
import { FaqBreadcrumb } from '~/components/faq/faq-breadcrumb'
import { CreateSimulationBreadcrumb } from '~/components/simulations/breadcrumbs/create-simulation-breadcrumb'
import { UpdateSimulationBreadcrumb } from '~/components/simulations/breadcrumbs/modify-simulation-breadcrumb'

type BreadcrumbPaths = 'admin' | 'guide' | 'simulation' | 'modifier'

export const AuthenticatedBreadcrumb = () => {
  const pathname = usePathname()
  const breadcrumbComponents: Record<BreadcrumbPaths, JSX.Element | null> = {
    admin: <AdminBreadcrumb />,
    guide: <FaqBreadcrumb />,
    simulation: <CreateSimulationBreadcrumb />,
    modifier: <UpdateSimulationBreadcrumb />,
  }

  const excludedPatterns = ['/resultats']

  const shouldExclude = excludedPatterns.some((pattern) => pathname?.includes(pattern))

  if (shouldExclude) {
    return null
  }

  const matchingPath = Object.keys(breadcrumbComponents).filter((path) => pathname?.includes(path)) as BreadcrumbPaths[]
  const lastPath = matchingPath[matchingPath.length - 1]

  return matchingPath ? <div className={fr.cx('fr-container')}>{breadcrumbComponents[lastPath]}</div> : null
}
