'use client'

import { fr } from '@codegouvfr/react-dsfr'
import Badge from '@codegouvfr/react-dsfr/Badge'
import { Breadcrumb } from '@codegouvfr/react-dsfr/Breadcrumb'
import Button from '@codegouvfr/react-dsfr/Button'
import { Card } from '@codegouvfr/react-dsfr/Card'
import Checkbox from '@codegouvfr/react-dsfr/Checkbox'
import Input from '@codegouvfr/react-dsfr/Input'
import { Select } from '@codegouvfr/react-dsfr/SelectNext'
import { zodResolver } from '@hookform/resolvers/zod'
import classNames from 'classnames'
import dayjs from 'dayjs'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { TTableauDeBordForm, ZTableauDeBordForm } from '~/components/tableau-de-bord/tableau-de-bord-form'
import { TSimulationWithRelations } from '~/schemas/simulation'
import styles from './tableau-de-bord.module.css'

type TableauDeBordProps = {
  simulations: TSimulationWithRelations[]
  name: string
}

export function TableauDeBord({ simulations, name }: TableauDeBordProps) {
  const notEnoughSimulations = simulations.length < 3
  const [formSubmitted, setFormSubmitted] = useState(false)

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    getValues,
  } = useForm<TTableauDeBordForm>({
    resolver: zodResolver(ZTableauDeBordForm),
    defaultValues: {
      nextStep: '',
      resultDate: '',
      selectedSimulations: [],
    },
    mode: 'onChange',
  })

  const onSubmit = (data: TTableauDeBordForm) => {
    console.log('Form submitted:', data)
    setFormSubmitted(true)
  }

  const onCSVDownload = () => {
    console.log('CSV Download', getValues())
  }

  return (
    <div>
      <Breadcrumb
        currentPageLabel="Modification de votre simulation"
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

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className={fr.cx('fr-mb-6w')}>
              <p className={classNames(fr.cx('fr-label', 'fr-mb-1w'), styles.labelCards)}>Sélectionnez des simulations à inclure:</p>
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

            <div className={styles.actions}>
              <Button priority="secondary" type="button" onClick={onCSVDownload} disabled={notEnoughSimulations || !isValid}>
                Télécharger en csv (excel)
              </Button>
              <Button type="submit" disabled={notEnoughSimulations || !isValid}>
                Recevoir le powerpoint éditable
              </Button>
            </div>

            {formSubmitted && (
              <p className={fr.cx('fr-info-text', 'fr-grid-row--center', 'fr-mt-2w')}>
                Formulaire soumis avec succès ! Le powerpoint vous sera envoyé par e-mail sous 24h ouvrées.
              </p>
            )}

            {!notEnoughSimulations && !formSubmitted && (
              <p className={fr.cx('fr-info-text', 'fr-grid-row--center')}>Le powerpoint vous sera envoyé par e-mail sous 24h ouvrées.</p>
            )}
          </form>
        </div>
      </div>
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
