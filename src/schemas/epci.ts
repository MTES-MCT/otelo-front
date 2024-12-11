import { z } from 'zod'

export const ZEpci = z.object({
  code: z.string().max(9),
  name: z.string().min(1),
  region: z.string().max(2),
})

export type TEpci = z.infer<typeof ZEpci>
