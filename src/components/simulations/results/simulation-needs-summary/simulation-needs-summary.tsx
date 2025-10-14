import Alert from '@codegouvfr/react-dsfr/Alert'
import Button from '@codegouvfr/react-dsfr/Button'
import Tile from '@codegouvfr/react-dsfr/Tile'
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
  epci?: {
    name: string
    peakYear: number
    prepeakTotalStock: number
    postpeakTotalStock: number
  }
}

export const SimulationNeedsSummary = ({ projection, id, results, epci }: SimulationNeedsSummaryProps) => {
  const { total, totalFlux, totalStock, vacancy } = results
  const { prepeakTotalStock, postpeakTotalStock } = epci ?? {}

  return (
    <div className={styles.gridContainer}>
      <h5 className="fr-mb-0">Synthèse à projection de l&apos;année {projection}</h5>

      <span className="fr-h5 fr-mb-0">Besoins en logements supplémentaires</span>
      {!!epci && epci.peakYear < projection && postpeakTotalStock && (
        <Alert
          description={
            <>
              <p>
                L'EPCI de {epci.name} a des besoins en constructions neuves jusqu'en <span className="fr-text--bold">{epci.peakYear}</span>.
              </p>
              Sur la période {epci.peakYear + 1} à {projection}, il restera{' '}
              <span className="fr-text--bold">{formatNumber(postpeakTotalStock)}</span> logements à trouver pour résorber le mal-logement.
            </>
          }
          small
          severity="info"
        />
      )}
      <div className={styles.cardContainer}>
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
        <div className={styles.cardWrapper}>
          <Tile
            classes={{ root: styles.root, content: styles.contentSpaceBetween }}
            start={<h4>Besoins liés aux situations de mal logement</h4>}
            title={
              <span className="fr-h2" style={{ cursor: 'default' }}>
                {!!epci && prepeakTotalStock ? formatNumber(prepeakTotalStock) : formatNumber(totalStock)}
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
      <span className="fr-h5 fr-mb-0">Comment y répondre ?</span>
      <div className={styles.vacancyContainer}>
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
        <div className={styles.cardWrapper}>
          <Tile
            classes={{ root: styles.root }}
            desc={
              vacancy < 0
                ? `Il y a une résorption de ${Math.abs(vacancy)} logements vacants d'ici ${projection}.`
                : `Il y a ${vacancy < 0 ? formatNumber(Math.abs(vacancy)) : 0} logement vacant à remobiliser d'ici ${projection}.`
            }
            start={<h4>Logements vacants {vacancy < 0 ? 'résorbés' : `à remobiliser`}</h4>}
            title={
              <span className="fr-h2" style={{ cursor: 'default' }}>
                {vacancy < 0 ? formatNumber(Math.abs(vacancy)) : 0}
              </span>
            }
          />
        </div>
        {/* <div className={styles.cardWrapper}>
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
        </div> */}
      </div>
    </div>
  )
}
