import { z } from 'zod'

const ZAccommodationRates = z.object({
  vacancyRate: z.number(),
  longTermVacancyRate: z.number(),
  shortTermVacancyRate: z.number(),
  txRs: z.number(),
  vacancy: z.object({
    nbAccommodation: z.number(),
    year: z.number().optional(),
  }),
})

export type TAccommodationRates = z.infer<typeof ZAccommodationRates>

export const ZEpcisAccommodationRates = z.record(z.string(), ZAccommodationRates)

export type TEpcisAccommodationRates = z.infer<typeof ZEpcisAccommodationRates>
