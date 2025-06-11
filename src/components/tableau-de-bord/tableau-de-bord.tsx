'use client'

import { fr } from '@codegouvfr/react-dsfr'
import Alert from '@codegouvfr/react-dsfr/Alert'
import Badge from '@codegouvfr/react-dsfr/Badge'
import { Breadcrumb } from '@codegouvfr/react-dsfr/Breadcrumb'
import Button from '@codegouvfr/react-dsfr/Button'
import { Card } from '@codegouvfr/react-dsfr/Card'
import Checkbox from '@codegouvfr/react-dsfr/Checkbox'
import Input from '@codegouvfr/react-dsfr/Input'
import { createModal } from '@codegouvfr/react-dsfr/Modal'
import { Select } from '@codegouvfr/react-dsfr/SelectNext'
import Table from '@codegouvfr/react-dsfr/Table'
import Tag from '@codegouvfr/react-dsfr/Tag'
import { zodResolver } from '@hookform/resolvers/zod'
import classNames from 'classnames'
import dayjs from 'dayjs'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useRequestPowerpoint } from '~/hooks/use-request-powerpoint'
import { TRequestPowerpoint, TSimulationWithRelations, ZRequestPowerpoint } from '~/schemas/simulation'
import styles from './tableau-de-bord.module.css'

type TableauDeBordProps = {
  simulations: TSimulationWithRelations[]
  name: string
  userEmail: string
}

const modalActions = createModal({
  id: 'form-confirmation-modal',
  isOpenedByDefault: false,
})

export function TableauDeBord({ simulations, name, userEmail }: TableauDeBordProps) {
  const notEnoughSimulations = simulations.length < 3
  const [actionType, setActionType] = useState<'submit' | 'download' | null>(null)
  const { mutateAsync, isError, isSuccess, isPending } = useRequestPowerpoint()

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    reset,
    getValues,
  } = useForm<TRequestPowerpoint>({
    resolver: zodResolver(ZRequestPowerpoint),
    defaultValues: {
      nextStep: '',
      resultDate: '',
      selectedSimulations: [],
    },
    mode: 'onChange',
  })
  const { nextStep, selectedSimulations, resultDate } = getValues()

  const onRequestPowerpoint = async (data: TRequestPowerpoint) => {
    try {
      await mutateAsync(data)

      modalActions.close()
      reset()
    } catch (_) {
      modalActions.close()
    }
  }

  const onCSVDownload = async () => {
    console.log('CSV Download', getValues())
  }

  const onConfirmAction = async () => {
    actionType === 'submit' ? await handleSubmit(onRequestPowerpoint)() : await onCSVDownload()
  }

  const handleModalOpen = (type: 'submit' | 'download') => {
    setActionType(type)
    modalActions.open()
  }

  return (
    <div>
      <Breadcrumb
        currentPageLabel={name}
        homeLinkProps={{
          href: '/',
        }}
        segments={[{ label: 'Tableau de bord', linkProps: { href: '/tableaux-de-bord' } }]}
      />
      <div className={fr.cx('fr-grid-row', 'fr-grid-row--gutters')}>
        <div className={fr.cx('fr-col-offset-lg-2')} />
        <div className={fr.cx('fr-col-lg-8', 'fr-col-12')}>
          <h1 className={fr.cx('fr-col-12')}>Tableau de bord</h1>

          <h2>{name}</h2>

          <form>
            <div className={fr.cx('fr-mb-6w')}>
              <p className={classNames(fr.cx('fr-label', 'fr-mb-1w'), styles.labelCards)}>Sélectionnez des simulations à inclure :</p>
              <div className={fr.cx('fr-grid-row', 'fr-grid-row--gutters', 'fr-mb-2w')}>
                {simulations.map((simulation) => (
                  <div key={simulation.id} className={fr.cx('fr-col-12', 'fr-col-md-6')}>
                    <Card
                      background
                      start={
                        <div className={styles.cardHeader}>
                          <div className={styles.tagContainer}>
                            <Badge small severity="info">
                              Horizon {simulation.scenario.projection}
                            </Badge>
                            <Badge small>{getPopulationScenarioLabel(simulation.scenario.b2_scenario) || ''}</Badge>
                            <Badge small>{getDecohabitationScenarioLabel(simulation.scenario.b2_scenario) || ''}</Badge>
                          </div>
                          <Controller
                            control={control}
                            name="selectedSimulations"
                            render={({ field }) => (
                              <Checkbox
                                small
                                className={styles.checkbox}
                                options={[
                                  {
                                    label: '',
                                    nativeInputProps: {
                                      checked: field.value.includes(simulation.id),
                                      onChange: (e) => {
                                        if (e.target.checked) {
                                          field.onChange([...field.value, simulation.id])
                                        } else {
                                          field.onChange(field.value.filter((id: string) => id !== simulation.id))
                                        }
                                      },
                                    },
                                  },
                                ]}
                              />
                            )}
                          />
                        </div>
                      }
                      endDetail={`Créée le ${dayjs(simulation.createdAt).format('DD/MM/YYYY')}`}
                      border
                      linkProps={{
                        href: `/simulation/${simulation.id}/resultats`,
                      }}
                      size="small"
                      title={simulation.name}
                      titleAs="h3"
                    />
                  </div>
                ))}
              </div>

              {errors.selectedSimulations && <p className={fr.cx('fr-error-text', 'fr-mb-3w')}>{errors.selectedSimulations.message}</p>}
            </div>

            <div className={fr.cx('fr-mb-6w')}>
              <Controller
                control={control}
                name="nextStep"
                render={({ field }) => (
                  <Select
                    label={<strong>Quelle est la prochaine étape de votre travail ?</strong>}
                    placeholder="Choisir"
                    options={['Atelier de travail', 'Présentation aux élus', 'Prise de décision', 'Autre'].map((value) => ({
                      value,
                      label: value,
                    }))}
                    state={errors.nextStep ? 'error' : undefined}
                    stateRelatedMessage={errors.nextStep?.message}
                    nativeSelectProps={{
                      value: field.value,
                      onChange: field.onChange,
                    }}
                  />
                )}
              />
            </div>

            <div className={fr.cx('fr-mb-12w')}>
              <Controller
                control={control}
                name="resultDate"
                render={({ field }) => (
                  <Input
                    label={<strong>À quelle date prévoyez-vous de restituer les résultats ?</strong>}
                    state={errors.resultDate ? 'error' : undefined}
                    stateRelatedMessage={errors.resultDate?.message}
                    nativeInputProps={{
                      type: 'date',
                      value: field.value,
                      onChange: field.onChange,
                      min: dayjs().format('YYYY-MM-DD'),
                    }}
                  />
                )}
              />
            </div>

            {notEnoughSimulations && (
              <p className={fr.cx('fr-info-text', 'fr-grid-row--center')}>
                Il faut avoir paramétré au moins 3 scénarios dans la simulation pour pouvoir la télécharger.
              </p>
            )}

            {isSuccess && (
              <Alert
                closable
                description={
                  <>
                    Votre présentation PowerPoint personnalisée avec les simulations sélectionnées est en cours de préparation. Vous la
                    recevrez à l'adresse e-mail <Tag>{userEmail}</Tag> dans un délai de 24h ouvrées.
                  </>
                }
                severity="success"
                title="Demande de présentation bien reçue !"
              />
            )}

            {isError && (
              <Alert closable description="Veuillez réessayer ultérieurement." severity="error" title="Une erreur est survenue" />
            )}

            <div className={styles.actions}>
              <Button
                priority="secondary"
                type="button"
                onClick={() => handleModalOpen('download')}
                disabled={notEnoughSimulations || !isValid}
              >
                Télécharger en csv (excel)
              </Button>
              <Button type="button" onClick={() => handleModalOpen('submit')} disabled={notEnoughSimulations || !isValid}>
                Recevoir le powerpoint éditable
              </Button>
            </div>

            {!notEnoughSimulations && (
              <p className={fr.cx('fr-info-text', 'fr-grid-row--center')}>Le powerpoint vous sera envoyé par e-mail sous 24h ouvrées.</p>
            )}
          </form>
        </div>
      </div>

      <modalActions.Component
        title={actionType === 'submit' ? "Confirmation d'envoi du powerpoint" : 'Confirmation de téléchargement CSV'}
        buttons={[
          {
            doClosesModal: true,
            children: 'Annuler',
            disabled: isPending,
          },
          {
            doClosesModal: false,
            children: actionType === 'submit' ? "Confirmer l'envoi" : 'Confirmer le téléchargement',
            onClick: onConfirmAction,
            disabled: isPending,
          },
        ]}
      >
        <div>
          {actionType === 'submit' && (
            <div>
              <strong>Email: </strong>
              <Tag>{userEmail}</Tag>
            </div>
          )}
          <Table
            caption="Récapitulatif des données"
            data={[
              [
                'Simulation(s)',
                selectedSimulations.map((simId) => {
                  const simulation = simulations.find((sim) => sim.id === simId)
                  return simulation ? (
                    <Badge small key={simId}>
                      {simulation.name} (Horizon {simulation.scenario.projection})
                    </Badge>
                  ) : null
                }),
              ],
              ['Prochaine étape', nextStep],
              ['Date de restitution prévue', resultDate ? dayjs(resultDate).format('DD/MM/YYYY') : 'Non spécifiée'],
            ]}
            headers={['Paramétrage', '']}
          />
        </div>
      </modalActions.Component>
    </div>
  )
}

const getPopulationScenarioLabel = (scenario: string) => {
  switch (scenario) {
    case 'Central_B':
    case 'Central_C':
    case 'Central_H':
    default:
      return 'Population Centrale'
    case 'PB_B':
    case 'PB_C':
    case 'PB_H':
      return 'Population Basse'
    case 'PH_B':
    case 'PH_C':
    case 'PH_H':
      return 'Population Haute'
  }
}

const getDecohabitationScenarioLabel = (scenario: string) => {
  switch (scenario) {
    case 'Central_C':
    case 'PB_C':
    case 'PH_C':
    default:
      return 'Décohabitation tendanciel'
    case 'Central_B':
    case 'PB_B':
    case 'PH_B':
      return 'Décohabitation décélération'
    case 'Central_H':
    case 'PB_H':
    case 'PH_H':
      return 'Décohabitation accélération'
  }
}
