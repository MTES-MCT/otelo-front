'use client'

import Input from '@codegouvfr/react-dsfr/Input'
import { FC } from 'react'
import { tss } from 'tss-react'
import { useSimulationSettings } from '~/app/(authenticated)/simulation/[id]/modifier/(demographic-modification)/simulation-scenario-modification-provider'
import { ModifyLongTermAccomodationRange } from '~/components/simulations/settings/modify-long-term-accomodation-range'

type ModifyVacancyAccommodationRatesInputProps = {
  epci: string
}

export const ModifyVacancyAccommodationRatesInput: FC<ModifyVacancyAccommodationRatesInputProps> = ({ epci }) => {
  const { simulationSettings } = useSimulationSettings()
  const { classes } = useStyles()
  const ratesByEpci = simulationSettings.epciScenarios[epci]
  const shortTermVacancyRate = ratesByEpci.shortTermVacancyRate
  const longTermVacancyRate = ratesByEpci.longTermVacancyRate

  return (
    <div className={classes.container}>
      <Input
        disabled
        iconId="ri-percent-line"
        label="Taux cible de logements vacants de courte durée"
        nativeInputProps={{
          type: 'text',
          value: `${Number(shortTermVacancyRate * 100).toFixed(2)}`,
        }}
      />
      <div className={classes.longTermRateContainer}>
        <div className={classes.flex}>
          <Input
            disabled
            iconId="ri-percent-line"
            label="Taux cible de logements vacants de longue durée"
            nativeInputProps={{
              type: 'text',
              value: `${Number(longTermVacancyRate * 100).toFixed(2)}`,
            }}
          />
        </div>
        <div className={classes.flex}>
          <ModifyLongTermAccomodationRange epci={epci} />
        </div>
      </div>
    </div>
  )
}

const useStyles = tss.create({
  container: {
    flexDirection: 'column',
    display: 'flex',
    gap: '1rem',
  },
  longTermRateContainer: {
    display: 'flex',
    gap: '1rem',
  },
  flex: {
    flex: 1,
  },
})
