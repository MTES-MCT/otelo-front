import { fr } from '@codegouvfr/react-dsfr'
import classNames from 'classnames'
import styles from './statistiques.module.css'

export default function StatistiquesPage() {
  return (
    <>
      <section className={fr.cx('fr-container', 'fr-mb-8v')}>
        <h1>Statistiques</h1>

        <div className={fr.cx('fr-grid-row', 'fr-grid-row--gutters')}>
          <div className={classNames(fr.cx('fr-col-12', 'fr-col-md-8'), styles.section1)}>
            <div className={classNames(styles.cardStat)}>
              <h6 className={fr.cx('fr-mb-2v')}>Départements utilisant Otelo</h6>

              <div className={classNames(fr.cx('fr-card--shadow'), styles.cardStatContent)}>YO</div>
            </div>
          </div>
          <div className={classNames(fr.cx('fr-col-12', 'fr-col-md-4'), styles.cardStatContainer)}>
            <StatCard title="Statistique 1" stat="100 000" metric="notices ajoutées" />
            <StatCard title="Statistique 2" stat="1201" metric="notices modifiées" />
            <StatCard title="Statistique 3" stat="1" metric="notice supprimée" />
          </div>
        </div>
      </section>
      <div className={fr.cx('fr-container')}>
        <div className={fr.cx('fr-grid-row', 'fr-grid-row--gutters')}>
          <div className={fr.cx('fr-col-12', 'fr-col-md-6')}>
            <StatCard title="Nombre de producteur actif" stat="10" metric="producteurs ont contribué" />
          </div>
          <div className={fr.cx('fr-col-12', 'fr-col-md-6')}>
            <StatCard title="Nombre d'illustrations ajoutées" stat="10" metric="illustrations ajoutées" />
          </div>
        </div>
      </div>
    </>
  )
}

type StatCardProps = {
  title: string
  stat: string
  metric: string
}

const StatCard = ({ title, stat, metric }: StatCardProps) => {
  return (
    <div className={classNames(styles.cardStat)}>
      <h6 className={fr.cx('fr-mb-2v')}>{title}</h6>
      <div className={classNames(fr.cx('fr-card--shadow'), styles.cardStatContent)}>
        <strong className={styles.stat}>{stat}</strong>
        <span className={styles.metric}>{metric}</span>
      </div>
    </div>
  )
}
