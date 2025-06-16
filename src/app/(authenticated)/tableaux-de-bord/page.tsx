import { fr } from '@codegouvfr/react-dsfr'
import Badge from '@codegouvfr/react-dsfr/Badge'
import dayjs from 'dayjs'
import Link from 'next/link'
import { NoResults } from '~/app/(authenticated)/tableaux-de-bord/no-results'
import { TSimulationWithRelations } from '~/schemas/simulation'
import { getSimulations } from '~/server-only/simulation/get-simulations'

export default async function TableauxDeBordPage() {
  const results = await getSimulations()

  if (results.length === 0) {
    return <NoResults />
  }

  const groupedResults = results.reduce<
    Record<
      string,
      {
        isBassin: boolean
        epciCode: string
        simulations: TSimulationWithRelations[]
      }
    >
  >((acc, simulation) => {
    const isBassin = simulation.epcis.length > 1
    const groupName = isBassin ? simulation.epcis[0].bassinName || 'Autre' : simulation.epcis?.[0]?.name
    const epciCode = simulation.epcis?.[0]?.code

    return {
      ...acc,
      [groupName]: {
        isBassin,
        epciCode,
        simulations: [...(acc[groupName]?.simulations || []), simulation],
      },
    }
  }, {})

  return (
    <div className={fr.cx('fr-container')}>
      <h1>Tableaux de bord</h1>
      <div className={fr.cx('fr-grid-row', 'fr-grid-row--gutters')}>
        {Object.keys(groupedResults).map((groupName) => {
          const { simulations, isBassin, epciCode } = groupedResults[groupName]
          return (
            <div key={groupName} className={fr.cx('fr-col-12', 'fr-col-md-4', 'fr-mb-3w')}>
              <div className={fr.cx('fr-p-2w')}>
                <h6>
                  <Link href={`/tableau-de-bord/${isBassin ? 'bassin' : 'territoire'}/${epciCode}`}>{groupName}</Link>
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
