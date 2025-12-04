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
      description: 'Affinage du paramétrage',
      stepCount: modifierStepCount,
      title: "Déterminer l'horizon de temps",
    },
    'parametrages-demographique': {
      currentStep: 2,
      description: "Les choix de projection démographique s'appliquent à l'ensemble des EPCI inclus dans le territoire d'étude.",
      stepCount: modifierStepCount,
      title: 'Affiner la projection démographique',
    },
    'taux-cibles-logements': {
      currentStep: 3,
      description: 'Validation de votre paramétrage',
      stepCount: modifierStepCount,
      title: 'Cibler les taux de résidences secondaires et logements vacants',
    },
    'taux-restructuration-disparition': {
      currentStep: 4,
      description: 'Validation de votre paramétrage',
      stepCount: modifierStepCount,
      title: 'Paramétrage des dynamiques de renouvellement du parc de logements',
    },
    'validation-parametrage': {
      currentStep: 4,
      description: 'Résultat de la simulation',
      stepCount: modifierStepCount,
      title: 'Validation de votre paramétrage',
    },
  },
  creation: {
    'choix-du-territoire': {
      currentStep: 1,
      stepCount: creationStepCount,
      title: 'Choix du territoire',
    },
    'cadrage-temporel': {
      currentStep: 2,
      description: "Les futurs paramétrages seront appliqués à l'horizon temporel choisi",
      stepCount: creationStepCount,
      title: "Déterminer l'horizon de temps",
    },
    'parametrages-demographique': {
      currentStep: 3,
      description: "Les choix de projection démographique s'appliquent à l'ensemble des EPCI inclus dans le territoire d'étude.",
      stepCount: creationStepCount,
      title: 'Affiner la projection démographique',
    },
    'taux-cibles-logements': {
      currentStep: 4,
      description: 'Validation de votre paramétrage',
      stepCount: creationStepCount,
      title: 'Cibler les taux de résidences secondaires et logements vacants',
    },
    'taux-restructuration-disparition': {
      currentStep: 5,
      description: 'Validation de votre paramétrage',
      stepCount: creationStepCount,
      title: 'Paramétrage des dynamiques de renouvellement du parc de logements',
    },
    'validation-parametrage': {
      currentStep: 6,
      description: 'Résultat de la simulation',
      stepCount: creationStepCount,
      title: 'Validation de votre paramétrage',
    },
  },
}

const DEFAULT_CONFIG = {
  modifier: {
    currentStep: 1,
    stepCount: 4,
    title: "Déterminer l'horizon de temps",
  },
  creation: {
    currentStep: 1,
    stepCount: 4,
    title: 'Choix du territoire',
  },
}

export const DemographicSettingsSimulationStepper: FC = () => {
  const pathname = usePathname()
  const isModifierPath = pathname.includes('modifier')

  const config = useMemo(() => {
    const dynamicPathname = pathname.split('/').pop()
    const configKey = isModifierPath ? 'modifier' : 'creation'

    return STEPPER_CONFIG[configKey][dynamicPathname as keyof (typeof STEPPER_CONFIG)[typeof configKey]] || DEFAULT_CONFIG[configKey]
  }, [pathname, isModifierPath])

  return (
    <div
      className="fr-px-2w fr-py-0-5v fr-px-md-4w fr-pt-md-4w fr-pb-5w"
      style={{ background: fr.colors.decisions.background.default.grey.default }}
    >
      <Stepper {...config} />
      {config.description && <div className="fr-text--sm fr-text-mention--grey fr-mb-0">{config.description}</div>}
    </div>
  )
}
