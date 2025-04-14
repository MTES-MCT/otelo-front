'use client'

import Button from '@codegouvfr/react-dsfr/Button'
import { zodResolver } from '@hookform/resolvers/zod'
import { FC } from 'react'
import { useForm } from 'react-hook-form'
import { useExportSimulationSettings } from '~/hooks/use-export-simulation-settings'
import { TSimulationExportDto, ZSimulationExportDto } from '~/schemas/simulation'

export const ExportSimulationSettings: FC<{ id: string }> = ({ id }) => {
  const { isPending, mutateAsync } = useExportSimulationSettings()

  const { handleSubmit } = useForm<TSimulationExportDto>({
    resolver: zodResolver(ZSimulationExportDto),
    values: { id },
  })

  const onSubmit = async () => await mutateAsync(id)

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Button iconId="ri-download-line" priority="tertiary" type="submit" disabled={isPending}>
        {isPending ? 'Export en cours...' : 'Exporter mon scénario'}
      </Button>
    </form>
  )
}
