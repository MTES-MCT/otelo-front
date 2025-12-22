import Button from '@codegouvfr/react-dsfr/Button'
import type { Metadata } from 'next'
import { SearchParams } from 'nuqs'
import { searchParamsCache } from '~/app/(authenticated)/simulation/(creation)/searchParams'
import { OmphaleScenariosChart } from '~/components/charts/omphale-scenarios-chart'
import { PopulationScenariosChart } from '~/components/charts/population-scenarios-chart'
import { DemographicSettingsHeader } from '~/components/simulations/settings/demographic-settings-header'
import { NextStepLink } from '~/components/simulations/settings/next-step-link'
import { getOmphaleDemographicEvolutionByEpci } from '~/server-only/demographic-evolution/get-omphale-evolution-by-epci'
import { getPopulationDemographicEvolutionByEpci } from '~/server-only/demographic-evolution/get-population-evolution-by-epci'

export const metadata: Metadata = {
  title: 'Elaborer scenario - étape 3 sur 6 - Otelo',
}

type PageProps = {
  searchParams: Promise<SearchParams>
}

export default async function DemographicSettingsPage({ searchParams }: PageProps) {
  const { epcis } = await searchParamsCache.parse(searchParams)
  const omphaleEvolution = await getOmphaleDemographicEvolutionByEpci(epcis)
  const populationEvolution = await getPopulationDemographicEvolutionByEpci(epcis)
  const href = `/simulation/taux-cibles-logements-vacants`

  return (
    <>
      <div className="fr-flex fr-direction-column fr-background-default--grey">
        <DemographicSettingsHeader>
          <PopulationScenariosChart demographicEvolution={populationEvolution} />
          <OmphaleScenariosChart demographicEvolution={omphaleEvolution} />
        </DemographicSettingsHeader>
      </div>
      <div className="fr-flex fr-flex-gap-6v fr-justify-content-end fr-py-4w fr-px-2w">
        {/* todo: extract to a component and set preivous url href*/}
        <Button priority="secondary" size="large">
          Précédent
        </Button>
        <NextStepLink href={href} query="projection" defaultValue="2030" />
      </div>
    </>
  )
}
