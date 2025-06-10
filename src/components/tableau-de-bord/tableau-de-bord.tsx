import { fr } from '@codegouvfr/react-dsfr'
import Badge from '@codegouvfr/react-dsfr/Badge'
import { Breadcrumb } from '@codegouvfr/react-dsfr/Breadcrumb'
import Button from '@codegouvfr/react-dsfr/Button'
import { Card } from '@codegouvfr/react-dsfr/Card'
import Checkbox from '@codegouvfr/react-dsfr/Checkbox'
import Input from '@codegouvfr/react-dsfr/Input'
import { Select } from '@codegouvfr/react-dsfr/SelectNext'
import dayjs from 'dayjs'
import { TSimulationWithRelations } from '~/schemas/simulation'
import styles from './tableau-de-bord.module.css'

type TableauDeBordProps = {
  simulations: TSimulationWithRelations[]
  name: string
}

export function TableauDeBord({ simulations, name }: TableauDeBordProps) {
  const notEnoughSimulations = simulations.length < 3

  return (
    <div>
      <Breadcrumb
        currentPageLabel="Modification de votre simulation"
        homeLinkProps={{
          href: '/',
        }}
        segments={[{ label: 'Tableau de bord', linkProps: { href: '/mes-simulations' } }]}
      />
      <div className={fr.cx('fr-grid-row', 'fr-grid-row--gutters')}>
        <div className={fr.cx('fr-col-offset-lg-2')} />
        <div className={fr.cx('fr-col-lg-8', 'fr-col-12')}>
          <h1 className={fr.cx('fr-col-12')}>Tableau de bord</h1>

          <h2>{name}</h2>

          <div className={fr.cx('fr-grid-row', 'fr-grid-row--gutters', 'fr-mb-6w')}>
            {simulations.map((simulation) => (
              <div key={simulation.id} className={fr.cx('fr-col-12', 'fr-col-md-6')}>
                <Card
                  background
                  start={
                    <div className={styles.tagContainer}>
                      <Badge small severity="info">
                        Horizon {simulation.scenario.projection}
                      </Badge>
                      <Badge small>{getPopulationScenarioLabel(simulation.scenario.b2_scenario) || ''}</Badge>
                      <Badge small>{getDecohabitationScenarioLabel(simulation.scenario.b2_scenario) || ''}</Badge>
                      <Checkbox
                        small
                        className={styles.checkbox}
                        options={[
                          {
                            label: '',
                            nativeInputProps: {},
                          },
                        ]}
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

          <div className={fr.cx('fr-mb-6w')}>
            <Select
              label={<strong>Quelle est la prochaine étape de votre travail ?</strong>}
              placeholder="Choisir"
              options={['Atelier de travail', 'Présentation aux élus', 'Prise de décision', 'Autre'].map((value) => ({
                value,
                label: value,
              }))}
            />
          </div>

          <div className={fr.cx('fr-mb-12w')}>
            <Input
              label={<strong>À quelle date prévoyez-vous de restituer les résultats ?</strong>}
              nativeInputProps={{
                type: 'date',
              }}
            />
          </div>

          {notEnoughSimulations && (
            <p className={fr.cx('fr-info-text', 'fr-grid-row--center')}>
              Il faut avoir paramétré au moins 3 scénarios dans la simulation pour pouvoir la télécharger.
            </p>
          )}

          <div className={styles.actions}>
            <Button priority="secondary" disabled={notEnoughSimulations}>
              Télécharger en csv (excel)
            </Button>
            <Button disabled={notEnoughSimulations}>Recevoir le powerpoint éditable</Button>
          </div>

          {!notEnoughSimulations && (
            <p className={fr.cx('fr-info-text', 'fr-grid-row--center')}>Le powerpoint vous sera envoyé par e-mail sous 24h ouvrées.</p>
          )}
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
    case 'Central_B':
    case 'PB_B':
    case 'PH_B':
      return 'Décohabitation décélération'
    case 'Central_C':
    case 'PB_C':
    case 'PH_C':
      return 'Décohabitation tendanciel'
    case 'Central_H':
    case 'PB_H':
    case 'PH_H':
      return 'Décohabitation accélération'
  }
}
