'use client'

import { fr } from '@codegouvfr/react-dsfr'
import styles from './simulation-side-menu.module.css'
import React from 'react'
import { CreationGuideTag } from '~/components/simulations/creation-guide/creation-guide-tag'

export default function SimulationSideMenu() {
  const steps = [
    {
      label: 'Territoire à étudier',
      path: '/simulation/choix-du-territoire',
      queryKey: 'q',
      title: 'Choix du territoire',
    },
    {
      label: 'Cadrage temporel de la simulation',
      path: '/simulation/cadrage-temporel',
      queryKey: 'projection',
      title: "Déterminer l'horizon de temps",
    },
    {
      label: "Scénario de l'évolution démographique",
      path: '/simulation/parametrages-demographique',
      queryKey: 'omphale',
      title: 'Paramétrage évolution démographique',
    },
    {
      disabled: true,
      label: 'Taux de résidences secondaires',
      path: '/simulation/parametrages-demographique',
      queryKey: 'parametrage',
      title: 'Paramétrage résidences secondaires',
    },
    {
      disabled: true,
      label: 'Taux de logements vacants',
      path: '/simulation/parametrages-demographique',
      queryKey: 'parametrage',
      title: 'Paramétrage vacance',
    },
  ]

  return (
    <nav className={fr.cx('fr-col-md-3')}>
      <div className={styles.container}>
        {steps.map((step, index) => (
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
                  <CreationGuideTag step={step} />
                </div>
              </div>
            }
          </React.Fragment>
        ))}
        <div className={styles.stepContainer}>
          <div className={styles.stepNumber}>{steps.length + 1}</div>
          <span>Validation de votre paramétrage</span>
        </div>
      </div>
    </nav>
  )
}
