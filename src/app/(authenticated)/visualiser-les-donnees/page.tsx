import { DataVisualisationPage } from '~/components/data-visualisation/data-visualisation-page'
import { SelectDataType } from '~/components/data-visualisation/select-data-type'
import { AutocompleteInput } from '~/components/simulations/autocomplete/autocomplete-input'

export default function VisualiserLesDonnees() {
  return (
    <div>
      <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
        <AutocompleteInput hintText="Saisissez le nom de l'EPCI du territoire concerné, ou par défaut, vous pouvez saisir le nom de la commune ou son code postal." />
        <SelectDataType />
      </div>
      <DataVisualisationPage />
    </div>
  )
}
