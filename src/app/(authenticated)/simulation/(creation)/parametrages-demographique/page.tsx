import { fr } from '@codegouvfr/react-dsfr'
import { SearchParams } from 'nuqs'
import { searchParamsCache } from '~/app/(authenticated)/simulation/(creation)/searchParams'
import { OmphaleScenariosChart } from '~/components/charts/omphale-scenarios-chart'
import { NextStepLink } from '~/components/simulations/next-step-link'
import { SelectOmphale } from '~/components/simulations/select-omphale'
import { getDemographicEvolutionByEpci } from '~/server-only/demographic-evolution/get-demographic-evolution-by-epci'

type PageProps = {
  searchParams: Promise<SearchParams>
}

export default async function DemographicSettingsPage({ searchParams }: PageProps) {
  const { epci } = await searchParamsCache.parse(searchParams)
  const demographicEvolution = await getDemographicEvolutionByEpci(epci)
  const href = `/simulation/validation-parametrage`

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <h5>Évolution du nombre de ménages annuel par projections Omphale</h5>
      <OmphaleScenariosChart demographicEvolution={demographicEvolution} />
      <SelectOmphale />
      <div className={fr.cx('fr-ml-auto', 'fr-my-1w')}>
        <NextStepLink href={href} query="q" />
      </div>
    </div>
  )
}
