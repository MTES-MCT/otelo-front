import { fr } from '@codegouvfr/react-dsfr'
import Link from 'next/link'
import { DashboardSimulationItem } from '~/components/tableau-de-bord/dashboard-simulation-item'
import { getDashboardList } from '~/server-only/simulation/get-dashboard-list'
import { NoResults } from './no-results'

export default async function TableauxDeBordPage() {
  const dashboardGroups = await getDashboardList()

  if (dashboardGroups.length === 0) {
    return <NoResults />
  }

  return (
    <div className={fr.cx('fr-container')}>
      <h1>Tableaux de bord</h1>
      <div className={fr.cx('fr-grid-row', 'fr-grid-row--gutters')}>
        {dashboardGroups.map((group) => {
          return (
            <div key={group.id} className={fr.cx('fr-col-12', 'fr-col-md-6', 'fr-mb-3w')}>
              <div className={fr.cx('fr-p-2w')}>
                <h2 className={fr.cx('fr-h6')}>
                  <Link href={`/tableau-de-bord/${group.id}`}>{group.name}</Link>
                </h2>
                <div>
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
