'use client'

import { usePathname } from 'next/navigation'
import { ContactBreadcrumb } from '~/components/contact/contact-breadcrumb'

type BreadcrumbPaths = 'contact'

export const UnauthenticatedBreadcrumb = () => {
  const pathname = usePathname()

  const breadcrumbComponents: Record<BreadcrumbPaths, JSX.Element> = {
    contact: <ContactBreadcrumb />,
  }

  // Check if the pathname matches any of our breadcrumb paths
  const matchingPath = Object.keys(breadcrumbComponents).find((path) => pathname?.includes(path)) as BreadcrumbPaths | undefined

  return matchingPath ? breadcrumbComponents[matchingPath] : null
}
