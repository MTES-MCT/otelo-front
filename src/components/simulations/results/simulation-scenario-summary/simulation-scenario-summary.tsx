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
  const settings: Array<{ iconId: FrCxArg; key: string; label: string; tags: React.ReactNode[] }> = [
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
      tags: [<Tag key="omphale">{scenario.b2_scenario}</Tag>],
    },
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
                <span className={fr.cx(setting.iconId)}></span>
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
