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
  const { mutateAsync } = useCreateSimulation()
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
  const onSubmit = async () => mutateAsync(getValues())

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className={classes.container}>
        <Button disabled={!isValid} type="submit">
          Accéder au résultat
        </Button>
      </div>
    </form>
  )
}

const useStyles = tss.create({
  container: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
})
