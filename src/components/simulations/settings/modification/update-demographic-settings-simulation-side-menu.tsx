'use client'

import { fr } from '@codegouvfr/react-dsfr'
import Tag from '@codegouvfr/react-dsfr/Tag'
import React from 'react'
import { useSimulationSettings } from '~/app/(authenticated)/simulation/[id]/modifier/(demographic-modification)/simulation-scenario-modification-provider'
import { getOmphaleLabel } from '~/utils/omphale-label'
import styles from '../simulation-side-menu.module.css'

type UpdateDemographicSettingsSimulationSideMenuProps = {
  id: string
}

export default function UpdateDemographicSettingsSimulationSideMenu({ id }: UpdateDemographicSettingsSimulationSideMenuProps) {
  const { simulationSettings } = useSimulationSettings()

  const demographicSteps = [
    {
      label: 'Cadrage temporel de la simulation',
      path: `/simulation/${id}/modifier/cadrage-temporel`,
      title: <span>Déterminer l&apos;horizon de temps</span>,
      value: `${simulationSettings.projection}`,
    },
    {
      label: "Scénario de l'évolution démographique",
      path: `/simulation/${id}/modifier/parametrages-demographique`,
      title: <span>Paramétrage évolution démographique</span>,
      value: getOmphaleLabel(simulationSettings.b2_scenario),
    },
    {
      label: 'Taux de résidences secondaires / logements vacants',
      path: `/simulation/${id}/modifier/taux-cibles-logements`,
      title: <span>Paramétrage résidences secondaires et logements vacants</span>,
      value: 'Taux de résidences secondaires / logements vacants',
    },
    {
      label: 'Taux de restructuration et taux de disparition',
      path: `/simulation/${id}/modifier/taux-restructuration-disparition`,
      title: <span>Paramétrage des dynamiques de renouvellement du parc de logements</span>,
      value: 'Taux de restructuration et taux de disparition',
    },
  ]

  return (
    <nav className={fr.cx('fr-col-md-3')}>
      <div className={styles.container}>
        {demographicSteps.map((step, index) => (
          <React.Fragment key={index}>
            <div className={styles.stepContainer}>
              <div className={styles.stepNumber}>
                <span className={styles.stepNumberText}>{index + 1}</span>
              </div>
              <span>{step.title}</span>
            </div>
            {
              <div className={styles.stepDelimitor}>
                <div className={styles.badgeContainer}>
                  <Tag iconId="fr-icon-checkbox-circle-line" linkProps={{ href: step.path }}>
                    {step.value}
                  </Tag>
                </div>
              </div>
            }
          </React.Fragment>
        ))}
        <div className={styles.stepContainer}>
          <div className={styles.stepNumber}>{demographicSteps.length + 1}</div>
          <span>Validation de votre paramétrage</span>
        </div>
      </div>
    </nav>
  )
}
