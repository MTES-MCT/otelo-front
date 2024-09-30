import { z } from 'zod'

export const ZContactForm = z.object({
  consent: z.boolean(),
  email: z.string().email(),
  firstname: z.string().min(1).optional(),
  lastname: z.string().min(1).optional(),
  message: z.string().min(10),
  subject: z.string().min(1),
})

export type TContactForm = z.infer<typeof ZContactForm>
