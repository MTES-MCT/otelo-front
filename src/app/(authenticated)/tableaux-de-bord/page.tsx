import { fr } from '@codegouvfr/react-dsfr'
import Button from '@codegouvfr/react-dsfr/Button'
import type { Metadata } from 'next'
import { DashboardSimulationItem } from '~/components/tableau-de-bord/dashboard-simulation-item'
import { getDashboardList } from '~/server-only/simulation/get-dashboard-list'
import { NoResults } from './no-results'

export const metadata: Metadata = {
  title: 'Tableau de bord Otelo',
}

export default async function TableauDeBordPage() {
  const dashboardGroups = await getDashboardList()

  if (dashboardGroups.length === 0) {
    return <NoResults />
  }

  return (
    <div className={fr.cx('fr-container')}>
      <h1>Tableau de bord</h1>
      <div className={fr.cx('fr-grid-row', 'fr-grid-row--gutters')}>
        {dashboardGroups.map((group) => {
          return (
            <div key={group.id} className={fr.cx('fr-col-12', 'fr-col-md-6', 'fr-mb-3w')}>
              <div className="fr-border fr-border-radius--8 fr-p-2w">
                <div className="fr-flex fr-justify-content-space-between">
                  <h2 className="fr-mb-0 fr-h4">{group.name}</h2>
                  <Button linkProps={{ href: `/dashboard/${group.id}` }} size="small">
                    Télécharger une présentation des scénarios
                  </Button>
                </div>
                <div className="fr-my-2w fr-flex fr-direction-column fr-flex-gap-4v">
                  {group.simulations.map((simulation) => (
                    <DashboardSimulationItem key={simulation.id} simulation={simulation} />
                  ))}
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
