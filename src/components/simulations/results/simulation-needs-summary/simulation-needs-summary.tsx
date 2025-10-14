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
      <h5 className="fr-mb-0">
        {epci ? (
          <span className="fr-mb-0 fr-text--underline">
            Synthèse : {epci.name} - 2021-{projection}
          </span>
        ) : (
          <span className="fr-mb-0 fr-text--underline">Synthèse : 2021-{projection}</span>
        )}
      </h5>

      <span className="fr-h5 fr-mb-0">Besoins en logements supplémentaires</span>
      {!!epci && epci.peakYear < projection && postpeakTotalStock && (
        <Alert
          description={
            <>
              <p>
                Une fois la croissance démographique stabilisée en <span className="fr-text--bold">{epci.peakYear}</span>, le territoire n’a
                plus besoin de construire davantage, mais doit encore agir pour améliorer les conditions de logement des ménages les plus
                fragiles.
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
      {!!epci && (
        <Alert
          description={
            <>
              <p>
                Les besoins en logements supplémentaires peuvent être couverts à la fois par la construction neuve et par une meilleure
                utilisation du parc existant, en particulier grâce à la remise sur le marché de logements vacants.
              </p>
              <p>Ci-dessous la décomposition représentant le paramétrage choisi dans le scénario :</p>
            </>
          }
          small
          severity="info"
        />
      )}
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
                ? `Il y a une résorption de ${Math.abs(vacancy)} logements vacants d'ici ${epci ? epci.peakYear : projection}.`
                : `Il y a ${vacancy < 0 ? formatNumber(Math.abs(vacancy)) : 0} logement vacant à remobiliser d'ici ${epci ? epci.peakYear : projection}.`
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
