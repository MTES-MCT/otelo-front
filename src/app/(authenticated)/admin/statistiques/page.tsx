'use client'

import { fr } from '@codegouvfr/react-dsfr'
import { useStatistics } from '~/hooks/use-statistics'

export default function StatistiquesPage() {
  const { data: statistics, isLoading, error } = useStatistics()

  if (isLoading) {
    return (
      <div className={fr.cx('fr-container', 'fr-py-10v')}>
        <h1>Statistiques</h1>
        <p>Chargement des statistiques...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className={fr.cx('fr-container', 'fr-py-10v')}>
        <h1>Statistiques</h1>
        <div className={fr.cx('fr-alert', 'fr-alert--error')}>
          <p>Erreur lors du chargement des statistiques</p>
        </div>
      </div>
    )
  }

  return (
    <div className={fr.cx('fr-container', 'fr-py-10v')}>
      <h1>Statistiques</h1>
      
      <div className={fr.cx('fr-grid-row', 'fr-grid-row--gutters', 'fr-mt-5v')}>
        <div className={fr.cx('fr-col-12', 'fr-col-md-6', 'fr-col-lg-4')}>
          <div className={fr.cx('fr-card')}>
            <div className={fr.cx('fr-card__body')}>
              <div className={fr.cx('fr-card__content')}>
                <h3 className={fr.cx('fr-card__title')}>Scénarios créés</h3>
                <p className={fr.cx('fr-display--lg', 'fr-mb-0')}>
                  {statistics?.totalScenarios || 0}
                </p>
                <p className={fr.cx('fr-card__desc', 'fr-text--sm')}>
                  Nombre total de scénarios
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className={fr.cx('fr-col-12', 'fr-col-md-6', 'fr-col-lg-4')}>
          <div className={fr.cx('fr-card')}>
            <div className={fr.cx('fr-card__body')}>
              <div className={fr.cx('fr-card__content')}>
                <h3 className={fr.cx('fr-card__title')}>Moyenne par utilisateur</h3>
                <p className={fr.cx('fr-display--lg', 'fr-mb-0')}>
                  {statistics?.averageScenariosPerUser.toFixed(2) || 0}
                </p>
                <p className={fr.cx('fr-card__desc', 'fr-text--sm')}>
                  Scénarios par utilisateur
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className={fr.cx('fr-col-12', 'fr-col-md-6', 'fr-col-lg-4')}>
          <div className={fr.cx('fr-card')}>
            <div className={fr.cx('fr-card__body')}>
              <div className={fr.cx('fr-card__content')}>
                <h3 className={fr.cx('fr-card__title')}>EPCI actifs</h3>
                <p className={fr.cx('fr-display--lg', 'fr-mb-0')}>
                  {statistics?.activeEpcisCount || 0}
                </p>
                <p className={fr.cx('fr-card__desc', 'fr-text--sm')}>
                  EPCI avec scénarios (6 derniers mois)
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className={fr.cx('fr-col-12', 'fr-col-md-6', 'fr-col-lg-4')}>
          <div className={fr.cx('fr-card')}>
            <div className={fr.cx('fr-card__body')}>
              <div className={fr.cx('fr-card__content')}>
                <h3 className={fr.cx('fr-card__title')}>Utilisateurs actifs</h3>
                <p className={fr.cx('fr-display--lg', 'fr-mb-0')}>
                  {statistics?.usersWithExportedScenarios || 0}
                </p>
                <p className={fr.cx('fr-card__desc', 'fr-text--sm')}>
                  Utilisateurs ayant exporté au moins un scénario
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <h2 className={fr.cx('fr-mt-8v')}>Statistiques des scénarios exportés</h2>
      
      <div className={fr.cx('fr-grid-row', 'fr-grid-row--gutters', 'fr-mt-3v')}>
        <div className={fr.cx('fr-col-12', 'fr-col-md-6', 'fr-col-lg-4')}>
          <div className={fr.cx('fr-card')}>
            <div className={fr.cx('fr-card__body')}>
              <div className={fr.cx('fr-card__content')}>
                <h3 className={fr.cx('fr-card__title')}>Besoins en logements</h3>
                <p className={fr.cx('fr-display--lg', 'fr-mb-0')}>
                  {statistics?.totalHousingNeedsExported.toLocaleString('fr-FR') || 0}
                </p>
                <p className={fr.cx('fr-card__desc', 'fr-text--sm')}>
                  Volume total sur l'ensemble des scénarios exportés
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className={fr.cx('fr-col-12', 'fr-col-md-6', 'fr-col-lg-4')}>
          <div className={fr.cx('fr-card')}>
            <div className={fr.cx('fr-card__body')}>
              <div className={fr.cx('fr-card__content')}>
                <h3 className={fr.cx('fr-card__title')}>Lutte contre le mal-logement</h3>
                <p className={fr.cx('fr-display--lg', 'fr-mb-0')}>
                  {statistics?.totalPoorHousingCommitmentsExported.toLocaleString('fr-FR') || 0}
                </p>
                <p className={fr.cx('fr-card__desc', 'fr-text--sm')}>
                  Volume total d'engagement
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className={fr.cx('fr-col-12', 'fr-col-md-6', 'fr-col-lg-4')}>
          <div className={fr.cx('fr-card')}>
            <div className={fr.cx('fr-card__body')}>
              <div className={fr.cx('fr-card__content')}>
                <h3 className={fr.cx('fr-card__title')}>Logements vacants</h3>
                <p className={fr.cx('fr-display--lg', 'fr-mb-0')}>
                  {statistics?.totalVacantHousingRemobilizationExported.toLocaleString('fr-FR') || 0}
                </p>
                <p className={fr.cx('fr-card__desc', 'fr-text--sm')}>
                  Volume de remobilisation
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}