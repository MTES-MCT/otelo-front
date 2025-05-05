import { fr } from '@codegouvfr/react-dsfr'
import { DatavisualisationAutocomplete } from '~/components/data-visualisation/data-visualisation-autocomplete'
import { DataVisualisationFilters } from '~/components/data-visualisation/data-visualisation-filters'
import { DataVisualisationPage } from '~/components/data-visualisation/data-visualisation-page'
import { SelectDataType } from '~/components/data-visualisation/select-data-type'
import styles from './visualiser-les-donnees.module.css'

export default function VisualiserLesDonnees() {
  return (
    <div className={fr.cx('fr-container')}>
      <div className={styles.container}>
        <div className={styles.inputsContainer}>
          <DatavisualisationAutocomplete />
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
