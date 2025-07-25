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

export const ZSignUp = z
  .object({
    firstname: z.string().min(2, 'Le prénom doit contenir au moins 2 caractères'),
    lastname: z.string().min(2, 'Le nom doit contenir au moins 2 caractères'),
    email: z.string().email('Adresse email invalide'),
    password: z.string().min(8, 'Le mot de passe doit contenir au moins 8 caractères'),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Les mots de passe ne correspondent pas',
    path: ['confirmPassword'],
  })

export type TSignUp = z.infer<typeof ZSignUp>
