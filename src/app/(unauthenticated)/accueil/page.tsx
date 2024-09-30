import { fr } from '@codegouvfr/react-dsfr'
import { Button } from '@codegouvfr/react-dsfr/Button'
import Link from 'next/link'
import { SignInButton } from '~/components/sign-in-button'
import CustomHighlight from '~/components/ui/custom-highlight'
import { auth } from '~/lib/auth/auth'

export default async function AccueilPage() {
  const session = await auth()

  const ctaComponent = session ? (
    <Link href="/simulation/choix-du-territoire">
      <Button>Démarrer une simulation</Button>
    </Link>
  ) : (
    <SignInButton />
  )

  return (
    <main>
      <section
        style={{
          backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url("/assets/img/home-background.jpg")',
          backgroundPosition: '0% 50%',
          backgroundSize: 'cover',
        }}
        className="fr-p-10v"
      >
        <div className="fr-container">
          <div className="fr-col-md-10">
            <h1 className="fr-my-8v" style={{ color: fr.colors.decisions.background.default.grey.default }}>
              Otelo, votre allié pour une stratégie habitat réussie. Anticipez et optimisez vos besoins en logements
            </h1>
            <p className="fr-text--bold" style={{ color: fr.colors.decisions.background.default.grey.default }}>
              Otelo vous guide pas à pas pour calculer les besoins en logements et en stock de votre territoire en prenant en compte vos
              contraintes, problématiques et vos objectifs.
            </p>
          </div>
          {ctaComponent}
        </div>
      </section>
      <div className={fr.cx('fr-container')}>
        <section className={fr.cx('fr-py-10v')}>
          <CustomHighlight>
            <h1>Faire une demande d&apos;accès à Otelo</h1>
            Les ayants-droit d&apos;Otelo sont :
            <ul>
              <li>
                les <strong>collectivités locales</strong>
              </li>
              <li>
                les <strong>services déconcentrés de l&apos;Etat</strong>
              </li>
              <li>
                les <strong>organismes publics et parapublics</strong> (agences d&apos;urbanisme, établissements publics fonciers, bailleurs
                sociaux, etc.)
              </li>
            </ul>
            Condition d&apos;accès des bureaux d&apos;études
            <br />
            <br />
            Les <strong>bureaux d&apos;études</strong> peuvent y accéder dans le cadre d&apos;une mission nécessitant une estimation des
            besoins en logements pour le compte d&apos;un ayant-droit. Dans ce cas, deux conditions :
            <ul>
              <li>l&apos;ayant-droit doit avoir effectué sa demande d&apos;accès</li>
              <li>
                l&apos;ayant-droit doit écrire à otelo@developpement-durable.gouv.fr, en indiquant dans le corps du mail la liste des
                personnes concernées au sein du bureau d&apos;études (nom + adresse mail) ainsi que l&apos;acte d&apos;engagement spécifique
                prévu à cet effet (cliquez ici pour le télécharger)
              </li>
            </ul>
          </CustomHighlight>
        </section>
      </div>
    </main>
  )
}
