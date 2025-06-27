'use client'

import { fr } from '@codegouvfr/react-dsfr'
import Badge from '@codegouvfr/react-dsfr/Badge'
import Button from '@codegouvfr/react-dsfr/Button'
import { createModal } from '@codegouvfr/react-dsfr/Modal'
import dayjs from 'dayjs'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { useDeleteSimulation } from '~/hooks/use-delete-simulation'
import { TSimulationWithRelations } from '~/schemas/simulation'
import styles from './dashboard-simulation-item.module.css'

interface DashboardSimulationItemProps {
  simulation: TSimulationWithRelations
}

export function DashboardSimulationItem({ simulation }: DashboardSimulationItemProps) {
  const deleteSimulationMutation = useDeleteSimulation()
  const router = useRouter()

  const modalActions = createModal({
    id: `delete-simulation-modal-${simulation.id}`,
    isOpenedByDefault: false,
  })

  const handleDeleteSimulation = () => {
    deleteSimulationMutation.mutate(simulation.id, {
      onSuccess: () => {
        modalActions.close()
        toast.success('Scénario supprimé avec succès.', {
          description: `Le scénario "${simulation.name}" a été définitivement supprimé.`,
        })
        router.refresh()
      },
      onError: () => {
        toast.error('Erreur lors de la suppression', {
          description: `Impossible de supprimer le scénario "${simulation.name}". Veuillez réessayer.`,
        })
      },
    })
  }

  return (
    <>
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
            <div>
              <i className={`ri-delete-bin-6-line ${styles.deleteIcon}`} onClick={modalActions.open} />
            </div>
          </div>
        </div>
      </div>

      <modalActions.Component title="Êtes vous sûr de vouloir supprimer ce scénario ?" concealingBackdrop>
        <p>
          Cette action est irréversible. Le scénario <strong>&quot;{simulation.name}&quot;</strong> sera définitivement supprimé.
        </p>
        <div className={styles.modalActions}>
          <Button priority="secondary" onClick={modalActions.close}>
            Annuler
          </Button>
          <Button iconId="ri-delete-bin-6-line" onClick={handleDeleteSimulation} disabled={deleteSimulationMutation.isPending}>
            {deleteSimulationMutation.isPending ? 'Suppression...' : 'Supprimer'}
          </Button>
        </div>
      </modalActions.Component>
    </>
  )
}
