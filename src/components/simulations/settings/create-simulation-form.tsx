'use client'

import Button from '@codegouvfr/react-dsfr/Button'
import { FC } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { parseAsInteger, parseAsString, useQueryStates } from 'nuqs'
import { useCreateSimulation } from '~/hooks/use-create-simulation'
import { ZInitSimulationDto } from '~/schemas/simulation'
import { TInitSimulationDto } from '~/schemas/simulation'
import { tss } from 'tss-react'
import { useBassinRates } from '~/app/(authenticated)/simulation/(creation)/(rates-provider)/taux-cibles-logements/rates-provider'

export const CreateSimulationForm: FC = () => {
  const { classes } = useStyles()
  const createSimulationForResults = useCreateSimulation()
  const createSimulationForBadHousing = useCreateSimulation({
    redirectUri: '/simulation/{{id}}/modifier/horizon-de-resorption',
  })
  const { rates } = useBassinRates()

  const [queryStates] = useQueryStates({
    epci: parseAsString,
    omphale: parseAsString,
    projection: parseAsInteger,
    region: parseAsString,
  })

  const {
    formState: { isValid },
    getValues,
    handleSubmit,
  } = useForm<TInitSimulationDto>({
    resolver: zodResolver(ZInitSimulationDto),
    values: {
      epci: Object.entries(rates).map(([epci]) => ({ code: epci })),
      scenario: {
        b2_scenario: queryStates.omphale as string,
        epcis: Object.entries(rates).reduce(
          (acc, [epci, rates]) => {
            acc[epci] = {
              b2_tx_rs: rates.txRS ?? undefined,
              b2_tx_vacance: rates.txLV ?? undefined,
            }
            return acc
          },
          {} as Record<string, TInitSimulationDto['scenario']['epcis'][string]>,
        ),
        projection: (queryStates.projection as number) ?? 2030,
      },
    },
  })

  const onSubmitForResults = async () => createSimulationForResults.mutateAsync(getValues())
  const onSubmitForBadHousing = async () => createSimulationForBadHousing.mutateAsync(getValues())

  return (
    <div className={classes.container}>
      <Button
        priority="secondary"
        onClick={handleSubmit(onSubmitForBadHousing)}
        disabled={!isValid || createSimulationForBadHousing.isPending}
      >
        Paramétrer le mal-logement
      </Button>
      <Button onClick={handleSubmit(onSubmitForResults)} disabled={!isValid || createSimulationForResults.isPending}>
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
