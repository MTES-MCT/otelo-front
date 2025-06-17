'use client'

import { fr } from '@codegouvfr/react-dsfr'
import { parseAsArrayOf, parseAsString, parseAsStringEnum, useQueryStates } from 'nuqs'
import { AutocompleteInput } from '~/components/simulations/autocomplete/autocomplete-input'
import { ContiguousEpcisCheckboxes } from '~/components/simulations/settings/contiguous-epcis-checkboxes'
import { ListEpcis } from '~/components/simulations/settings/list-epcis'

export const EpcisSimulation = () => {
  const [queryStates] = useQueryStates({
    epcis: parseAsArrayOf(parseAsString).withDefault([]),
    type: parseAsStringEnum(['bh', 'epcis']).withDefault('bh'),
  })
  return (
    <div
      className={fr.cx('fr-p-2w', 'fr-p-md-5w', 'fr-mb-2w')}
      style={{
        background: fr.colors.decisions.background.default.grey.default,
      }}
    >
      <AutocompleteInput hintText="Saisissez le nom de l'EPCI du territoire concerné, ou par défaut, vous pouvez saisir le nom de la commune ou son code postal." />
      {queryStates.type === 'epcis' && <ContiguousEpcisCheckboxes />}
      <ListEpcis />
    </div>
  )
}
