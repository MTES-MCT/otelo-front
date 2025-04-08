import { fr } from '@codegouvfr/react-dsfr'
import { DemographicSettingsFormWrapper } from '~/app/(authenticated)/simulation/[id]/modifier/(demographic-modification)/parametrages-demographique/demographic-settings-form-wrapper'
import { NextStepLinkWithoutValidation } from '~/components/simulations/settings/next-step-link'
import { getOmphaleDemographicEvolutionByEpci } from '~/server-only/demographic-evolution/get-omphale-evolution-by-epci'
import { getPopulationDemographicEvolutionByEpci } from '~/server-only/demographic-evolution/get-population-evolution-by-epci'
import { getSimulationWithResults } from '~/server-only/simulation/get-simulation-with-results'
import classes from './parametrages-demographique.module.css'

type PageProps = {
  params: {
    id: string
  }
}

export default async function ParametragesDemographiquePage({ params }: PageProps) {
  const simulation = await getSimulationWithResults(params.id)
  const epci = simulation.scenario.epciScenarios.find((e) => e.default)

  if (!epci) {
    throw new Error('Default EPCI of the simulation not found')
  }

  const href = `/simulation/${params.id}/modifier/taux-cibles-logements`
  const omphaleEvolution = await getOmphaleDemographicEvolutionByEpci(epci.epciCode)
  const populationEvolution = await getPopulationDemographicEvolutionByEpci(epci.epciCode)

  return (
    <div className={classes.container}>
      <DemographicSettingsFormWrapper omphaleEvolution={omphaleEvolution} populationEvolution={populationEvolution} />
      <div className={fr.cx('fr-ml-auto', 'fr-my-1w')}>
        <NextStepLinkWithoutValidation href={href} />
      </div>
    </div>
  )
}
