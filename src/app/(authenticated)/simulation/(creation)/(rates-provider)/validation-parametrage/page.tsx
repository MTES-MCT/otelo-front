import type { Metadata } from 'next'
import { CreateSimulationForm } from '~/components/simulations/settings/create-simulation-form'
import styles from './validation-parametrage.module.css'

export const metadata: Metadata = {
  title: 'Elaborer scenario - dernière étape 6 sur 6 - Otelo',
}

export default async function ValidationParametragePage() {
  return (
    <div className={styles.container}>
      <h3>Récapitulatif des paramètres</h3>

      <CreateSimulationForm />
    </div>
  )
}
