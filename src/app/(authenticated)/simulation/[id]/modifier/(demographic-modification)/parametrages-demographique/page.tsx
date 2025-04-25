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
  const epcisCodes = simulation.scenario.epciScenarios.map((e) => e.epciCode)

  const href = `/simulation/${params.id}/modifier/taux-cibles-logements`
  const omphaleEvolution = await getOmphaleDemographicEvolutionByEpci(epcisCodes)
  const populationEvolution = await getPopulationDemographicEvolutionByEpci(epcisCodes)

  return (
    <div className={classes.container}>
      <DemographicSettingsFormWrapper epcis={epcisCodes} omphaleEvolution={omphaleEvolution} populationEvolution={populationEvolution} />
      <div className={fr.cx('fr-ml-auto', 'fr-my-1w')}>
        <NextStepLinkWithoutValidation href={href} />
      </div>
    </div>
  )
}
