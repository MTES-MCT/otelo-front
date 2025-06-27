import { z } from 'zod'
import { ZCommonDateFields } from '~/schemas/common-date-fields'
import { ZEpci } from '~/schemas/epci'
import { ZResults } from '~/schemas/results'
import { ZScenario } from '~/schemas/scenario'

export const ZSimulation = ZCommonDateFields.extend({
  datasourceId: z.string(),
  epciCode: z.string(),
  id: z.string(),
  name: z.string(),
  scenarioId: z.string(),
  userId: z.string(),
})

export type TSimulation = z.infer<typeof ZSimulation>

export const ZSimulationWithRelations = ZSimulation.pick({
  createdAt: true,
  name: true,
  id: true,
  updatedAt: true,
}).extend({
  epcis: z.array(ZEpci),
  scenario: ZScenario.pick({ b2_scenario: true, projection: true }),
})

export type TSimulationWithRelations = z.infer<typeof ZSimulationWithRelations>

export const ZInitSimulationDto = z.object({
  name: z.string().nonempty('Veuillez donner un nom pour cette simulation').max(100, 'Le nom ne doit pas dépasser 100 caractères'),
  epci: z.array(z.object({ code: z.string() })),
  scenario: z.object({
    b2_scenario: z.string(),
    epcis: z.record(
      z.string(),
      z.object({
        b2_tx_rs: z.number().optional(),
        b2_tx_vacance: z.number().optional(),
      }),
    ),
    projection: z.number(),
  }),
})

export type TInitSimulationDto = z.infer<typeof ZInitSimulationDto>

export const ZSimulationWithEpciAndScenario = ZSimulationWithRelations.extend({
  scenario: ZScenario,
})

export type TSimulationWithEpciAndScenario = z.infer<typeof ZSimulationWithEpciAndScenario>

export const ZSimulationWithResults = ZSimulationWithEpciAndScenario.extend({
  results: ZResults,
})

export type TSimulationWithResults = z.infer<typeof ZSimulationWithResults>

export const ZUpdateBadHousingSimulationDto = z.object({
  id: z.string(),
  scenario: ZScenario.omit({
    b17_motif: true,
    b2_scenario: true,
    createdAt: true,
    epciScenarios: true,
    isConfidential: true,
    projection: true,
    updatedAt: true,
  }),
})

export type TUpdateBadHousingSimulationDto = z.infer<typeof ZUpdateBadHousingSimulationDto>

export const ZUpdateDemographicSimulationDto = z.object({
  id: z.string(),
  scenario: z.object({
    id: z.string(),
    b2_scenario: z.string(),
    epciScenarios: z.record(
      z.string(),
      z.object({
        b2_tx_rs: z.number().optional(),
        b2_tx_vacance: z.number().optional(),
      }),
    ),
    projection: z.number(),
  }),
})

export type TUpdateDemographicSimulationDto = z.infer<typeof ZUpdateDemographicSimulationDto>

export const ZSimulationExportDto = ZSimulation.pick({
  id: true,
})

export type TSimulationExportDto = z.infer<typeof ZSimulationExportDto>

export const ZRequestPowerpoint = z.object({
  nextStep: z.string().min(1, { message: 'Veuillez sélectionner la prochaine étape' }),
  resultDate: z.string().min(1, { message: 'Veuillez sélectionner une date' }),
  selectedSimulations: z.array(z.string()).min(1, { message: 'Veuillez sélectionner au moins 1 simulation' }),
})

export type TRequestPowerpoint = z.infer<typeof ZRequestPowerpoint>

export const ZCloneSimulationDto = z.object({
  name: z.string().min(1, 'Le nom est requis').max(100, 'Le nom ne doit pas dépasser 100 caractères'),
})

export type TCloneSimulationDto = z.infer<typeof ZCloneSimulationDto>
