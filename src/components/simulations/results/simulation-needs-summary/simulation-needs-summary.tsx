import styles from './simulation-needs-summary.module.css'
import Tile from '@codegouvfr/react-dsfr/Tile'

type SimulationNeedsSummaryProps = {
  projection: number
  total: number
  totalFlux: number
  totalStock: number
}

export const SimulationNeedsSummary = ({ projection, total, totalFlux, totalStock }: SimulationNeedsSummaryProps) => {
  return (
    <div className={styles.container}>
      <h5>Synthèse à projection de l&apos;année {projection}</h5>
      <div className={styles.cardContainer}>
        <div className={styles.cardWrapper}>
          <Tile
            classes={{ root: styles.root }}
            desc="Le besoin total correspond à la somme des besoins en flux et en stock."
            start={<h4>Besoin total</h4>}
            title={<span style={{ cursor: 'default' }}>{total}</span>}
          />
        </div>
        <div className={styles.cardWrapper}>
          <Tile
            classes={{ root: styles.root }}
            start={<h4>Besoin en flux</h4>}
            desc="La demande potentielle en logements, correspondant au besoin en flux total."
            title={<span style={{ cursor: 'default' }}>{totalFlux}</span>}
          />
        </div>
        <div className={styles.cardWrapper}>
          <Tile
            classes={{ root: styles.root }}
            start={<h4>Besoin en stock</h4>}
            desc="La demande potentielle en logements, correspondant au besoin en stock total."
            title={<span style={{ cursor: 'default' }}>{totalStock}</span>}
          />
        </div>
        <div className={styles.cardWrapper}>
          <Tile
            classes={{ root: styles.root }}
            desc={`Il y a 10 logements vacants à remobiliser d'ici ${projection}.`}
            start={<h4>Logements vacants à remobiliser</h4>}
            title={<span style={{ cursor: 'default' }}>{10}</span>}
          />
        </div>
        <div className={styles.cardWrapper}>
          <Tile
            classes={{ root: styles.root }}
            desc={`Le besoin en logement neuf à produire à l'année ${projection}.`}
            start={<h4>Production de logement neuf</h4>}
            title={<span style={{ cursor: 'default' }}>{total}</span>}
          />
        </div>
        <div className={styles.cardWrapper}>
          <Tile
            classes={{ root: styles.rootDisabled }}
            desc="Ce besoin est calculé en fonction de la demande de logements à rénover."
            disabled
            start={<h4>Logements à rénover</h4>}
            title={<span style={{ cursor: 'default' }}>0</span>}
          />
        </div>
      </div>
    </div>
  )
}
