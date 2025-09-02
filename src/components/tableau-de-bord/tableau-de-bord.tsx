'use client'

import { fr } from '@codegouvfr/react-dsfr'
import Alert from '@codegouvfr/react-dsfr/Alert'
import Badge from '@codegouvfr/react-dsfr/Badge'
import { Breadcrumb } from '@codegouvfr/react-dsfr/Breadcrumb'
import Button from '@codegouvfr/react-dsfr/Button'
import Checkbox from '@codegouvfr/react-dsfr/Checkbox'
import Input from '@codegouvfr/react-dsfr/Input'
import { createModal } from '@codegouvfr/react-dsfr/Modal'
import { Select } from '@codegouvfr/react-dsfr/SelectNext'
import Table from '@codegouvfr/react-dsfr/Table'
import Tag from '@codegouvfr/react-dsfr/Tag'
import { zodResolver } from '@hookform/resolvers/zod'
import classNames from 'classnames'
import dayjs from 'dayjs'
import Link from 'next/link'
import { Controller, useForm } from 'react-hook-form'
import { GenericCard } from '~/components/common/generic-card/generic-card'
import { useRequestPowerpoint } from '~/hooks/use-request-powerpoint'
import { TRequestPowerpoint, TSimulationWithRelations, ZRequestPowerpoint } from '~/schemas/simulation'
import styles from './tableau-de-bord.module.css'

type TableauDeBordProps = {
  simulations: TSimulationWithRelations[]
  groupName: string
  userEmail: string
}

const modalActions = createModal({
  id: 'form-confirmation-modal',
  isOpenedByDefault: false,
})

export function TableauDeBord({ simulations, groupName, userEmail }: TableauDeBordProps) {
  const notEnoughSimulations = simulations.length < 3
  const { mutateAsync, isError, isSuccess, isPending } = useRequestPowerpoint()

  // Extract unique EPCIs from all simulations
  const uniqueEpcis = Array.from(new Map(simulations.flatMap((sim) => sim.epcis).map((epci) => [epci.code, epci])).values())

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    reset,
    getValues,
    watch,
  } = useForm<TRequestPowerpoint>({
    resolver: zodResolver(ZRequestPowerpoint),
    defaultValues: {
      nextStep: '',
      resultDate: '',
      selectedSimulations: [],
    },
    mode: 'onChange',
  })
  const { nextStep, resultDate } = getValues()
  const selectedSimulations = watch('selectedSimulations')

  const onRequestPowerpoint = async (data: TRequestPowerpoint) => {
    try {
      await mutateAsync(data)

      modalActions.close()
      reset()
    } catch (_) {
      modalActions.close()
    }
  }

  const onConfirmAction = async () => {
    await handleSubmit(onRequestPowerpoint)()
  }

  const handleModalOpen = () => {
    modalActions.open()
  }

  return (
    <div>
      <Breadcrumb
        currentPageLabel={groupName}
        homeLinkProps={{
          href: '/',
        }}
        segments={[{ label: 'Tableaux de bord', linkProps: { href: '/tableaux-de-bord' } }]}
      />
      <div className={fr.cx('fr-grid-row', 'fr-grid-row--gutters')}>
        <div className={fr.cx('fr-col-offset-lg-2')} />
        <div className={fr.cx('fr-col-lg-8', 'fr-col-12')}>
          <h1 className={fr.cx('fr-col-12')}>Tableau de bord</h1>

          <h2>{groupName}</h2>

          <div className={fr.cx('fr-callout', 'fr-mb-4w')}>
            <h3 className={fr.cx('fr-callout__title')}>Territoires concernés</h3>
            <div className={fr.cx('fr-callout__text')}>
              <p className={fr.cx('fr-text--sm', 'fr-mb-2w')}>
                Les simulations de ce groupe portent sur {uniqueEpcis.length} territoire{uniqueEpcis.length > 1 ? 's' : ''} :
              </p>
              <div>
                {uniqueEpcis.map((epci, index) => (
                  <span key={epci.code}>
                    <Badge small>{epci.name}</Badge>
                    {index < uniqueEpcis.length - 1 && ' '}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <form>
            <div className={fr.cx('fr-mb-6w')}>
              <p className={classNames(fr.cx('fr-label', 'fr-mb-1w'), styles.labelCards)}>
                Sélectionnez des scénarios à inclure : <span className={fr.cx('fr-text--sm')}>({selectedSimulations.length}/4)</span>
              </p>
              <div className={fr.cx('fr-grid-row', 'fr-grid-row--gutters', 'fr-mb-2w')}>
                {simulations.map((simulation) => (
                  <div key={simulation.id} className={fr.cx('fr-col-12', 'fr-col-md-6')}>
                    <GenericCard
                      header={
                        <div className={styles.tagContainer}>
                          <Badge small severity="info">
                            Horizon {simulation.scenario.projection}
                          </Badge>
                          <Badge small>{getPopulationScenarioLabel(simulation.scenario.b2_scenario) || ''}</Badge>
                          <Badge small>{getDecohabitationScenarioLabel(simulation.scenario.b2_scenario) || ''}</Badge>
                        </div>
                      }
                      headerAction={
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
                                    disabled: !field.value.includes(simulation.id) && field.value.length >= 4,
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
                      }
                      title={<Link href={`/simulation/${simulation.id}/resultats`}>{simulation.name}</Link>}
                      footer={<div className={styles.cardMention}>MàJ le {dayjs(simulation.updatedAt).format('DD/MM/YYYY')}</div>}
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
              <Button type="button" onClick={() => handleModalOpen()} disabled={notEnoughSimulations || !isValid}>
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
        title="Confirmation d'envoi du powerpoint"
        buttons={[
          {
            doClosesModal: true,
            children: 'Annuler',
            disabled: isPending,
          },
          {
            doClosesModal: false,
            children: "Confirmer l'envoi",
            onClick: onConfirmAction,
            disabled: isPending,
          },
        ]}
      >
        <div>
          <div>
            <strong>Email: </strong>
            <Tag>{userEmail}</Tag>
          </div>
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
