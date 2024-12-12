import styles from './simulation-needs-summary.module.css'
import Tile from '@codegouvfr/react-dsfr/Tile'

type SimulationNeedsSummaryProps = {
  projection: number
  total: number
  totalFlux: number
  totalStock: number
}

export const SimulationNeedsSummary = ({ projection, total, totalFlux }: SimulationNeedsSummaryProps) => {
  return (
    <div className={styles.container}>
      <h5>Synthèse à projection de l&apos;année {projection}</h5>
      <div className={styles.cardContainer}>
        <div className={styles.cardWrapper}>
          <Tile
            classes={{ root: styles.root }}
            desc="Le besoin total correspond à la somme des besoins en flux et en stock."
            start={<h4>Besoin total</h4>}
            title={<h2 style={{ cursor: 'default' }}>{total}</h2>}
          />
        </div>
        <div className={styles.cardWrapper}>
          <Tile
            classes={{ root: styles.root }}
            start={<h4>Besoin en flux</h4>}
            desc="La demande potentielle en logements, correspondant au besoin en flux total."
            title={<h2 style={{ cursor: 'default' }}>{totalFlux}</h2>}
          />
        </div>
        <div className={styles.cardWrapper}>
          <Tile
            classes={{ root: styles.root }}
            grey
            start={<h4>Besoin en stock</h4>}
            desc="La demande potentielle en logements, correspondant au besoin en stock total."
            title={<h2 style={{ cursor: 'default' }}>A venir</h2>}
          />
        </div>
      </div>
    </div>
  )
}
