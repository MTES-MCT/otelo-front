import { fr } from '@codegouvfr/react-dsfr'
import { SearchParams } from 'nuqs'
import { searchParamsCache } from '~/app/(authenticated)/simulation/(creation)/searchParams'
import { OmphaleScenariosChart } from '~/components/charts/omphale-scenarios-chart'
import { PopulationScenariosChart } from '~/components/charts/population-scenarios-chart'
import { DemographicSettingsHeader } from '~/components/simulations/settings/demographic-settings-header'
import { NextStepLink } from '~/components/simulations/settings/next-step-link'
import { getOmphaleDemographicEvolutionByEpci } from '~/server-only/demographic-evolution/get-omphale-evolution-by-epci'
import { getPopulationDemographicEvolutionByEpci } from '~/server-only/demographic-evolution/get-population-evolution-by-epci'

type PageProps = {
  searchParams: Promise<SearchParams>
}

export default async function DemographicSettingsPage({ searchParams }: PageProps) {
  const { epci } = await searchParamsCache.parse(searchParams)
  const omphaleEvolution = await getOmphaleDemographicEvolutionByEpci(epci)
  const populationEvolution = await getPopulationDemographicEvolutionByEpci(epci)
  const href = `/simulation/validation-parametrage`

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <DemographicSettingsHeader>
        <PopulationScenariosChart demographicEvolution={populationEvolution} />
        <OmphaleScenariosChart demographicEvolution={omphaleEvolution} />
      </DemographicSettingsHeader>
      <div className={fr.cx('fr-ml-auto', 'fr-my-1w')}>
        <NextStepLink href={href} query="omphale" />
      </div>
    </div>
  )
}
