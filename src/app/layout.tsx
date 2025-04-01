import { headerFooterDisplayItem } from '@codegouvfr/react-dsfr/Display'
import { Footer, FooterProps } from '@codegouvfr/react-dsfr/Footer'
import { DsfrHead } from '@codegouvfr/react-dsfr/next-appdir/DsfrHead'
import { DsfrProvider } from '@codegouvfr/react-dsfr/next-appdir/DsfrProvider'
import { getHtmlAttributes } from '@codegouvfr/react-dsfr/next-appdir/getHtmlAttributes'
import type { Metadata } from 'next'
import Link from 'next/link'
import { NuqsAdapter } from 'nuqs/adapters/next/app'
import { Toaster } from 'sonner'
import { NextAppDirEmotionCacheProvider } from 'tss-react/next'
import { StartDsfr, defaultColorScheme } from '~/app/start-dsfr'
import { HeaderComponent } from '~/components/header'
import { auth } from '~/lib/auth/auth'
import { NextAuthProvider } from '~/providers/next-auth'
import { TanstackQueryClientProvider } from '~/providers/tanstack-client'
import classes from './layout.module.css'

export const metadata: Metadata = {
  description: 'Otelo - Votre assistant pour la transition écologique - v4.0',
  title: 'Otelo',
}

export default async function RootLayout({ children }: { children: JSX.Element }) {
  const lang = 'fr'
  const session = await auth()

  const linkList: NonNullable<FooterProps['linkList']> = [
    {
      links: [
        {
          linkProps: {
            href: '/accueil',
          },
          text: 'Accueil',
        },
        {
          linkProps: {
            href: '/ressources',
          },
          text: 'Ressources',
        },
        {
          linkProps: {
            href: '/en-savoir-plus',
          },
          text: 'En savoir plus',
        },
        {
          linkProps: {
            href: '/contact',
          },
          text: 'Nous contacter',
        },
      ],
    },
  ]

  return (
    <html {...getHtmlAttributes({ defaultColorScheme, lang })}>
      <head>
        <StartDsfr />
        <DsfrHead Link={Link} preloadFonts={['Marianne-Regular', 'Marianne-Medium', 'Marianne-Bold']} />
      </head>
      <body>
        <div className={classes.container}>
          <NextAppDirEmotionCacheProvider options={{ key: 'css' }}>
            <DsfrProvider lang={lang}>
              <TanstackQueryClientProvider>
                <NuqsAdapter>
                  <NextAuthProvider session={session}>
                    <HeaderComponent />
                    <div className={classes.main}>{children}</div>
                    <Footer
                      accessibility="partially compliant"
                      homeLinkProps={{
                        href: '/',
                        title: 'Accueil - Otelo',
                      }}
                      linkList={linkList}
                      bottomItems={[headerFooterDisplayItem]}
                      brandTop="République Française"
                    />
                    <Toaster
                      toastOptions={{
                        style: {
                          paddingBottom: '1rem',
                        },
                      }}
                    />
                  </NextAuthProvider>
                </NuqsAdapter>
              </TanstackQueryClientProvider>
            </DsfrProvider>
          </NextAppDirEmotionCacheProvider>
        </div>
      </body>
    </html>
  )
}
