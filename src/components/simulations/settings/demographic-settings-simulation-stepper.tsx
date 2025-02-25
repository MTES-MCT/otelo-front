'use client'

import { fr } from '@codegouvfr/react-dsfr'
import Stepper from '@codegouvfr/react-dsfr/Stepper'
import { usePathname } from 'next/navigation'
import { FC, useMemo } from 'react'

export const DemographicSettingsSimulationStepper: FC = () => {
  const pathname = usePathname()

  const stepperProps = useMemo(() => {
    switch (pathname) {
      case '/simulation/choix-du-territoire':
        return {
          currentStep: 1,
          nextTitle: "Déterminer l'horizon de temps",
          stepCount: 4,
          title: 'Choix du territoire',
        }
      case '/simulation/cadrage-temporel':
        return {
          currentStep: 2,
          nextTitle: 'Affinage du paramétrage',
          stepCount: 4,
          title: "Déterminer l'horizon de temps",
        }
      case '/simulation/parametrages-demographique':
        return {
          currentStep: 3,
          nextTitle: 'Cibler les taux de résidences secondaires et logements vacants',
          stepCount: 4,
          title: 'Affinage du paramétrage démographique',
        }
      case '/simulation/taux-cibles-logements':
        return {
          currentStep: 4,
          nextTitle: 'Validation de votre paramétrage',
          stepCount: 5,
          title: 'Cibler les taux de résidences secondaires et logements vacants',
        }
      case '/simulation/validation-parametrage':
        return {
          currentStep: 5,
          nextTitle: 'Résultat de la simulation',
          stepCount: 5,
          title: 'Validation de votre paramétrage',
        }
      default:
        return {
          currentStep: 1,
          nextTitle: "Déterminer l'horizon de temps",
          stepCount: 4,
          title: 'Choix du territoire',
        }
    }
  }, [pathname])

  return (
    <div
      className={fr.cx('fr-my-2w', 'fr-px-2w', 'fr-py-0-5v', 'fr-p-md-4w')}
      style={{ background: fr.colors.decisions.background.default.grey.default }}
    >
      <Stepper {...stepperProps} />
    </div>
  )
}
