import React, { FC } from 'react'
import styles from './simulation-scenario-summary.module.css'
import { fr, FrCxArg } from '@codegouvfr/react-dsfr'
import { TScenario } from '~/schemas/scenario'
import { TEpci } from '~/schemas/epci'
import Tag from '@codegouvfr/react-dsfr/Tag'

export interface SimulationScenarioSummaryProps {
  epci: TEpci
  scenario: TScenario
}

export const SimulationScenarioSummary: FC<SimulationScenarioSummaryProps> = ({ epci, scenario }) => {
  const getOmphaleScenarioLabel = (scenario: string) => {
    switch (scenario) {
      case 'Central_B':
        return 'Population : Central | Ménages : Décélération'
      case 'Central_C':
        return 'Population : Central | Ménages : Tendanciel'
      case 'Central_H':
        return 'Population : Central | Ménages : Accélération'
      case 'PB_B':
        return 'Population : Basse | Ménages : Décélération'
      case 'PB_C':
        return 'Population : Basse | Ménages : Tendanciel'
      case 'PB_H':
        return 'Population : Basse | Ménages : Accélération'
      case 'PH_B':
        return 'Population : Haute | Ménages : Décélération'
      case 'PH_C':
        return 'Population : Haute | Ménages : Tendanciel'
      case 'PH_H':
        return 'Population : Haute | Ménages : Accélération'
    }
  }
  const settings = [
    {
      iconId: 'fr-icon-france-line',
      key: 'territory',
      label: 'Territoire en étude',
      tags: [
        <Tag key="epci-name">{epci.name}</Tag>,
        <Tag key="epci-code" className={styles.epci}>
          {epci.code}
        </Tag>,
      ],
    },
    {
      iconId: 'fr-icon-calendar-line',
      key: 'projection',
      label: 'Horizon de temps',
      tags: [<Tag key="projection">2021 - {scenario.projection}</Tag>],
    },
    {
      iconId: 'ri-line-chart-line',
      key: 'omphale',
      label: "Scénario de l'évolution démographique",
      tags: [<Tag key="omphale">{getOmphaleScenarioLabel(scenario.b2_scenario)}</Tag>],
    },
    ...(scenario.b2_tx_rs
      ? [
          {
            iconId: 'ri-percent-line',
            key: 'tauxRS',
            label: 'Taux cible de résidences secondaires',
            tags: [<Tag key="tauxRS">Taux cible de résidences secondaires : {scenario.b2_tx_rs} %</Tag>],
          },
        ]
      : []),
    ...(scenario.b2_tx_vacance
      ? [
          {
            iconId: 'ri-percent-line',
            key: 'tauxLV',
            label: 'Taux cible de logements vacants',
            tags: [<>{scenario.b2_tx_vacance && <Tag key="tauxLV">Taux cible de logements vacants : {scenario.b2_tx_vacance} %</Tag>}</>],
          },
        ]
      : []),
  ]
  return (
    <nav style={{ borderRight: '0.5px solid var(--background-alt-grey-active)', paddingRight: '1rem' }}>
      <div className={styles.headerContainer}>
        <h5>Votre paramétrage</h5>
      </div>
      <div className={styles.container}>
        {settings.map((setting) => (
          <React.Fragment key={setting.key}>
            <div className={styles.stepContainer}>
              <div className={styles.stepNumber}>
                <span className={fr.cx(setting.iconId as FrCxArg)}></span>
              </div>
              <span>{setting.label}</span>
            </div>
            {
              <div className={styles.stepDelimitor}>
                <div className={styles.badgeContainer}>{setting.tags.map((tag) => tag)}</div>
              </div>
            }
          </React.Fragment>
        ))}
      </div>
    </nav>
  )
}
