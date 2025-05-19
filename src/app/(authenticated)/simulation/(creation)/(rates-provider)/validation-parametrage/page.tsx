import { CreateSimulationForm } from '~/components/simulations/settings/create-simulation-form'
import styles from './validation-parametrage.module.css'

export default async function ValidationParametragePage() {
  return (
    <div className={styles.container}>
      <h3>Récapitulatif des paramètres</h3>

      <CreateSimulationForm />
    </div>
  )
}
