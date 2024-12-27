'use client'

import Button from '@codegouvfr/react-dsfr/Button'
import { FC } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { parseAsFloat, parseAsInteger, parseAsString, useQueryStates } from 'nuqs'
import { useCreateSimulation } from '~/hooks/use-create-simulation'
import { ZInitSimulationDto } from '~/schemas/simulation'
import { TInitSimulationDto } from '~/schemas/simulation'
import { tss } from 'tss-react'

export const CreateSimulationForm: FC = () => {
  const { classes } = useStyles()
  const { mutateAsync } = useCreateSimulation()
  const [queryStates] = useQueryStates({
    epci: parseAsString,
    omphale: parseAsString,
    projection: parseAsInteger,
    q: parseAsString,
    region: parseAsString,
    tauxLV: parseAsFloat,
    tauxRS: parseAsFloat,
  })

  const {
    formState: { isValid },
    getValues,
    handleSubmit,
  } = useForm<TInitSimulationDto>({
    resolver: zodResolver(ZInitSimulationDto),
    values: {
      epci: { code: queryStates.epci as string, name: queryStates.q as string, region: queryStates.region as string },
      scenario: {
        b2_scenario: queryStates.omphale as string,
        b2_tx_rs: queryStates.tauxRS ?? undefined,
        b2_tx_vacance: queryStates.tauxLV ?? undefined,
        projection: queryStates.projection as number,
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
