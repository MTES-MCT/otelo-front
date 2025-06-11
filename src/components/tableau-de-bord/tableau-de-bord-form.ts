import { z } from 'zod'

export const ZTableauDeBordForm = z.object({
  nextStep: z.string().min(1, { message: 'Veuillez sélectionner la prochaine étape' }),
  resultDate: z.string().min(1, { message: 'Veuillez sélectionner une date' }),
  selectedSimulations: z.array(z.string()).min(1, { message: 'Veuillez sélectionner au moins 1 simulation' }),
})

export type TTableauDeBordForm = z.infer<typeof ZTableauDeBordForm>
