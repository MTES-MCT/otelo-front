import { z } from 'zod'

const ZAccommodationRates = z.object({
  txLv: z.number(),
  txRs: z.number(),
  vacancy: z.object({
    nbAccommodation: z.number(),
    txLvLongue: z.number(),
  }),
})

export type TAccommodationRates = z.infer<typeof ZAccommodationRates>

export const ZEpcisAccommodationRates = z.record(z.string(), ZAccommodationRates)

export type TEpcisAccommodationRates = z.infer<typeof ZEpcisAccommodationRates>
