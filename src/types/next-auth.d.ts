import 'next-auth'
import { z } from 'zod'

export const ZSession = z.object({
  accessToken: z.string(),
  error: z.string().nullable(),
  expires: z.string(),
  refreshToken: z.string(),
  user: z.object({
    email: z.string().nullable(),
    image: z.string().nullable(),
    name: z.string().nullable(),
    role: z.enum(['ADMIN', 'USER']),
  }),
})

export type TSession = z.infer<typeof ZSession>

declare module 'next-auth' {
  interface Session extends TSession {}
}
