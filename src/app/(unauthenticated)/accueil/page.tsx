import { Button } from '@codegouvfr/react-dsfr/Button'
import { Tile } from '@codegouvfr/react-dsfr/Tile'
import { SignInButton } from '~/components/sign-in-button'
import { auth } from '~/lib/auth/auth'
import styles from './accueil.module.css'
import heroImage from '@assets/img/home-background.png'
import Image from 'next/image'
import { fr } from '@codegouvfr/react-dsfr'

export default async function AccueilPage() {
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
    <>
      <section>
        <div className={styles.heroSection}>
          <div className={styles.heroImageContainer}>
            <Image src={heroImage} className={styles.heroImage} priority alt="hero-image" />
            <div className={styles.heroGradient} />
          </div>
          <div className={fr.cx('fr-container')} style={{ minHeight: '30rem' }}>
            <div className={styles.heroContent}>
              <h1 className={styles.heroTitle}>
                Otelo, votre allié pour une stratégie habitat réussie. <br />
                Anticipez et optimisez vos besoins en logements
              </h1>
              <p className={`fr-text--bold ${styles.heroText}`}>
                Otelo vous guide pas à pas pour calculer les besoins en logements et en stock de votre territoire en prenant en compte vos
                contraintes, problématiques et vos objectifs.
              </p>
              <div className={styles.heroButtonContainer}>{ctaComponent}</div>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.featureSection}>
        <div className={`fr-container ${styles.featureContent}`}>
          <div>
            <h1 className={styles.featureNumber}>01</h1>
            <h2>Une estimation rigoureuse et accessible</h2>
            <p>
              Otelo suit une méthodologie d&apos;estimation des besoins en logement élaborée par Direction Générale de l&apos;Aménagement,
              du Logement et de la Nature du ministère de la transition écologique (DGALN), en partenariat avec le Cerema.
            </p>
          </div>
        </div>
        <div className={`fr-container ${styles.featureGrid}`}>
          <Tile
            classes={{ start: styles.start, title: styles.title }}
            start="01"
            orientation="vertical"
            title="Choississez l'échelle géographique sur laquelle vous travaillez"
            titleAs="h3"
          />
          <Tile
            classes={{ root: styles.tile, start: styles.start, title: styles.title }}
            start="02"
            orientation="vertical"
            title="Définissez les problématiques de votre territoire"
            titleAs="h3"
          />
          <Tile
            classes={{ root: styles.tile, start: styles.start, title: styles.title }}
            start="03"
            orientation="vertical"
            title="Mobilisez une base de données nationale riche"
            titleAs="h3"
          />
          <Tile
            classes={{ root: styles.tile, start: styles.start, title: styles.title }}
            start="04"
            orientation="vertical"
            title="Option: enrichissez l'analyse avec vos jeux de données"
            titleAs="h3"
          />
          <Tile
            classes={{ root: styles.tile, start: styles.start, title: styles.title }}
            start="05"
            orientation="vertical"
            title="Affinez les paramètres pour s'adapter à vos enjeux territoriaux"
            titleAs="h3"
          />
          <Tile
            classes={{ root: styles.tile, start: styles.start, title: styles.title }}
            start="06"
            orientation="vertical"
            title="Comparez les scénarios de construction de logement neufs"
            titleAs="h3"
          />
        </div>
      </section>

      <section className={styles.accessSection}>
        <div className={`fr-container fr-my-10v ${styles.accessContent}`}>
          <div>
            <h1 className={styles.featureNumber}>02</h1>
            <h2>Demandez votre accès à l&apos;application</h2>
            <p>
              Les ayants droit sont les collectivités locales, les services déconcentrés de l&apos;Etat et les organismes publics et
              parapublics (agences d&apos;urbanisme, établissements publics fonciers, bailleurs sociaux, etc.). Les bureaux d&apos;études
              peuvent y accéder dans le cadre d&apos;une mission nécessitant une estimation des besoins en logements d&apos;un ayant-droit.
            </p>
          </div>
        </div>
        <div className={styles.accessButtonContainer}>
          <Button priority="secondary">Demander votre accès</Button>
        </div>
      </section>
    </>
  )
}
