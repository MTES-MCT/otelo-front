'use client'

import Button from '@codegouvfr/react-dsfr/Button'
import { zodResolver } from '@hookform/resolvers/zod'
import { FC } from 'react'
import { useForm } from 'react-hook-form'
import { tss } from 'tss-react'
import { useEpcisRates } from '~/app/(authenticated)/simulation/(creation)/(rates-provider)/taux-cibles-logements/rates-provider'
import { useSimulationSettings } from '~/app/(authenticated)/simulation/[id]/modifier/(demographic-modification)/simulation-scenario-modification-provider'
import { useUpdateDemographicSimulation } from '~/hooks/use-update-simulation'
import { TUpdateDemographicSimulationDto, ZUpdateDemographicSimulationDto } from '~/schemas/simulation'

export const UpdateSimulationForm: FC<{ id: string }> = ({ id }) => {
  const { classes } = useStyles()
  const updateSimulationForResults = useUpdateDemographicSimulation()

  const { rates } = useEpcisRates()

  const { simulationSettings } = useSimulationSettings()
  const { b2_scenario, projection } = simulationSettings

  const {
    formState: { isValid },
    getValues,
    handleSubmit,
  } = useForm<TUpdateDemographicSimulationDto>({
    resolver: zodResolver(ZUpdateDemographicSimulationDto),
    values: {
      id,
      scenario: {
        id: simulationSettings.id,
        b2_scenario,
        epciScenarios: Object.entries(rates).reduce(
          (acc, [epci, rates]) => {
            acc[epci] = {
              b2_tx_rs: rates.txRS ?? undefined,
              b2_tx_vacance: rates.txLV ?? undefined,
            }
            return acc
          },
          {} as Record<string, TUpdateDemographicSimulationDto['scenario']['epciScenarios'][string]>,
        ),
        projection,
      },
    },
  })

  const onSubmitForResults = async () => updateSimulationForResults.mutateAsync(getValues())

  return (
    <div className={classes.container}>
      <Button onClick={handleSubmit(onSubmitForResults)} disabled={!isValid || updateSimulationForResults.isPending}>
        Accéder au résultat
      </Button>
    </div>
  )
}

const useStyles = tss.create({
  container: {
    display: 'flex',
    gap: '1rem',
    justifyContent: 'flex-end',
  },
})
