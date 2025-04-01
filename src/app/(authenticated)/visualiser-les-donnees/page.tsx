import { fr } from '@codegouvfr/react-dsfr'
import { DataVisualisationFilters } from '~/components/data-visualisation/data-visualisation-filters'
import { DataVisualisationPage } from '~/components/data-visualisation/data-visualisation-page'
import { SelectDataType } from '~/components/data-visualisation/select-data-type'
import { AutocompleteInput } from '~/components/simulations/autocomplete/autocomplete-input'
import styles from './visualiser-les-donnees.module.css'

export default function VisualiserLesDonnees() {
  return (
    <div className={fr.cx('fr-container')}>
      <div className={styles.container}>
        <div className={styles.inputsContainer}>
          <AutocompleteInput hintText="Saisissez le nom de l'EPCI du territoire concerné, ou par défaut, vous pouvez saisir le nom de la commune ou son code postal." />
          <SelectDataType />
        </div>
        <div className={styles.filtersContainer}>
          <DataVisualisationFilters />
        </div>
      </div>
      <DataVisualisationPage />
    </div>
  )
}
