'use client'

import { SideMenu } from '@codegouvfr/react-dsfr/SideMenu'
import { usePathname, useSearchParams } from 'next/navigation'

export const FaqSideMenu = () => {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const currentActiveStep = searchParams.get('etape')

  const items = [
    {
      isActive: pathname === '/guide-utilisateur',
      linkProps: {
        href: '/guide-utilisateur',
      },
      text: 'Accueil',
    },
    {
      isActive: pathname.includes('/guide-utilisateur/choix-du-parcours'),
      items: [
        {
          isActive: pathname === '/guide-utilisateur/choix-du-parcours/aide',
          linkProps: {
            href: '/guide-utilisateur/choix-du-parcours/aide',
          },
          text: 'Comment choisir son parcours ?',
        },
        {
          isActive: pathname === '/guide-utilisateur/choix-du-parcours/bassins',
          linkProps: {
            href: '/guide-utilisateur/choix-du-parcours/bassins',
          },
          text: "Les bassins d'habitat",
        },
        {
          isActive: pathname === '/guide-utilisateur/choix-du-parcours/epci',
          linkProps: {
            href: '/guide-utilisateur/choix-du-parcours/epci',
          },
          text: 'Les EPCI',
        },
      ],
      text: 'Choix du parcours',
    },
    {
      isActive: pathname === '/guide-utilisateur/parcours-bassins',
      items: [
        {
          isActive: pathname === '/guide-utilisateur/parcours-bassins',
          items: [
            {
              isActive: pathname === '/guide-utilisateur/parcours-bassins' && currentActiveStep === '1',
              linkProps: {
                href: '/guide-utilisateur/parcours-bassins?etape=1',
              },
              text: 'Étape 1 - Sélection du territoire',
            },
            {
              isActive: pathname === '/guide-utilisateur/parcours-bassins' && currentActiveStep === '2',
              linkProps: {
                href: '/guide-utilisateur/parcours-bassins?etape=2',
              },
              text: "Étape 2 - Paramétrage du Bassin d'Habitat",
            },
            {
              isActive: pathname === '/guide-utilisateur/parcours-bassins' && currentActiveStep === '3',
              linkProps: {
                href: '/guide-utilisateur/parcours-bassins?etape=3',
              },
              text: "Étape 3 - Analyse des résultats par bassin d'habitat",
            },
          ],
          text: "Comment établir le besoin en logement à l'échelle du Bassin d'Habitat ?",
        },
      ],
      text: "Parcours Bassin d'habitat",
    },
    {
      isActive: pathname.includes('/guide-utilisateur/parcours-epci'),
      items: [
        {
          isActive: true,
          items: [
            {
              linkProps: {
                href: '#',
              },
              text: 'Étape 1 - Sélection du territoire',
            },
            {
              isActive: true,
              linkProps: {
                href: '#',
              },
              text: "Étape 2a - Paramétrage du Bassin d'Habitat",
            },
            {
              linkProps: {
                href: '#',
              },
              text: 'Étape 2b - Paramétrage spécifique par EPCI',
            },
            {
              linkProps: {
                href: '#',
              },
              text: 'Étape 3 - Analyse des résultats par EPCI',
            },
          ],
          text: "Comment établir le besoin en logement à l'échelle de l'EPCI ?",
        },
      ],
      text: 'Parcours EPCI',
    },
    {
      items: [
        {
          linkProps: {
            href: '/guide-utilisateur/projection/otelo',
          },
          text: 'Les projection des ménages fournies par Otelo',
        },
        {
          linkProps: {
            href: '/guide-utilisateur/projection/scenarios',
          },
          text: 'Les scénarios démographiques',
        },
      ],
      text: 'Projection des ménages',
    },
  ]
  return <SideMenu items={items} burgerMenuButtonText="Menu" />
}
