import { z } from 'zod'
import { ZMetadata } from '~/schemas/demographic-evolution'

const ZPopulationEvolution = z.object({
  population: z.number(),
  year: z.number(),
})

const ZTerritoryPopulationData = z.object({
  data: z.array(ZPopulationEvolution),
  metadata: ZMetadata,
})

export type TTerritoryPopulationData = z.infer<typeof ZTerritoryPopulationData>

const ZBarChartData = z
  .object({
    year: z.number(),
  })
  .and(z.record(z.string(), z.number()))

export const ZRPPopulationEvolution = z.object({
  barChart: z.array(ZBarChartData),
  linearChart: z.record(z.string(), ZTerritoryPopulationData),
})

export type TRPPopulationEvolution = z.infer<typeof ZRPPopulationEvolution>
