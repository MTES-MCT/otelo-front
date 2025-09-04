import Button from '@codegouvfr/react-dsfr/Button'
import Tile from '@codegouvfr/react-dsfr/Tile'
import classNames from 'classnames'
import { formatNumber } from '~/utils/format-numbers'
import styles from './simulation-needs-summary.module.css'

type SimulationNeedsSummaryProps = {
  projection: number
  id: string
  results: {
    badQuality: number
    total: number
    totalFlux: number
    totalStock: number
    vacancy: number
  }
}

export const SimulationNeedsSummary = ({ projection, id, results }: SimulationNeedsSummaryProps) => {
  const { badQuality, total, totalFlux, totalStock, vacancy } = results
  return (
    <div className={styles.container}>
      <div className={styles.gridContainer}>
        <h5>Synthèse à projection de l&apos;année {projection}</h5>
        <div className={styles.cardContainer}>
          <div className={styles.cardWrapper}>
            <Tile
              classes={{ root: styles.root, content: styles.contentCenter }}
              start={<h4>Besoin en constructions neuves</h4>}
              title={
                <span className="fr-h2" style={{ cursor: 'default' }}>
                  {formatNumber(total)}
                </span>
              }
            />
          </div>
          <span className={classNames(styles.symbol, 'fr-h2')}>=</span>
          <div className={styles.cardWrapper}>
            <Tile
              classes={{ root: styles.root, content: styles.contentSpaceBetween }}
              start={<h4>Besoins liés à la démographie et à l'évolution du parc</h4>}
              title={
                <span className="fr-h2" style={{ cursor: 'default' }}>
                  {formatNumber(totalFlux)}
                </span>
              }
              detail={
                <Button priority="secondary" linkProps={{ href: `/simulation/${id}/modifier/cadrage-temporel` }}>
                  Modifier mes hypothèses
                </Button>
              }
            />
          </div>
          <span className={classNames(styles.symbol, 'fr-h2')}>+</span>
          <div className={styles.cardWrapper}>
            <Tile
              classes={{ root: styles.root, content: styles.contentSpaceBetween }}
              start={<h4>Besoins liés aux situations de mal logement</h4>}
              title={
                <span className="fr-h2" style={{ cursor: 'default' }}>
                  {formatNumber(totalStock)}
                </span>
              }
              detail={
                <Button priority="secondary" linkProps={{ href: `/simulation/${id}/modifier/mal-logement/horizon-de-resorption` }}>
                  Affiner le mal-logement
                </Button>
              }
            />
          </div>
        </div>
        <div className={styles.vacancyContainer}>
          <div className={styles.cardWrapper}>
            <Tile
              classes={{ root: styles.root }}
              desc={
                vacancy < 0
                  ? `Il y a une résorption de ${Math.abs(vacancy)} logements vacants d'ici ${projection}.`
                  : `Il y a ${vacancy} logements vacants à remobiliser d'ici ${projection}.`
              }
              start={<h4>Logements vacants {vacancy < 0 ? 'résorbés' : 'à remobiliser'}</h4>}
              title={
                <span className="fr-h2" style={{ cursor: 'default' }}>
                  {vacancy < 0 ? formatNumber(Math.abs(vacancy)) : 0}
                </span>
              }
            />
          </div>
          <div className={styles.cardWrapper}>
            <Tile
              classes={{ root: styles.root }}
              desc="Ce besoin est calculé en fonction de la demande de logements à rénover."
              disabled
              start={<h4>Logements à rénover</h4>}
              title={
                <span className="fr-h2" style={{ cursor: 'default' }}>
                  {formatNumber(badQuality)}
                </span>
              }
            />
          </div>
        </div>
      </div>
    </div>
  )
}
