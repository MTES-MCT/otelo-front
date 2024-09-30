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
  id: true,
  updatedAt: true,
}).extend({
  epci: ZEpci,
})

export type TSimulationWithRelations = z.infer<typeof ZSimulationWithRelations>

export const ZInitSimulationDto = z.object({
  epci: z.object({ code: z.string(), name: z.string(), region: z.string() }),
  scenario: z.object({ b2_scenario_omphale: z.string(), projection: z.number() }),
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
