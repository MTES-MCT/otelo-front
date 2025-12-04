import Button from '@codegouvfr/react-dsfr/Button'
import { redirect } from 'next/navigation'
import { DemographicSettingsFormWrapper } from '~/app/(authenticated)/simulation/[id]/modifier/(demographic-modification)/parametrages-demographique/demographic-settings-form-wrapper'
import { NextStepLinkWithoutValidation } from '~/components/simulations/settings/next-step-link'
import { getOmphaleDemographicEvolutionByEpci } from '~/server-only/demographic-evolution/get-omphale-evolution-by-epci'
import { getPopulationDemographicEvolutionByEpci } from '~/server-only/demographic-evolution/get-population-evolution-by-epci'
import { getSimulationWithResults } from '~/server-only/simulation/get-simulation-with-results'

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

  const href = `/simulation/${params.id}/modifier/taux-cibles-logements-vacants`
  const omphaleEvolution = await getOmphaleDemographicEvolutionByEpci(epcisCodes)
  const populationEvolution = await getPopulationDemographicEvolutionByEpci(epcisCodes)

  return (
    <>
      <div className="fr-flex fr-direction-column fr-background-default--grey">
        <DemographicSettingsFormWrapper
          epcis={epcisCodes}
          omphaleEvolution={omphaleEvolution}
          populationEvolution={populationEvolution}
          scenarioId={simulation.scenario.id}
        />
      </div>
      <div className="fr-flex fr-flex-gap-6v fr-justify-content-end fr-py-4w fr-px-2w">
        {/* todo: extract to a component and set preivous url href*/}
        <Button priority="secondary" size="large">
          Précédent
        </Button>
        <NextStepLinkWithoutValidation href={href} />
      </div>
    </>
  )
}
