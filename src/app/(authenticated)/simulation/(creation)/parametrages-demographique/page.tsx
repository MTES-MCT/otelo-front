import { fr } from '@codegouvfr/react-dsfr'
import { SearchParams } from 'nuqs'
import { searchParamsCache } from '~/app/(authenticated)/simulation/(creation)/searchParams'
import { OmphaleScenariosChart } from '~/components/charts/omphale-scenarios-chart'
import { PopulationScenariosChart } from '~/components/charts/population-scenarios-chart'
import { DemographicSettingsHeader } from '~/components/simulations/settings/demographic-settings-header'
import { NextStepLink } from '~/components/simulations/settings/next-step-link'
import { getOmphaleDemographicEvolutionByEpci } from '~/server-only/demographic-evolution/get-omphale-evolution-by-epci'
import { getPopulationDemographicEvolutionByEpci } from '~/server-only/demographic-evolution/get-population-evolution-by-epci'
import classes from './parametrages-demographique.module.css'

type PageProps = {
  searchParams: Promise<SearchParams>
}

export default async function DemographicSettingsPage({ searchParams }: PageProps) {
  const { epcis } = await searchParamsCache.parse(searchParams)
  const omphaleEvolution = await getOmphaleDemographicEvolutionByEpci(epcis)
  const populationEvolution = await getPopulationDemographicEvolutionByEpci(epcis)
  const href = `/simulation/taux-cibles-logements`

  return (
    <div className={classes.container}>
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
