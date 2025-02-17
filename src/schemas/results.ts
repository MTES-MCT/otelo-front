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

export const ZEpciCalculationResult = z.object({ epciCode: z.string(), value: z.number() })
export type TEpciCalculationResult = z.infer<typeof ZEpciCalculationResult>

export const ZEpciTotalCalculationResult = z.object({
  epciCode: z.string(),
  total: z.number(),
  totalFlux: z.number(),
  totalStock: z.number(),
})
export type TEpciTotalCalculationResult = z.infer<typeof ZEpciTotalCalculationResult>

export const ZCalculationResult = z.object({
  epcis: z.array(ZEpciCalculationResult),
  total: z.number(),
})

export type TCalculationResult = z.infer<typeof ZCalculationResult>

export const ZResults = z.object({
  badQuality: ZCalculationResult,
  demographicEvolution: ZCalculationResult,
  epcisTotals: z.array(z.object({ epciCode: z.string(), total: z.number(), totalFlux: z.number(), totalStock: z.number() })),
  financialInadequation: ZCalculationResult,
  hosted: ZCalculationResult,
  noAccomodation: ZCalculationResult,
  physicalInadequation: ZCalculationResult,
  renewalNeeds: ZCalculationResult,
  secondaryResidenceAccomodationEvolution: ZCalculationResult,
  socialParc: ZCalculationResult,
  total: z.number(),
  totalFlux: z.number(),
  totalStock: z.number(),
  vacantAccomodationEvolution: ZCalculationResult,
})

export type TResults = z.infer<typeof ZResults>
