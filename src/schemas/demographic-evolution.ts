import { z } from 'zod'

const ZMetadata = z.object({
  max: z.number(),
  min: z.number(),
})

export const ZOmphaleDemographicEvolution = z.object({
  data: z.array(
    z.object({
      centralB: z.number(),
      centralC: z.number(),
      centralH: z.number(),
      pbB: z.number(),
      pbC: z.number(),
      pbH: z.number(),
      phB: z.number(),
      phC: z.number(),
      phH: z.number(),
      year: z.number(),
    }),
  ),
  metadata: ZMetadata,
})

export type TOmphaleDemographicEvolution = z.infer<typeof ZOmphaleDemographicEvolution>

export const ZPopulationDemographicEvolution = z.object({
  data: z.array(
    z.object({
      basse: z.number(),
      central: z.number(),
      haute: z.number(),
      year: z.number(),
    }),
  ),
  metadata: ZMetadata,
})

export type TPopulationDemographicEvolution = z.infer<typeof ZPopulationDemographicEvolution>
