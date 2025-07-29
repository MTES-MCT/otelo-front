'use client'

import { fr } from '@codegouvfr/react-dsfr'
import Stepper from '@codegouvfr/react-dsfr/Stepper'
import { usePathname } from 'next/navigation'
import { FC, useMemo } from 'react'

const modifierStepCount = 5
const creationStepCount = 6
const STEPPER_CONFIG = {
  modifier: {
    'cadrage-temporel': {
      currentStep: 1,
      nextTitle: 'Affinage du paramétrage',
      stepCount: modifierStepCount,
      title: "Déterminer l'horizon de temps",
    },
    'parametrages-demographique': {
      currentStep: 2,
      nextTitle: 'Cibler les taux de résidences secondaires et logements vacants',
      stepCount: modifierStepCount,
      title: 'Affinage du paramétrage démographique',
    },
    'taux-cibles-logements': {
      currentStep: 3,
      nextTitle: 'Validation de votre paramétrage',
      stepCount: modifierStepCount,
      title: 'Cibler les taux de résidences secondaires et logements vacants',
    },
    'taux-restructuration-disparition': {
      currentStep: 4,
      nextTitle: 'Validation de votre paramétrage',
      stepCount: modifierStepCount,
      title: 'Paramétrage des dynamiques de renouvellement du parc de logements',
    },
    'validation-parametrage': {
      currentStep: 4,
      nextTitle: 'Résultat de la simulation',
      stepCount: modifierStepCount,
      title: 'Validation de votre paramétrage',
    },
  },
  creation: {
    'choix-du-territoire': {
      currentStep: 1,
      nextTitle: "Déterminer l'horizon de temps",
      stepCount: creationStepCount,
      title: 'Choix du territoire',
    },
    'cadrage-temporel': {
      currentStep: 2,
      nextTitle: 'Affinage du paramétrage',
      stepCount: creationStepCount,
      title: "Déterminer l'horizon de temps",
    },
    'parametrages-demographique': {
      currentStep: 3,
      nextTitle: 'Cibler les taux de résidences secondaires et logements vacants',
      stepCount: creationStepCount,
      title: 'Affinage du paramétrage démographique',
    },
    'taux-cibles-logements': {
      currentStep: 4,
      nextTitle: 'Validation de votre paramétrage',
      stepCount: creationStepCount,
      title: 'Cibler les taux de résidences secondaires et logements vacants',
    },
    'taux-restructuration-disparition': {
      currentStep: 5,
      nextTitle: 'Validation de votre paramétrage',
      stepCount: creationStepCount,
      title: 'Paramétrage des dynamiques de renouvellement du parc de logements',
    },
    'validation-parametrage': {
      currentStep: 6,
      nextTitle: 'Résultat de la simulation',
      stepCount: creationStepCount,
      title: 'Validation de votre paramétrage',
    },
  },
}

const DEFAULT_CONFIG = {
  modifier: {
    currentStep: 1,
    nextTitle: 'Affinage du paramétrage',
    stepCount: 4,
    title: "Déterminer l'horizon de temps",
  },
  creation: {
    currentStep: 1,
    nextTitle: "Déterminer l'horizon de temps",
    stepCount: 4,
    title: 'Choix du territoire',
  },
}

export const DemographicSettingsSimulationStepper: FC = () => {
  const pathname = usePathname()
  const isModifierPath = pathname.includes('modifier')

  const stepperProps = useMemo(() => {
    const dynamicPathname = pathname.split('/').pop()
    const configKey = isModifierPath ? 'modifier' : 'creation'

    const config = STEPPER_CONFIG[configKey][dynamicPathname as keyof (typeof STEPPER_CONFIG)[typeof configKey]]
    return config || DEFAULT_CONFIG[configKey]
  }, [pathname, isModifierPath])

  return (
    <div
      className={fr.cx('fr-my-2w', 'fr-px-2w', 'fr-py-0-5v', 'fr-p-md-4w')}
      style={{ background: fr.colors.decisions.background.default.grey.default }}
    >
      <Stepper {...stepperProps} />
    </div>
  )
}
