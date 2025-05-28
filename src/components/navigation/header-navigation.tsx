'use client'

import { MainNavigation, MainNavigationProps } from '@codegouvfr/react-dsfr/MainNavigation'
import { useSession } from 'next-auth/react'
import { usePathname } from 'next/navigation'
import { FC } from 'react'
import { tss } from 'tss-react'
import { TSession } from '~/types/next-auth'

export const HeaderNavigation: FC = () => {
  const pathname = usePathname()
  const { data: session } = useSession() as { data: TSession | null }
  const { classes } = useStyles()

  const items: MainNavigationProps.Item[] = [
    {
      isActive: pathname === '/accueil',
      linkProps: { href: '/accueil', target: '_self' },
      text: 'Accueil',
    },
    {
      isActive: pathname === '/en-savoir-plus',
      linkProps: { href: '/en-savoir-plus', target: '_self' },
      text: 'En savoir plus sur Otelo',
    },
    {
      isActive: pathname === '/ressources',
      linkProps: { href: '/ressources', target: '_self' },
      text: 'Ressources sur Otelo',
    },
    {
      isActive: pathname === '/contact',
      linkProps: { href: '/contact', target: '_self' },
      text: 'Nous contacter',
    },
    ...(session
      ? [
          {
            className: classes.margin,
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

const useStyles = tss.create({
  margin: {
    marginLeft: 'auto',
  },
})
