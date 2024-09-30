'use client'

import Button from '@codegouvfr/react-dsfr/Button'
import { FC } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { parseAsInteger, parseAsString, useQueryStates } from 'nuqs'
import { useCreateSimulation } from '~/hooks/use-create-simulation'
import { ZInitSimulationDto } from '~/schemas/simulation'
import { TInitSimulationDto } from '~/schemas/simulation'

export const CreateSimulationForm: FC = () => {
  const { mutateAsync } = useCreateSimulation()
  const [queryStates] = useQueryStates({
    epci: parseAsString,
    omphale: parseAsString,
    projection: parseAsInteger,
    q: parseAsString,
    region: parseAsString,
  })

  const {
    formState: { isValid },
    getValues,
    handleSubmit,
  } = useForm<TInitSimulationDto>({
    resolver: zodResolver(ZInitSimulationDto),
    values: {
      epci: { code: queryStates.epci as string, name: queryStates.q as string, region: queryStates.region as string },
      scenario: { b2_scenario_omphale: queryStates.omphale as string, projection: queryStates.projection as number },
    },
  })

  const onSubmit = async () => mutateAsync(getValues())

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Button disabled={!isValid} type="submit">
          Accéder au résultat
        </Button>
      </div>
    </form>
  )
}
