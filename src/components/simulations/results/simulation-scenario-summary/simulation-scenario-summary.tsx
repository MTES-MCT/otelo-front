'use client'

import React, { FC } from 'react'
import styles from './simulation-scenario-summary.module.css'
import { fr, FrCxArg } from '@codegouvfr/react-dsfr'
import { TScenario } from '~/schemas/scenario'
import { TEpci } from '~/schemas/epci'
import Tag from '@codegouvfr/react-dsfr/Tag'
import { useQueryState } from 'nuqs'

export interface SimulationScenarioSummaryProps {
  epcis: TEpci[]
  scenario: TScenario
}

export const SimulationScenarioSummary: FC<SimulationScenarioSummaryProps> = ({ epcis, scenario }) => {
  const [selectedEpci] = useQueryState('epci')

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

  const epciTxRs = scenario.epciScenarios.find((epciScenario) => epciScenario.epciCode === selectedEpci)!.b2_tx_rs
  const epciTxVacance = scenario.epciScenarios.find((epciScenario) => epciScenario.epciCode === selectedEpci)!.b2_tx_vacance
  const settings = [
    {
      iconId: 'fr-icon-france-line',
      key: 'territory',
      label: 'Territoire en étude',
      tags: [...epcis.map((epci) => <Tag key="epci-name">{epci.name}</Tag>)],
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
    ...(epciTxRs
      ? [
          {
            iconId: 'ri-percent-line',
            key: 'tauxRS',
            label: 'Taux cible de résidences secondaires',
            tags: [<Tag key="tauxRS">Taux cible de résidences secondaires : {Number(epciTxRs * 100).toFixed(2)} %</Tag>],
          },
        ]
      : []),
    ...(epciTxVacance
      ? [
          {
            iconId: 'ri-percent-line',
            key: 'tauxLV',
            label: 'Taux cible de logements vacants',
            tags: [
              <>{epciTxVacance && <Tag key="tauxLV">Taux cible de logements vacants : {Number(epciTxVacance * 100).toFixed(2)} %</Tag>}</>,
            ],
          },
        ]
      : []),
  ]
  return (
    <nav style={{ paddingRight: '1rem' }}>
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
