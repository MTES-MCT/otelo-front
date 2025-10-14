import z from 'zod'

export const ZRequestPowerpoint = z.object({
  nextStep: z.string().min(1, { message: 'Veuillez sélectionner la prochaine étape' }),
  resultDate: z.string().min(1, { message: 'Veuillez sélectionner une date' }),
  selectedSimulations: z
    .array(z.string())
    .min(1, { message: 'Veuillez sélectionner au moins 1 simulation' })
    .max(3, { message: 'Vous ne pouvez sélectionner que 3 simulations maximum' }),
  privilegedSimulation: z.string().min(1, { message: 'Veuillez sélectionner un scénario privilégié' }),
  documentType: z.string().min(1, { message: 'Veuillez sélectionner un type de document' }),
  periodStart: z
    .string()
    .regex(/^\d{4}$/, { message: 'Veuillez entrer une année valide (YYYY)' })
    .refine((val) => parseInt(val) >= 2021, { message: "L'année de début doit être supérieure ou égale à 2021" }),
  periodEnd: z.string().regex(/^\d{4}$/, { message: 'Veuillez entrer une année valide (YYYY)' }),
  epci: z.object({
    code: z.string(),
    name: z.string().min(1, { message: 'Veuillez sélectionner un EPCI' }),
  }),
})

export type TRequestPowerpoint = z.infer<typeof ZRequestPowerpoint>
