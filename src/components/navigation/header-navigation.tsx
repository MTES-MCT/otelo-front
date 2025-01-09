'use client'

import { FC } from 'react'
import { MainNavigation, MainNavigationProps } from '@codegouvfr/react-dsfr/MainNavigation'
import { usePathname } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { tss } from 'tss-react'
import { useSimulations } from '~/hooks/use-simulations'
import { TSession } from '~/types/next-auth'
import dayjs from 'dayjs'

export const HeaderNavigation: FC = () => {
  const pathname = usePathname()
  const { data: session } = useSession() as { data: TSession | null }
  const { classes } = useStyles()
  const { data } = useSimulations()

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
            className: session ? classes.margin : undefined,
            megaMenu: {
              categories:
                data && data.length > 0
                  ? [
                      {
                        categoryMainLink: {
                          linkProps: {
                            href: '#',
                          },
                          text: 'Historique des simulations',
                        },
                        links: (data || []).map((simulation) => ({
                          linkProps: {
                            href: `/simulation/${simulation.id}/resultats`,
                          },
                          text: `Simulation - ${dayjs(simulation.createdAt).format('DD/MM/YYYY')}`,
                        })),
                      },
                    ]
                  : [],
              leader: {
                link: {
                  linkProps: {
                    href: '/simulation',
                  },
                  text: 'Démarrer une nouvelle simulation',
                },
                paragraph: 'À travers ce menu, vous pouvez accéder à vos simulations précédentes et retrouver leurs résultats.',
                title: 'Mes simulations',
              },
            },
            text: 'Mes simulations',
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
