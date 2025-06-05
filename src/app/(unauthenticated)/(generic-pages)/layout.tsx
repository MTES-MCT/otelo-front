import { fr } from '@codegouvfr/react-dsfr'
import Button from '@codegouvfr/react-dsfr/Button'
import CallOut from '@codegouvfr/react-dsfr/CallOut'
import classNames from 'classnames'
import styles from './layout.module.css'

export default function GenericPagesLayout({ children, summary }: { children: React.ReactNode; summary: React.ReactNode }) {
  return (
    <div className={fr.cx('fr-container')}>
      <div className={fr.cx('fr-grid-row', 'fr-grid-row--gutters')}>
        <div className={classNames(fr.cx('fr-col-12', 'fr-col-md-4'), styles.sideMenuContainer)}>
          {summary}

          <div className={classNames(styles.ctaContainer, styles.padRight)}>
            <Button priority="tertiary" className={styles.button}>
              S'inscrire à une formation Otelo
            </Button>
            <Button
              priority="tertiary"
              className={styles.button}
              linkProps={{ href: 'https://tally.so/r/3qe2z9', target: '_blank', rel: 'noopener noreferrer' }}
            >
              Testez vos connaissances
            </Button>
          </div>
          <div className={styles.padRight}>
            <CallOut>
              Contactez l’équipe Otelo à l’adresse : <a href="mailto:otelo@beta.gouv.fr">otelo@beta.gouv.fr</a>
            </CallOut>
          </div>
        </div>
        <div className={fr.cx('fr-col-12', 'fr-col-md-8')}>{children}</div>
      </div>
    </div>
  )
}
