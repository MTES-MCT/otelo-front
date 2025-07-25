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

export const ZEpciCalculationResult = z.object({ epciCode: z.string(), value: z.number(), prorataValue: z.number() })
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

export const ZFlowRequirementChartData = z.object({
  code: z.string(),
  data: z.object({
    parcEvolution: z.record(z.number()),
    housingNeeds: z.record(z.number()),
    surplusHousing: z.record(z.number()),
    peakYear: z.number(),
  }),
  totals: z.object({
    demographicEvolution: z.number(),
    renewalNeeds: z.number(),
    secondaryResidenceAccomodationEvolution: z.number(),
    surplusHousing: z.number(),
    housingNeeds: z.number(),
    vacantAccomodation: z.number(),
    shortTermVacantAccomodation: z.number(),
    longTermVacantAccomodation: z.number(),
  }),
  metadata: z.object({ max: z.number(), min: z.number() }),
})
export type TFlowRequirementChartData = z.infer<typeof ZFlowRequirementChartData>

export const ZFlowRequirementChartDataResult = z.object({
  epcis: z.array(ZFlowRequirementChartData),
})
export type TFlowRequirementChartDataResult = z.infer<typeof ZFlowRequirementChartDataResult>

export const ZResults = z.object({
  badQuality: ZCalculationResult,
  epcisTotals: z.array(z.object({ epciCode: z.string(), total: z.number(), totalFlux: z.number(), totalStock: z.number() })),
  financialInadequation: ZCalculationResult,
  hosted: ZCalculationResult,
  noAccomodation: ZCalculationResult,
  physicalInadequation: ZCalculationResult,
  flowRequirement: ZFlowRequirementChartDataResult,
  sitadel: ZChartDataResult,
  socialParc: ZCalculationResult,
  total: z.number(),
  totalFlux: z.number(),
  totalStock: z.number(),
  vacantAccomodation: z.number(),
})

export type TResults = z.infer<typeof ZResults>
