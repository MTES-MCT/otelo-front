import { formatNumber } from '~/utils/format-numbers'
import styles from './simulation-needs-summary.module.css'
import Tile from '@codegouvfr/react-dsfr/Tile'

type SimulationNeedsSummaryProps = {
  badQuality: number
  projection: number
  total: number
  totalFlux: number
  totalStock: number
  vacancy: number
}

export const SimulationNeedsSummary = ({ badQuality, projection, total, totalFlux, totalStock, vacancy }: SimulationNeedsSummaryProps) => {
  return (
    <div className={styles.container}>
      <div className={styles.gridContainer}>
        <h5>Synthèse à projection de l&apos;année {projection}</h5>
        <div className={styles.cardContainer}>
          <div className={styles.cardWrapper}>
            <Tile
              classes={{ root: styles.root }}
              desc="Le besoin total correspond à la somme des besoins en flux et en stock."
              start={<h4>Besoin total</h4>}
              title={<span style={{ cursor: 'default' }}>{formatNumber(total)}</span>}
            />
          </div>
          <div className={styles.cardWrapper}>
            <Tile
              classes={{ root: styles.root }}
              start={<h4>Besoin en flux</h4>}
              desc="La demande potentielle en logements, correspondant au besoin en flux total."
              title={<span style={{ cursor: 'default' }}>{formatNumber(totalFlux)}</span>}
            />
          </div>
          <div className={styles.cardWrapper}>
            <Tile
              classes={{ root: styles.root }}
              start={<h4>Besoin en stock</h4>}
              desc="La demande potentielle en logements, correspondant au besoin en stock total."
              title={<span style={{ cursor: 'default' }}>{formatNumber(totalStock)}</span>}
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
              title={<span style={{ cursor: 'default' }}>{formatNumber(Math.abs(vacancy))}</span>}
            />
          </div>
          <div className={styles.cardWrapper}>
            <Tile
              classes={{ root: styles.root }}
              desc="Ce besoin est calculé en fonction de la demande de logements à rénover."
              disabled
              start={<h4>Logements à rénover</h4>}
              title={<span style={{ cursor: 'default' }}>{formatNumber(badQuality)}</span>}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
