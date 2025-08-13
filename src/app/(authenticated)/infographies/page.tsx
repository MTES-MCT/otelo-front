import { fr } from '@codegouvfr/react-dsfr'
import type { Metadata } from 'next'
import { DatavisualisationAutocomplete } from '~/components/data-visualisation/data-visualisation-autocomplete'
import { DataVisualisationFilters } from '~/components/data-visualisation/data-visualisation-filters'
import { DataVisualisationPage } from '~/components/data-visualisation/data-visualisation-page'
import { SelectDataType } from '~/components/data-visualisation/select-data-type'
import styles from './infographies.module.css'

export const metadata: Metadata = {
  title: 'Infographies Otelo',
}

export default function InfographiesPage() {
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
