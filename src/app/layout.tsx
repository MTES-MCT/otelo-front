import { headerFooterDisplayItem } from '@codegouvfr/react-dsfr/Display'
import type { Metadata } from 'next'
import { DsfrHead } from '@codegouvfr/react-dsfr/next-appdir/DsfrHead'
import { DsfrProvider } from '@codegouvfr/react-dsfr/next-appdir/DsfrProvider'
import { getHtmlAttributes } from '@codegouvfr/react-dsfr/next-appdir/getHtmlAttributes'
import Link from 'next/link'
import { StartDsfr, defaultColorScheme } from '~/app/start-dsfr'
import { NextAppDirEmotionCacheProvider } from 'tss-react/next'
import { Footer } from '@codegouvfr/react-dsfr/Footer'
import { TanstackQueryClientProvider } from '~/providers/tanstack-client'
import classes from './layout.module.css'
import { NuqsAdapter } from 'nuqs/adapters/next/app'
import { NextAuthProvider } from '~/providers/next-auth'
import { auth } from '~/lib/auth/auth'
import { Toaster } from 'sonner'
import { HeaderComponent } from '~/components/header'

export const metadata: Metadata = {
  description: 'Otelo - Votre assistant pour la transition écologique - v4.0',
  title: 'Otelo',
}

export default async function RootLayout({ children }: { children: JSX.Element }) {
  const lang = 'fr'
  const session = await auth()

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
                      accessibility="fully compliant"
                      homeLinkProps={{
                        href: '/',
                        title: 'Accueil - Otelo',
                      }}
                      bottomItems={[headerFooterDisplayItem]}
                      brandTop="République Française"
                      style={{ height: '245px', maxHeight: '245px' }}
                    />
                    <Toaster />
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
