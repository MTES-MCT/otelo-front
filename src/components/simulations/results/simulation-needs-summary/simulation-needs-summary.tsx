import Alert from '@codegouvfr/react-dsfr/Alert'
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
    secondaryAccommodation: number
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
  const { total, totalFlux, totalStock, vacancy, secondaryAccommodation } = results
  const { prepeakTotalStock, postpeakTotalStock } = epci ?? {}
  const hasNewHousingNeeds = total > 0
  return (
    <div className={styles.gridContainer}>
      <h5 className="fr-mb-0">
        {epci ? (
          <span className="fr-mb-0 fr-text--underline">
            Synthèse des besoins en logements : {epci.name} - 2021-{projection}
          </span>
        ) : (
          <span className="fr-mb-0 fr-text--underline">Synthèse des besoins en logements : 2021-{projection}</span>
        )}
      </h5>

      {hasNewHousingNeeds && <span className="fr-h5 fr-mb-0">Les besoins en constructions neuves :</span>}
      {!!epci && epci.peakYear < projection && postpeakTotalStock && (
        <Alert
          description={
            <>
              {epci.peakYear === 2021 ? (
                <p>
                  Dans le scenario démographique choisi, le territoire atteint son pic de ménages dès{' '}
                  <span className="fr-text--bold">{epci.peakYear}</span> : il n’y a donc plus de besoins en logements supplémentaires liés à
                  la démographie ou à l’évolution du parc. Les besoins restant concernent la résorption des situations de mal-logement, qui
                  implique de produire (construction neuve ou transformation du parc existant) des logements spécifiquement pour les ménages
                  concernés.
                </p>
              ) : (
                <p>
                  Une fois la croissance démographique stabilisée en <span className="fr-text--bold">{epci.peakYear}</span>, le territoire
                  n’a plus besoin de construire davantage, mais doit encore agir pour améliorer les conditions de logement des ménages les
                  plus fragiles.
                </p>
              )}
              Sur la période {epci.peakYear + 1} à {projection}, il restera{' '}
              <span className="fr-text--bold">{formatNumber(postpeakTotalStock)}</span> logements à trouver pour résorber le mal-logement.
            </>
          }
          small
          severity="info"
        />
      )}
      <div className={styles.cardContainer}>
        {hasNewHousingNeeds && (
          <>
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
          </>
        )}
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
      {hasNewHousingNeeds && (
        <>
          <span className="fr-h5 fr-mb-0">La mobilisation du parc existant :</span>
          {!!epci && (
            <Alert
              description={
                <>
                  <p>
                    Au-delà de la construction neuve, le territoire peut répondre à une partie de ses besoins en mobilisant le parc existant
                    : remise sur le marché de logements vacants ou de résidences secondaires. Le volume mobilisable dépend directement des
                    taux cibles de vacance de longue durée et de résidences secondaires que vous avez définis dans le scénario :
                  </p>
                </>
              }
              small
              severity="info"
            />
          )}
          <div className={styles.vacancyContainer}>
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
            <div className={styles.cardWrapper}>
              <Tile
                classes={{ root: styles.root }}
                desc={
                  secondaryAccommodation < 0
                    ? `Il y a une résorption de ${Math.abs(secondaryAccommodation)} résidence secondaires d'ici ${epci ? epci.peakYear : projection}.`
                    : `Il y a ${secondaryAccommodation < 0 ? formatNumber(Math.abs(secondaryAccommodation)) : 0} résidences secondaires à remobiliser d'ici ${epci ? epci.peakYear : projection}.`
                }
                start={<h4>Résidences secondaires {secondaryAccommodation < 0 ? 'résorbés' : `à remobiliser`}</h4>}
                title={
                  <span className="fr-h2" style={{ cursor: 'default' }}>
                    {secondaryAccommodation < 0 ? formatNumber(Math.abs(secondaryAccommodation)) : 0}
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
        </>
      )}
    </div>
  )
}
