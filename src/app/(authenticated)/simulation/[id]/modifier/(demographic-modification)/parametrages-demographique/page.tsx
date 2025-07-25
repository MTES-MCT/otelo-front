import { fr } from '@codegouvfr/react-dsfr'
import { redirect } from 'next/navigation'
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
  searchParams: {
    demographicEvolutionOmphaleCustomIds?: string | string[]
  }
}

export default async function ParametragesDemographiquePage({ params, searchParams }: PageProps) {
  const simulation = await getSimulationWithResults(params.id)
  const epcisCodes = simulation.scenario.epciScenarios.map((e) => e.epciCode)

  // Check if demographicEvolutionOmphaleCustomIds is already in search params
  const hasCustomIdsParam = searchParams.demographicEvolutionOmphaleCustomIds !== undefined

  // If not present and scenario has custom demographic evolution data, redirect with IDs
  if (
    !hasCustomIdsParam &&
    simulation.scenario.demographicEvolutionOmphaleCustom &&
    simulation.scenario.demographicEvolutionOmphaleCustom.length > 0
  ) {
    const customIds = simulation.scenario.demographicEvolutionOmphaleCustom.map((custom) => custom.id)

    // Preserve existing search params
    const searchParamsObj = new URLSearchParams()

    // Copy all existing search params
    Object.entries(searchParams).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        value.forEach((v) => searchParamsObj.append(key, v))
      } else if (value) {
        searchParamsObj.append(key, value)
      }
    })

    // Add the custom IDs
    searchParamsObj.append('demographicEvolutionOmphaleCustomIds', customIds.join(','))

    redirect(`/simulation/${params.id}/modifier/parametrages-demographique?${searchParamsObj.toString()}`)
  }

  const href = `/simulation/${params.id}/modifier/taux-cibles-logements`
  const omphaleEvolution = await getOmphaleDemographicEvolutionByEpci(epcisCodes)
  const populationEvolution = await getPopulationDemographicEvolutionByEpci(epcisCodes)

  return (
    <div className={classes.container}>
      <DemographicSettingsFormWrapper
        epcis={epcisCodes}
        omphaleEvolution={omphaleEvolution}
        populationEvolution={populationEvolution}
        scenarioId={simulation.scenario.id}
      />
      <div className={fr.cx('fr-ml-auto', 'fr-my-1w')}>
        <NextStepLinkWithoutValidation href={href} />
      </div>
    </div>
  )
}
