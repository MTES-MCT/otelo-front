import { fr } from '@codegouvfr/react-dsfr'
import { headerFooterDisplayItem } from '@codegouvfr/react-dsfr/Display'
import { Footer } from '@codegouvfr/react-dsfr/Footer'
import { DsfrHead } from '@codegouvfr/react-dsfr/next-appdir/DsfrHead'
import { DsfrProvider } from '@codegouvfr/react-dsfr/next-appdir/DsfrProvider'
import { getHtmlAttributes } from '@codegouvfr/react-dsfr/next-appdir/getHtmlAttributes'
import type { Metadata } from 'next'
import { getServerSession } from 'next-auth'
import Link from 'next/link'
import { NuqsAdapter } from 'nuqs/adapters/next/app'
import { Toaster } from 'sonner'
import { NextAppDirEmotionCacheProvider } from 'tss-react/next'
import { defaultColorScheme } from '~/app/default-color-scheme'
import Matomo from '~/app/matomo'
import { StartDsfr } from '~/app/start-dsfr'
import { BrandTop } from '~/components/brand-top'
import { HeaderComponent } from '~/components/header'
import { authOptions } from '~/lib/auth/auth.config'
import { NextAuthProvider } from '~/providers/next-auth'
import { TanstackQueryClientProvider } from '~/providers/tanstack-client'
import classes from './layout.module.css'

export const metadata: Metadata = {
  description: 'Otelo - Votre assistant pour la transition écologique - v4.0',
  title: 'Otelo',
}

export default async function RootLayout({ children }: { children: JSX.Element }) {
  const lang = 'fr'
  const session = await getServerSession(authOptions)

  return (
    <html {...getHtmlAttributes({ defaultColorScheme, lang })}>
      <head>
        <StartDsfr />
        <DsfrHead Link={Link} preloadFonts={['Marianne-Regular', 'Marianne-Medium', 'Marianne-Bold']} />
        <Matomo />
      </head>
      <body>
        <div className={classes.container}>
          <NextAppDirEmotionCacheProvider options={{ key: 'css' }}>
            <DsfrProvider lang={lang}>
              <TanstackQueryClientProvider>
                <NuqsAdapter>
                  <NextAuthProvider session={session}>
                    <HeaderComponent />
                    <main className={classes.main}>{children}</main>
                    <Footer
                      accessibility="partially compliant"
                      brandTop={<BrandTop />}
                      homeLinkProps={{
                        href: '/',
                        title: 'Accueil - Otelo',
                      }}
                      termsLinkProps={{ href: '/mentions-legales' }}
                      bottomItems={[
                        headerFooterDisplayItem,
                        <Link className={fr.cx('fr-footer__bottom-link')} href="/donnees-personnelles">
                          Données personnelles
                        </Link>,
                        <Link className={fr.cx('fr-footer__bottom-link')} href="/cgv">
                          Conditions générales d’utilisation et Gestion des cookies
                        </Link>,
                      ]}
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
