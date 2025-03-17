import { z } from 'zod'
import { ZMetadata } from '~/schemas/demographic-evolution'

const ZPopulationEvolution = z.object({
  population: z.number(),
  year: z.number(),
})

const ZTerritoryPopulationData = z.object({
  data: z.array(ZPopulationEvolution),
  metadata: ZMetadata,
  epci: z.object({
    code: z.string(),
    name: z.string(),
  }),
})

export type TTerritoryPopulationData = z.infer<typeof ZTerritoryPopulationData>

export const ZRPDataTable = z.record(
  z
    .object({
      annualEvolution: z.record(
        z.object({
          percent: z.string(),
          value: z.number(),
        }),
      ),
      name: z.string(),
    })
    .and(
      z.record(
        z.object({
          value: z.number(),
        }),
      ),
    ),
)

export type TRPDataTable = z.infer<typeof ZRPDataTable>

export const ZRPPopulationEvolution = z.object({
  linearChart: z.record(z.string(), ZTerritoryPopulationData),
  tableData: ZRPDataTable,
})

export type TRPPopulationEvolution = z.infer<typeof ZRPPopulationEvolution>
