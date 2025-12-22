'use client'

import { parseAsArrayOf, parseAsString, useQueryState } from 'nuqs'
import React from 'react'
import { DemographicSettingsGuideTag } from '~/components/simulations/creation-guide/demographic-settings-creation-guide-tag'
import { useEpcis } from '~/hooks/use-epcis'
import { DemographicSettingsSimulationSideMenuStepNumber } from './demographic-settings-simulation-side-menu-step-number'
import { DemographicSettingsSimulationSideMenuTitle } from './demographic-settings-simulation-side-menu-title'
import styles from './simulation-side-menu.module.css'

export default function DemographicSettingsSimulationSideMenu() {
  const [epcisParam] = useQueryState('epcis', parseAsArrayOf(parseAsString).withDefault([]))
  const { data: epcis } = useEpcis(epcisParam)

  // Explicitly check the URL params, not the fetched data
  const epciNames = epcisParam.length > 0 && epcis ? epcis.map((epci) => epci.name) : undefined

  const demographicSteps = [
    {
      data: epciNames,
      path: '/simulation/choix-du-territoire',
      queryKeys: ['epci', 'epcis'],
      titleText: 'Choix du territoire',
    },
    {
      path: '/simulation/cadrage-temporel',
      queryKeys: ['projection'],
      titleText: 'Horizon de temps',
      iconId: 'ri-time-line',
    },
    {
      path: '/simulation/parametrages-demographique',
      queryKeys: ['omphale'],
      titleText: 'Projection démographique',
    },
    {
      path: '/simulation/taux-cibles-logements-vacants',
      queryKeys: [],
      titleText: 'Logements vacants longue durée',
    },
    {
      path: '/simulation/taux-cibles-residences-secondaires',
      queryKeys: [],
      titleText: 'Résidences secondaires',
    },
    {
      path: '/simulation/taux-restructuration-disparition',
      queryKeys: [],
      titleText: 'Renouvellement urbain',
    },
  ]

  return (
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
          {index !== demographicSteps.length && (
            <div className={styles.stepDelimitor}>
              <div className={styles.badgeContainer}>
                <DemographicSettingsGuideTag step={step} />
              </div>
            </div>
          )}
        </React.Fragment>
      ))}
    </div>
  )
}
