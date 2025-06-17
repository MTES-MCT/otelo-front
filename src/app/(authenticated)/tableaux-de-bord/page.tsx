import { fr } from '@codegouvfr/react-dsfr'
import Badge from '@codegouvfr/react-dsfr/Badge'
import dayjs from 'dayjs'
import Link from 'next/link'
import { getDashboardList } from '~/server-only/simulation/get-dashboard-list'

export default async function TableauxDeBordPage() {
  const dashboard = await getDashboardList()

  return (
    <div className={fr.cx('fr-container')}>
      <h1>Tableaux de bord</h1>
      <div className={fr.cx('fr-grid-row', 'fr-grid-row--gutters')}>
        {Object.keys(dashboard).map((groupName) => {
          const simulations = dashboard[groupName]
          return (
            <div key={groupName} className={fr.cx('fr-col-12', 'fr-col-md-4', 'fr-mb-3w')}>
              <div className={fr.cx('fr-p-2w')}>
                <h6>
                  <Link href={`/tableau-de-bord/${groupName}`}>{groupName}</Link>
                </h6>
                <div>
                  {simulations.map((simulation) => (
                    <div key={simulation.id} className={fr.cx('fr-mb-2w')}>
                      <div className={fr.cx('fr-grid-row', 'fr-grid-row--middle')}>
                        <div className={fr.cx('fr-col')}>
                          <Link href={`/simulation/${simulation.id}/resultats`} className={fr.cx('fr-link')}>
                            {simulation.name}
                          </Link>
                        </div>
                        <div>
                          <Badge severity="info" small>
                            {dayjs(simulation.createdAt).format('DD/MM/YYYY')}
                          </Badge>
                        </div>
                      </div>
                    </div>
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
