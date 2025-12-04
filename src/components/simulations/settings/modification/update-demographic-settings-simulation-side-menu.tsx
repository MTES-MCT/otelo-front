'use client'

import { fr } from '@codegouvfr/react-dsfr'
import React from 'react'
import { useSimulationSettings } from '~/app/(authenticated)/simulation/[id]/modifier/(demographic-modification)/simulation-scenario-modification-provider'
import { DemographicSettingsSimulationSideMenuStepNumber } from '../demographic-settings-simulation-side-menu-step-number'
import { DemographicSettingsSimulationSideMenuTitle } from '../demographic-settings-simulation-side-menu-title'
import styles from '../simulation-side-menu.module.css'
import { UpdateDemographicSettingsGuideTag } from './update-demographic-settings-guide-tag'

type UpdateDemographicSettingsSimulationSideMenuProps = {
  id: string
}

export default function UpdateDemographicSettingsSimulationSideMenu({ id }: UpdateDemographicSettingsSimulationSideMenuProps) {
  const { simulationSettings } = useSimulationSettings()

  const demographicSteps = [
    {
      path: `/simulation/${id}/modifier/cadrage-temporel`,
      queryKeys: ['projection'],
      titleText: 'Horizon de temps',
      iconId: 'ri-time-line',
      data: `${simulationSettings.projection}`,
    },
    {
      path: `/simulation/${id}/modifier/parametrages-demographique`,
      queryKeys: ['omphale'],
      titleText: 'Projection démographique',
      data: simulationSettings.b2_scenario,
    },
    {
      path: `/simulation/${id}/modifier/taux-cibles-logements-vacants`,
      queryKeys: [],
      titleText: 'Logements vacants longue durée',
    },
    {
      path: `/simulation/${id}/modifier/taux-cibles-residences-secondaires`,
      queryKeys: [],
      titleText: 'Résidences secondaires',
    },
    {
      path: `/simulation/${id}/modifier/taux-restructuration-disparition`,
      queryKeys: [],
      titleText: 'Renouvellement urbain',
    },
  ]

  return (
    <nav className={fr.cx('fr-col-md-3')}>
      <div className={styles.container}>
        {demographicSteps.map((step, index) => (
          <React.Fragment key={index}>
            <div className={styles.stepContainer}>
              <DemographicSettingsSimulationSideMenuStepNumber stepNumber={index + 1} path={step.path} allSteps={demographicSteps} />
              <DemographicSettingsSimulationSideMenuTitle
                title={step.titleText}
                path={step.path}
                stepNumber={index + 1}
                allSteps={demographicSteps}
              />
            </div>
            {index !== demographicSteps.length - 1 && (
              <div className={styles.stepDelimitor}>
                <div className={styles.badgeContainer}>
                  <UpdateDemographicSettingsGuideTag step={step} />
                </div>
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
    </nav>
  )
}
