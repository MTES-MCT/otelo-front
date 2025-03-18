import { z } from 'zod'
import { ZMetadata } from '~/schemas/demographic-evolution'

const ZPopulationEvolution = z.object({
  population: z.number(),
  year: z.number(),
})

const ZTerritoryPopulationData = z.object({
  data: z.array(ZPopulationEvolution),
  epci: z.object({
    code: z.string(),
    name: z.string(),
  }),
  metadata: ZMetadata,
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

const ZDemographicProjectionDataTableRow = z.object({
  '2021': z.object({
    basse: z.number(),
    central: z.number(),
    haute: z.number(),
  }),
  '2030': z.object({
    basse: z.number(),
    central: z.number(),
    haute: z.number(),
  }),
  '2040': z.object({
    basse: z.number(),
    central: z.number(),
    haute: z.number(),
  }),
  '2050': z.object({
    basse: z.number(),
    central: z.number(),
    haute: z.number(),
  }),
  annualEvolution: z.record(
    z.object({
      basse: z.object({
        percent: z.string(),
        value: z.number(),
      }),
      central: z.object({
        percent: z.string(),
        value: z.number(),
      }),
      haute: z.object({
        percent: z.string(),
        value: z.number(),
      }),
    }),
  ),
  name: z.string(),
})

export type TDemographicProjectionDataTableRow = z.infer<typeof ZDemographicProjectionDataTableRow>

export const ZDemographicProjectionDataTable = z.record(ZDemographicProjectionDataTableRow)

export type TDemographicProjectionDataTable = z.infer<typeof ZDemographicProjectionDataTable>

const ZDemographicProjectionEvolutionData = z.object({
  data: z.array(z.object({ basse: z.number(), central: z.number(), haute: z.number(), year: z.number() })),
  epci: z.object({
    code: z.string(),
    name: z.string(),
  }),
  metadata: ZMetadata,
})

export const ZDemographicProjectionEvolution = z.object({
  linearChart: z.record(z.string(), ZDemographicProjectionEvolutionData),
  tableData: ZDemographicProjectionDataTable,
})

export type TDemographicProjectionEvolution = z.infer<typeof ZDemographicProjectionEvolution>
