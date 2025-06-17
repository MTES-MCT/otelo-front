'use client'

import { fr } from '@codegouvfr/react-dsfr'
import Checkbox from '@codegouvfr/react-dsfr/Checkbox'
import { parseAsArrayOf, parseAsString, useQueryStates } from 'nuqs'
import { ComponentProps, FC } from 'react'
import { useContiguousEpcis } from '~/hooks/use-contiguous-epcis'

export const ContiguousEpcisCheckboxes: FC = () => {
  const [queryStates, setQueryStates] = useQueryStates({
    epcis: parseAsArrayOf(parseAsString).withDefault([]),
  })

  // Get the first (and only) EPCI from the epcis array when type is 'epcis'
  const firstEpciCode = queryStates.epcis?.[0]
  const { data: contiguousEpcis, isLoading } = useContiguousEpcis(firstEpciCode)

  if (isLoading) {
    return (
      <div className={fr.cx('fr-py-4w')}>
        <p>Chargement des EPCIs limitrophes...</p>
      </div>
    )
  }

  if (!firstEpciCode) {
    return null
  }

  if (!contiguousEpcis || contiguousEpcis.length === 0) {
    return (
      <div className={fr.cx('fr-py-4w')}>
        <p className={fr.cx('fr-text--sm')}>Aucun EPCI limitrophe trouvé.</p>
      </div>
    )
  }

  const createOptions = (epcis: typeof contiguousEpcis): ComponentProps<typeof Checkbox>['options'] =>
    epcis.map((epci) => ({
      label: epci.name,
      nativeInputProps: {
        checked: queryStates.epcis.includes(epci.code),
        name: epci.name,
        onChange: (e) => {
          const currentEpcis = queryStates.epcis ?? []
          const newEpcis = e.target.checked ? [...currentEpcis, e.target.value] : currentEpcis.filter((code) => code !== e.target.value)
          setQueryStates({ epcis: newEpcis })
        },
        value: epci.code,
      },
    }))

  // Split EPCIs into two columns
  const midpoint = Math.ceil(contiguousEpcis.length / 2)
  const firstColumn = contiguousEpcis.slice(0, midpoint)
  const secondColumn = contiguousEpcis.slice(midpoint)

  const firstColumnOptions = createOptions(firstColumn)
  const secondColumnOptions = createOptions(secondColumn)

  return (
    <div className={fr.cx('fr-py-4w')}>
      <h6 className={fr.cx('fr-mb-2w')}>EPCIs limitrophes</h6>
      <p className={fr.cx('fr-text--sm', 'fr-mb-2w')}>Vous pouvez sélectionner des EPCIs limitrophes à inclure dans votre simulation :</p>
      <div className={fr.cx('fr-grid-row', 'fr-grid-row--gutters')}>
        <div className={fr.cx('fr-col-12', 'fr-col-md-6')}>
          <Checkbox options={firstColumnOptions} />
        </div>
        <div className={fr.cx('fr-col-12', 'fr-col-md-6')}>
          <Checkbox options={secondColumnOptions} />
        </div>
      </div>
    </div>
  )
}
