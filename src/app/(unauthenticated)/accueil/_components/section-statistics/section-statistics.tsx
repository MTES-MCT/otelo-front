import { fr } from '@codegouvfr/react-dsfr'
import classNames from 'classnames'
import Link from 'next/link'
import { FC } from 'react'
import styles from './section-statistics.module.css'

export const SectionStatistics: FC = () => {
  return (
    <section className={classNames(fr.cx('fr-py-16v'), styles.statisticsSection)}>
      <div className={fr.cx('fr-container')}>
        <h2 className={styles.statisticsTitle}>Une solution qui fait ses preuves</h2>

        <div className={fr.cx('fr-grid-row', 'fr-grid-row--gutters')}>
          <div className={fr.cx('fr-col-12', 'fr-col-md-4')}>
            <div className={styles.statItem}>
              <div className={styles.statValue}>15</div>
              <p className={styles.statDescription}>
                <strong>documents d'urbanisme influencés</strong> depuis le 1er janvier 2025
              </p>
              <p className={styles.statDescription}>(compteur par l'équipe d'après enquête quantitative auprès des utilisateurs formés)</p>
            </div>
          </div>

          <div className={fr.cx('fr-col-12', 'fr-col-md-4')}>
            <div className={styles.statItem}>
              <div className={styles.statValue}>14 600</div>
              <p className={styles.statDescription}>
                situations de <strong>mal logement résorbées</strong> (territoires concernés ayant fait le choix d'un scénario ambitieux)
              </p>
            </div>
          </div>

          <div className={fr.cx('fr-col-12', 'fr-col-md-4')}>
            <div className={styles.statItem}>
              <div className={styles.statValue}>100%</div>
              <p className={styles.statDescription}>de taux de fiabilité des données</p>
            </div>
          </div>
        </div>

        <div className={styles.linkContainer}>
          <Link href="#" className={fr.cx('fr-link')}>
            Voir plus de statistiques
          </Link>
        </div>
      </div>
    </section>
  )
}
