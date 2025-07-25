'use client'

import { fr } from '@codegouvfr/react-dsfr'
import Badge from '@codegouvfr/react-dsfr/Badge'
import dayjs from 'dayjs'
import Link from 'next/link'
import { TSimulationWithRelations } from '~/schemas/simulation'
import { CloneSimulationButton } from './clone-simulation-button'
import { DeleteSimulationButton } from './delete-simulation-button'

interface DashboardSimulationItemProps {
  simulation: TSimulationWithRelations
}

export function DashboardSimulationItem({ simulation }: DashboardSimulationItemProps) {
  return (
    <div className={fr.cx('fr-mb-2w')}>
      <div className={fr.cx('fr-grid-row', 'fr-grid-row--middle')}>
        <div className={fr.cx('fr-col')}>
          <Link href={`/simulation/${simulation.id}/resultats`} className={fr.cx('fr-link')}>
            {simulation.name}
          </Link>
        </div>
        <div className={fr.cx('fr-grid-row', 'fr-grid-row--middle')}>
          <div className={fr.cx('fr-mr-1w')}>
            <Badge severity="info" small>
              {dayjs(simulation.updatedAt).format('DD/MM/YYYY')}
            </Badge>
          </div>
          <div className={fr.cx('fr-grid-row', 'fr-grid-row--middle')}>
            <CloneSimulationButton simulation={simulation} />
            <DeleteSimulationButton simulation={simulation} />
          </div>
        </div>
      </div>
    </div>
  )
}
