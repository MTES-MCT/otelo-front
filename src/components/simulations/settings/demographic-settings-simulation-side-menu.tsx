'use client'

import { fr } from '@codegouvfr/react-dsfr'
import React from 'react'
import { DemographicSettingsCreationGuideTag } from '~/components/simulations/creation-guide/demographic-settings-creation-guide-tag'
import { useEpcis } from '~/hooks/use-epcis'
import styles from './simulation-side-menu.module.css'

export default function DemographicSettingsSimulationSideMenu() {
  const { data: epcis } = useEpcis()
  const demographicSteps = [
    {
      data: epcis?.map((epci) => epci.name),
      label: 'Territoire à étudier',
      path: '/simulation/choix-du-territoire',
      queryKeys: ['epci', 'epcis'],
      title: <span>Choix du territoire</span>,
    },
    {
      label: 'Cadrage temporel de la simulation',
      path: '/simulation/cadrage-temporel',
      queryKeys: ['projection'],
      title: <span>Déterminer l&apos;horizon de temps</span>,
    },
    {
      label: "Scénario de l'évolution démographique",
      path: '/simulation/parametrages-demographique',
      queryKeys: ['omphale'],
      title: <span>Paramétrage évolution démographique</span>,
    },
    {
      label: 'Taux de résidences secondaires / logements vacants',
      path: '/simulation/taux-cibles-logements',
      queryKeys: ['tauxRS'],
      title: <span>Paramétrage résidences secondaires et logements vacants</span>,
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
            <div className={styles.stepDelimitor}>
              <div className={styles.badgeContainer}>
                <DemographicSettingsCreationGuideTag step={step} />
              </div>
            </div>
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
