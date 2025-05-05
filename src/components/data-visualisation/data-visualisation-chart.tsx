import { FC } from 'react'
import { PopulationEvolutionChart } from '~/components/charts/data-visualisation/population-evolution-charts'
import { ProjectionMenagesEvolutionChart } from '~/components/charts/data-visualisation/projection-menages-evolution-charts'
import { ProjectionPopulationEvolutionChart } from '~/components/charts/data-visualisation/projection-population-evolution-charts'
import { TDemographicProjectionEvolution, TRPPopulationEvolution } from '~/schemas/population-evolution'

export const DataVisualisationChart: FC<{ data: TRPPopulationEvolution | TDemographicProjectionEvolution; type: string | null }> = ({
  data,
  type,
}) => {
  const isPopulationEvolution = ['population-evolution', 'menage-evolution'].includes(type ?? '')
  const isProjectionPopulationEvolution = ['projection-population-evolution'].includes(type ?? '')
  const isProjectionMenagesEvolution = ['projection-menages-evolution'].includes(type ?? '')

  if (isPopulationEvolution) {
    return <PopulationEvolutionChart data={data as TRPPopulationEvolution} type={type} />
  }
  if (isProjectionPopulationEvolution) {
    return <ProjectionPopulationEvolutionChart data={data as TDemographicProjectionEvolution} type={type} />
  }
  if (isProjectionMenagesEvolution) {
    return <ProjectionMenagesEvolutionChart data={data as TDemographicProjectionEvolution} type={type} />
  }
}
