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

export const ZChartData = z.object({
  code: z.string(),
  data: z.array(z.object({ value: z.number(), year: z.number() })),
  metadata: z.object({ max: z.number(), min: z.number() }),
})
export type TChartData = z.infer<typeof ZChartData>

export const ZChartDataResult = z.object({
  epcis: z.array(ZChartData),
})
export type TChartDataResult = z.infer<typeof ZChartDataResult>

export const ZResults = z.object({
  badQuality: ZCalculationResult,
  demographicEvolution: ZCalculationResult,
  epcisTotals: z.array(z.object({ epciCode: z.string(), total: z.number(), totalFlux: z.number(), totalStock: z.number() })),
  financialInadequation: ZCalculationResult,
  hosted: ZCalculationResult,
  newConstructions: ZChartDataResult,
  noAccomodation: ZCalculationResult,
  physicalInadequation: ZCalculationResult,
  renewalNeeds: ZCalculationResult,
  secondaryResidenceAccomodationEvolution: ZCalculationResult,
  sitadel: ZChartDataResult,
  socialParc: ZCalculationResult,
  total: z.number(),
  totalFlux: z.number(),
  totalStock: z.number(),
  vacantAccomodationEvolution: ZCalculationResult,
})

export type TResults = z.infer<typeof ZResults>
