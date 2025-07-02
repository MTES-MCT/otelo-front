'use client'

import { fr } from '@codegouvfr/react-dsfr'
import Alert from '@codegouvfr/react-dsfr/Alert'
import Button from '@codegouvfr/react-dsfr/Button'
import { useRouter } from 'next/navigation'
import { parseAsArrayOf, parseAsString, useQueryStates } from 'nuqs'
import { useEffect, useState } from 'react'
import { AutocompleteInput } from '~/components/simulations/autocomplete/autocomplete-input'
import { NextStepLink } from '~/components/simulations/settings/next-step-link'
import { useEpcis } from '~/hooks/use-epcis'
import { GeoApiCommuneResult, GeoApiEpciResult } from '~/hooks/use-geoapi-search'
import { TEpci } from '~/schemas/epci'
import { CheckboxEpcis } from './checkbox-epcis'
import { ContiguousEpcisCheckboxes } from './contiguous-epcis-checkboxes'

type WrapperSimulationTypePageProps = {
  bassinEpcis: TEpci[]
}

export const WrapperSimulationTypePage = ({ bassinEpcis = [] }: WrapperSimulationTypePageProps) => {
  const router = useRouter()
  const [{ baseEpci, epcis }, setQueryStates] = useQueryStates({
    baseEpci: parseAsString,
    epcis: parseAsArrayOf(parseAsString).withDefault([]),
  })
  const { data: selectedEpcis } = useEpcis(epcis)

  const [isEditing, setIsEditing] = useState(false)
  const href = `/simulation/cadrage-temporel`

  useEffect(() => {
    // Only set epcis if we have a baseEpci, bassinEpcis data, and epcis is empty
    // Also check that the bassinEpcis actually corresponds to the current baseEpci
    if (baseEpci && epcis.length === 0 && bassinEpcis.length > 0) {
      // Verify that at least one of the bassinEpcis matches our baseEpci
      const isCorrectBassin = bassinEpcis.some((epci) => epci.code === baseEpci)
      if (isCorrectBassin) {
        setQueryStates({ epcis: bassinEpcis.map((epci) => epci.code) })
      }
    }
  }, [baseEpci, epcis.length, bassinEpcis, setQueryStates])

  const onEditClick = () => {
    setIsEditing(!isEditing)
  }

  const onSelectEpci = async (item: GeoApiEpciResult | GeoApiCommuneResult) => {
    const code = 'codeEpci' in item ? (item.codeEpci ?? item.code) : item.code

    // Reset editing state when selecting a new EPCI
    setIsEditing(false)

    await setQueryStates({ baseEpci: code, epcis: [] })

    router.refresh()
  }

  const baseEpciData = bassinEpcis.find((epci) => epci.code === baseEpci)

  const description = "Les résultats de votre simulation seront donnés à l'échelle de l'EPCI ou à l'échelle du bassin d'habitat."

  return (
    <>
      <div
        className={fr.cx('fr-p-2w', 'fr-p-md-5w', 'fr-mb-2w')}
        style={{
          background: fr.colors.decisions.background.default.grey.default,
        }}
      >
        <AutocompleteInput
          onClick={onSelectEpci}
          hintText="Saisissez le nom de l'EPCI du territoire concerné, ou par défaut, vous pouvez saisir le nom de la commune ou son code postal."
          defaultValue={baseEpciData?.name}
        />

        {selectedEpcis && selectedEpcis.length > 0 && (
          <>
            <div className={fr.cx('fr-grid-row', 'fr-grid-row--gutters', 'fr-grid-row--middle')}>
              <div className={fr.cx('fr-col-md-9')}>
                {!isEditing && selectedEpcis && (
                  <div className={fr.cx('fr-py-5w')}>
                    <div>
                      Les territoires inclus dans la simulation sont :
                      <ul>
                        {selectedEpcis.map((epci) => (
                          <li key={epci.code}>{epci.name}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
                {isEditing && (
                  <div className={fr.cx('fr-py-5w')}>
                    <div>
                      <CheckboxEpcis epcis={bassinEpcis} />
                    </div>
                  </div>
                )}
              </div>
              <div className={fr.cx('fr-col-md-3')}>
                <Button priority="secondary" onClick={onEditClick}>
                  Éditer les territoires inclus
                </Button>
              </div>
            </div>
            {isEditing && <ContiguousEpcisCheckboxes epcis={bassinEpcis} />}
            <div className={fr.cx('fr-mt-2w')}>
              <Alert description={description} severity="info" small />
            </div>
          </>
        )}
      </div>

      <div className={fr.cx('fr-ml-auto', 'fr-my-1w')}>
        <NextStepLink href={href} query="epcis" />
      </div>
    </>
  )
}
