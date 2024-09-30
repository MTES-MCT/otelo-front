import { z } from 'zod'

export const ZDemographicEvolutionOmphale = z.object({
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

export type TDemographicEvolutionOmphale = z.infer<typeof ZDemographicEvolutionOmphale>

export const ZResults = z.object({
  demographicEvolution: z.object({
    currentProjection: z.number(),
    futureProjections: ZDemographicEvolutionOmphale,
  }),
})

export type TResults = z.infer<typeof ZResults>
