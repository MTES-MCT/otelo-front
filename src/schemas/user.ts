import { z } from 'zod'
import { ZCommonDateFields } from '~/schemas/common-date-fields'

export const ZUser = ZCommonDateFields.extend({
  email: z.string().email(),
  firstname: z.string(),
  id: z.string(),
  lastLoginAt: z.date(),
  lastname: z.string(),
  role: z.enum(['ADMIN', 'USER']),
  sub: z.string(),
  hasAccess: z.boolean(),
  engaged: z.boolean(),
})

export type TUser = z.infer<typeof ZUser>
