import z from 'zod'

export const ZRequestPowerpoint = z
  .object({
    nextStep: z.string().min(1, { message: 'Veuillez sélectionner la prochaine étape' }),
    resultDate: z
      .string()
      .min(1, { message: 'Veuillez sélectionner une date' })
      .refine(
        (val) => {
          const selectedDate = new Date(val)
          const today = new Date()
          today.setHours(0, 0, 0, 0)
          return selectedDate >= today
        },
        { message: "La date ne peut pas être antérieure à aujourd'hui" },
      ),
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
    periodEnd: z
      .string()
      .regex(/^\d{4}$/, { message: 'Veuillez entrer une année valide (YYYY)' })
      .refine((val) => parseInt(val) <= 2050, { message: "L'année de fin ne peut pas être supérieure à 2050" }),
    epci: z.object({
      code: z.string(),
      name: z.string().min(1, { message: 'Veuillez sélectionner un EPCI' }),
    }),
  })
  .superRefine((data, ctx) => {
    const startYear = parseInt(data.periodStart)
    const endYear = parseInt(data.periodEnd)

    if (startYear > endYear) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "L'année de début ne peut pas être supérieure à l'année de fin",
        path: ['periodStart'],
      })
    }

    if (endYear < startYear) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "L'année de fin ne peut pas être inférieure à l'année de début",
        path: ['periodEnd'],
      })
    }

    if (startYear === endYear) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Les années de début et de fin doivent être différentes',
        path: ['periodEnd'],
      })
    }
  })

export type TRequestPowerpoint = z.infer<typeof ZRequestPowerpoint>
