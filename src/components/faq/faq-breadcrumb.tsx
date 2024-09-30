'use client'

import { Breadcrumb } from '@codegouvfr/react-dsfr/Breadcrumb'
import { usePathname } from 'next/navigation'

export const FaqBreadcrumb = () => {
  const pathname = usePathname()

  const getSegments = () => {
    const segments = pathname.split('/').filter((segment) => !!segment)
    return segments.map((segment, index) => ({
      label: segment.replace(/-/g, ' ').replace(/^\w/, (c) => c.toUpperCase()),
      linkProps: {
        href: `/guide-utilisateur/${segments.slice(0, index + 1).join('/')}`,
      },
    }))
  }

  const getCurrentPageLabel = () => {
    switch (pathname) {
      case '/guide-utilisateur/choix-du-parcours/aide':
        return 'Comment choisir son parcours ?'
      case '/guide-utilisateur/choix-du-parcours/bassins':
        return "Les bassins d'habitat"
      case '/guide-utilisateur/choix-du-parcours/epci':
        return 'Les EPCI'
      case '/guide-utilisateur/parcours-bassins':
        return "Comment établir le besoin en logement à l'échelle du Bassin d'Habitat ?"
      case '/guide-utilisateur/parcours-epci':
        return "Comment établir le besoin en logement à l'échelle de l'EPCI ?"
      case '/guide-utilisateur/projection/otelo':
        return 'Les projection des ménages fournies par Otelo'
      case '/guide-utilisateur/projection/scenarios':
        return 'Les scénarios démographiques'
    }
  }

  const segments = getSegments()

  return (
    <>
      {segments.length > 0 && (
        <Breadcrumb
          currentPageLabel={getCurrentPageLabel()}
          homeLinkProps={{
            href: '/guide-utilisateur',
          }}
          segments={segments}
        />
      )}
    </>
  )
}
