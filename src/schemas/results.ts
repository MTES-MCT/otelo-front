import { z } from 'zod'

export const ZDemographicEvolution = z.object({
  data: z.array(
    z.object({
      value: z.number(),
      year: z.number(),
    }),
  ),
  metadata: z.object({
    data: z.object({
      max: z.number(),
      min: z.number(),
    }),
    period: z.object({
      endYear: z.number(),
      startYear: z.number(),
    }),
  }),
})

export type TDemographicEvolutionOmphale = z.infer<typeof ZDemographicEvolution>

export const ZResults = z.object({
  demographicEvolution: z.object({
    currentProjection: z.number(),
    futureProjections: ZDemographicEvolution.optional(),
  }),
  total: z.number(),
  totalFlux: z.number(),
  totalStock: z.number(),
})

export type TResults = z.infer<typeof ZResults>
