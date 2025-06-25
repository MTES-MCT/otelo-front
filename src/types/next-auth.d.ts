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
    firstName: z.string(),
    lastName: z.string(),
    sub: z.string(),
    hasAccess: z.boolean(),
    id: z.string(),
    provider: z.string(),
    role: z.enum(['ADMIN', 'USER']).optional(),
  }),
})

export type TSession = z.infer<typeof ZSession>

declare module 'next-auth' {
  interface Session extends TSession {}

  interface User {
    firstName: string
    lastName: string
    sub: string
    id: string
    email: string
    provider: string
    role?: 'ADMIN' | 'USER'
  }
}
