import { z } from 'zod'

const ZMetadata = z.object({
  max: z.number(),
  min: z.number(),
})

export const ZDemographicEvolution = z.object({
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

export type TDemographicEvolution = z.infer<typeof ZDemographicEvolution>
