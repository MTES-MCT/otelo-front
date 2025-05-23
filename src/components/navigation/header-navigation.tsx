'use client'

import { MainNavigation, MainNavigationProps } from '@codegouvfr/react-dsfr/MainNavigation'
import { useSession } from 'next-auth/react'
import { usePathname } from 'next/navigation'
import { FC } from 'react'
import { TSession } from '~/types/next-auth'

export const HeaderNavigation: FC = () => {
  const pathname = usePathname()
  const { data: session } = useSession() as { data: TSession | null }

  const items: MainNavigationProps.Item[] = [
    {
      isActive: pathname === '/accueil',
      linkProps: { href: '/accueil', target: '_self' },
      text: 'Accueil',
    },
    {
      isActive: pathname === '/methodologie',
      linkProps: { href: '/methodologie', target: '_self' },
      text: 'Méthodologie',
    },
    {
      isActive: pathname === '/ressources',
      linkProps: { href: '/ressources', target: '_self' },
      text: 'Ressources',
    },
    {
      isActive: pathname === '/retours-d-experience',
      linkProps: { href: '/retours-d-experience', target: '_self' },
      text: 'Retours',
    },
    {
      isActive: pathname === '/statistiques',
      linkProps: { href: '/statistiques', target: '_self' },
      text: 'Statistiques',
    },
    {
      isActive: pathname === '/a-propos',
      linkProps: { href: '/a-propos', target: '_self' },
      text: 'A propos',
    },
    {
      isActive: pathname === '/aide',
      linkProps: { href: '/aide', target: '_self' },
      text: 'Aide',
    },
    ...(session
      ? [
          {
            isActive: pathname === '/mes-simulations',
            linkProps: { href: '/mes-simulations', target: '_self' },
            text: 'Mes simulations',
          },
          {
            linkProps: { href: '/visualiser-les-donnees', target: '_self' },
            text: 'Visualiser les données',
          },
          {
            isActive: pathname.includes('/guide-utilisateur'),
            linkProps: { href: '/guide-utilisateur', target: '_self' },
            text: "Guide d'utilisation",
          },
          ...(session.user.role === 'ADMIN'
            ? [
                {
                  isActive: pathname.includes('/admin'),
                  linkProps: { href: '/admin', target: '_self' },
                  text: 'Gestion des utilisateurs',
                },
              ]
            : []),
        ]
      : []),
  ]

  return <MainNavigation items={items} />
}
