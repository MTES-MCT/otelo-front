import { fr } from '@codegouvfr/react-dsfr'
import { Button } from '@codegouvfr/react-dsfr/Button'
import classNames from 'classnames'
import { SignInButton } from '~/components/sign-in-button'
import { auth } from '~/lib/auth/auth'
import styles from './section-hero.module.css'

export const SectionHero = async () => {
  const session = await auth()

  const ctaComponent = session ? (
    <Button
      linkProps={{
        href: '/simulation/choix-du-territoire',
      }}
    >
      Démarrer une simulation
    </Button>
  ) : (
    <SignInButton />
  )

  return (
    <section className={classNames(fr.cx('fr-container', 'fr-py-20v'), styles.heroSection)}>
      <div className={fr.cx('fr-grid-row', 'fr-grid-row-xl--gutters')}>
        <div className={classNames(fr.cx('fr-col-12', 'fr-col-md-8'), styles.heroContent)}>
          <h1 className={styles.title}>Otelo, estimez finement les besoins en logement de votre territoire</h1>
          <p className={styles.description}>
            Construisez les <strong>scénarios de besoins en logements adaptés à vos documents d'urbanisme</strong> grâce à notre
            méthodologie de référence, aux millions de données territoriales analysées automatiquement, à nos guides sur les enjeux de mal
            logement, sobriété foncière et vacance immobilière.
          </p>
          <div className={fr.spacing('10w')}>{ctaComponent}</div>
          <p className={fr.cx('fr-info-text', 'fr-py-4v')}>
            Connexion requise uniquement pour estimer les besoins en logement d'un territoire — Accès libre à toutes les autres
            fonctionnalités.
          </p>
        </div>
        <div className={classNames(fr.cx('fr-col-12', 'fr-col-md-4', 'fr-text--bold'), styles.heroSide)}>
          <p>
            Une petite révolution <br />
            créée par :
          </p>
          <div className={styles.placeholder}>Placeholder</div>
        </div>
      </div>
    </section>
  )
}
