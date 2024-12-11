import { z } from 'zod'
import { ZCommonDateFields } from '~/schemas/common-date-fields'

export enum ESourceB11 {
  RP = 'RP',
  SNE = 'SNE',
}

export const ZScenario = ZCommonDateFields.extend({
  b11_etablissement: z.array(z.string()),
  b11_fortune: z.boolean(),
  b11_hotel: z.boolean(),
  b11_part_etablissement: z.number(),
  b11_sa: z.boolean(),
  b12_cohab_interg_subie: z.number(),
  b12_heberg_gratuit: z.boolean(),
  b12_heberg_particulier: z.boolean(),
  b12_heberg_temporaire: z.boolean(),
  b13_acc: z.boolean(),
  b13_plp: z.boolean(),
  b13_taux_effort: z.number(),
  b13_taux_reallocation: z.number(),
  b14_confort: z.string(),
  b14_occupation: z.string(),
  b14_qualite: z.string(),
  b14_taux_reallocation: z.number(),
  b15_loc_hors_hlm: z.boolean(),
  b15_proprietaire: z.boolean(),
  b15_surocc: z.string(),
  b15_taux_reallocation: z.number(),
  b17_motif: z.union([z.literal('Tout'), z.literal('Env'), z.literal('Assis'), z.literal('Rappr'), z.literal('Trois')]),
  b1_horizon_resorption: z.number(),
  b2_scenario_omphale: z.string(),
  b2_tx_disparition: z.number(),
  b2_tx_restructuration: z.number(),
  b2_tx_rs: z.number(),
  b2_tx_vacance: z.number(),
  id: z.string(),
  isConfidential: z.boolean(),
  projection: z.number(),
  source_b11: z.nativeEnum(ESourceB11),
  source_b14: z.union([z.literal('RP'), z.literal('Filo'), z.literal('FF')]),
  source_b15: z.union([z.literal('RP'), z.literal('Filo')]),
})

export type TScenario = z.infer<typeof ZScenario>
