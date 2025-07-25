'use client'

import { fr } from '@codegouvfr/react-dsfr'
import Alert from '@codegouvfr/react-dsfr/Alert'
import Button from '@codegouvfr/react-dsfr/Button'
import { useRouter } from 'next/navigation'
import { parseAsArrayOf, parseAsString, useQueryStates } from 'nuqs'
import { useEffect, useState } from 'react'
import { AutocompleteInput } from '~/components/simulations/autocomplete/autocomplete-input'
import { NextStepLink } from '~/components/simulations/settings/next-step-link'
import { useEpciGroups } from '~/hooks/use-epci-groups'
import { useEpcis } from '~/hooks/use-epcis'
import { GeoApiCommuneResult, GeoApiEpciResult } from '~/hooks/use-geoapi-search'
import { TEpci } from '~/schemas/epci'
import { CheckboxEpcis } from './checkbox-epcis'
import { ContiguousEpcisCheckboxes } from './contiguous-epcis-checkboxes'
import { EpciGroupNameInput } from './epci-group-name-input'
import { EpciGroupSelect } from './epci-group-select'
import { MethodSelectionCards, SelectionMethod } from './method-selection-cards'

type WrapperSimulationTypePageProps = {
  bassinEpcis: TEpci[]
}

export const WrapperSimulationTypePage = ({ bassinEpcis = [] }: WrapperSimulationTypePageProps) => {
  const router = useRouter()
  const [{ baseEpci, epcis, epciGroupName, epciGroupId }, setQueryStates] = useQueryStates({
    baseEpci: parseAsString,
    epcis: parseAsArrayOf(parseAsString).withDefault([]),
    epciGroupName: parseAsString,
    epciGroupId: parseAsString,
  })
  const { data: selectedEpcis, isLoading: isLoadingEpcis } = useEpcis(epcis)
  const { data: groups } = useEpciGroups()
  const [isEditing, setIsEditing] = useState(false)
  const [selectedMethod, setSelectedMethod] = useState<SelectionMethod>(() => {
    if (epciGroupId) return 'existing-group'
    if (baseEpci || epcis.length > 0) return 'custom-selection'
    return null
  })
  const [isBassinHabitat, setIsBassinHabitat] = useState(false)

  const hasEpcis = !!epcis?.length
  const canGoNextStep = hasEpcis && !!(epciGroupName || epciGroupId)

  const href = '/simulation/cadrage-temporel'

  useEffect(() => {
    // Only set epcis if we have a baseEpci, bassinEpcis data, and epcis is empty
    // Also check that the bassinEpcis actually corresponds to the current baseEpci
    if (baseEpci && epcis.length === 0 && bassinEpcis.length > 0) {
      // Verify that at least one of the bassinEpcis matches our baseEpci
      const isCorrectBassin = bassinEpcis.some((epci) => epci.code === baseEpci)
      if (isCorrectBassin) {
        setQueryStates({ epcis: bassinEpcis.map((epci) => epci.code) })
        // If we're in bassin-habitat mode, mark it as such
        if (selectedMethod === 'bassin-habitat') {
          setIsBassinHabitat(true)
        }
      }
    }
  }, [baseEpci, epcis.length, bassinEpcis, setQueryStates, selectedMethod])

  const toggleEditing = () => setIsEditing(!isEditing)

  const onSelectEpci = async (item: GeoApiEpciResult | GeoApiCommuneResult) => {
    const code = 'codeEpci' in item ? (item.codeEpci ?? item.code) : item.code

    // Reset editing state when selecting a new EPCI
    setIsEditing(false)

    // Mark if this is a bassin habitat selection
    setIsBassinHabitat(selectedMethod === 'bassin-habitat')

    await setQueryStates({ baseEpci: code, epcis: [] })

    router.refresh()
  }

  const baseEpciData = bassinEpcis.find((epci) => epci.code === baseEpci)

  const handleMethodSelect = (method: SelectionMethod) => {
    setSelectedMethod(method)
    if (method === null) {
      // Reset everything when changing method
      setQueryStates({
        epciGroupId: null,
        epciGroupName: null,
        epcis: [],
        baseEpci: null,
      })
      setIsEditing(false)
      setIsBassinHabitat(false)
    } else if (method !== 'bassin-habitat') {
      // If switching away from bassin-habitat, reset the flag
      setIsBassinHabitat(false)
    }
  }

  return (
    <>
      <div
        className={fr.cx('fr-p-2w', 'fr-p-md-5w', 'fr-mb-2w')}
        style={{
          background: fr.colors.decisions.background.default.grey.default,
        }}
      >
        {isLoadingEpcis && <div>Chargement en cours...</div>}

        {!isLoadingEpcis && (
          <>
            {!selectedMethod && (
              <MethodSelectionCards
                selectedMethod={selectedMethod}
                onMethodSelect={handleMethodSelect}
                existingGroupsCount={groups?.length || 0}
              />
            )}

            {/* Show change method button when a method is selected */}
            {selectedMethod && (
              <div className={fr.cx('fr-mb-3w')}>
                <Button
                  priority="tertiary no outline"
                  iconId="fr-icon-refresh-line"
                  iconPosition="left"
                  size="small"
                  onClick={() => handleMethodSelect(null)}
                >
                  Changer de méthode de sélection
                </Button>
              </div>
            )}

            {/* Show existing group selection when that method is selected */}
            {selectedMethod === 'existing-group' && (
              <>
                <h3 className={fr.cx('fr-h5')}>Sélectionner un groupe EPCI sauvegardé</h3>
                <p className={fr.cx('fr-text--sm', 'fr-hint-text')}>Choisissez parmi vos groupes d'EPCI précédemment sauvegardés</p>
                <EpciGroupSelect
                  selectedGroupId={epciGroupId}
                  onUnselect={() => {
                    setQueryStates({
                      epciGroupId: null,
                      epciGroupName: null,
                      epcis: [],
                    })
                  }}
                />
              </>
            )}

            {/* Show bassin habitat or custom selection based on method */}
            {!epciGroupId && (selectedMethod === 'bassin-habitat' || selectedMethod === 'custom-selection') && (
              <>
                {selectedMethod === 'bassin-habitat' && (
                  <>
                    <h3 className={fr.cx('fr-h5')}>Choisir un Bassin d'Habitat</h3>
                    <p className={fr.cx('fr-text--sm', 'fr-hint-text')}>
                      Recherchez un EPCI pour sélectionner automatiquement son bassin d'habitat
                    </p>
                  </>
                )}
                {selectedMethod === 'custom-selection' && <h3 className={fr.cx('fr-h5')}>Créer une sélection personnalisée</h3>}
                <AutocompleteInput
                  label="Rechercher un EPCI"
                  onClick={onSelectEpci}
                  hintText={
                    selectedMethod === 'bassin-habitat'
                      ? "Saisissez le nom de l'EPCI pour charger automatiquement tous les EPCI de son bassin d'habitat."
                      : "Saisissez le nom de l'EPCI du territoire concerné, ou par défaut, vous pouvez saisir le nom de la commune ou son code postal."
                  }
                  defaultValue={baseEpciData?.name}
                />
              </>
            )}
          </>
        )}

        {selectedEpcis && selectedEpcis.length > 0 && !epciGroupId && (
          <>
            <div className={fr.cx('fr-grid-row', 'fr-grid-row--gutters', 'fr-grid-row--middle')}>
              <div className={fr.cx('fr-col-md-9')}>
                {!isEditing && (
                  <div className={fr.cx('fr-py-5w')}>
                    {isBassinHabitat && (
                      <Alert
                        description="Les EPCI du bassin d'habitat ont été automatiquement sélectionnés et ne peuvent pas être modifiés."
                        severity="info"
                        small
                        className={fr.cx('fr-mb-2w')}
                      />
                    )}
                    Les territoires inclus dans la simulation sont :
                    <ul>
                      {selectedEpcis?.map((epci) => (
                        <li key={epci.code}>{epci.name}</li>
                      ))}
                    </ul>
                  </div>
                )}
                {isEditing && (
                  <div className={fr.cx('fr-py-5w')}>
                    <CheckboxEpcis epcis={bassinEpcis} />
                  </div>
                )}
              </div>
              {!epciGroupId && !isBassinHabitat && (
                <div className={fr.cx('fr-col-md-3')}>
                  <Button priority="secondary" onClick={toggleEditing}>
                    Éditer les territoires inclus
                  </Button>
                </div>
              )}
            </div>
            {isEditing && !epciGroupId && !isBassinHabitat && <ContiguousEpcisCheckboxes epcis={bassinEpcis} />}
            <hr className={fr.cx('fr-mt-3w')} />
            <EpciGroupNameInput value={epciGroupName || ''} />
            <div className={fr.cx('fr-mt-2w')}>
              <Alert
                description="Les résultats de votre simulation seront donnés à l'échelle de l'EPCI ou à l'échelle du bassin d'habitat."
                severity="info"
                small
              />
            </div>
          </>
        )}
      </div>

      <div className={fr.cx('fr-ml-auto', 'fr-my-1w')}>
        <NextStepLink href={href} query="epcis" isDisabled={!canGoNextStep} />
      </div>
    </>
  )
}
