import { FC } from 'react'
import { PopulationEvolutionTable } from '~/components/table/population-evolution-table'
import { ProjectionPopulationEvolutionTable } from '~/components/table/projection-population-evolution-table'
import { TDemographicProjectionDataTable, TDemographicProjectionEvolution, TRPPopulationEvolution } from '~/schemas/population-evolution'

export const DataVisualisationTable: FC<{ data: TRPPopulationEvolution | TDemographicProjectionEvolution; type: string | null }> = ({
  data,
  type,
}) => {
  const isPopulationEvolution = ['population-evolution', 'menage-evolution'].includes(type ?? '')
  const isProjectionPopulationEvolution = ['projection-population-evolution'].includes(type ?? '')

  if (isPopulationEvolution) {
    return <PopulationEvolutionTable data={data as TRPPopulationEvolution} type={type} />
  }

  if (isProjectionPopulationEvolution) {
    return <ProjectionPopulationEvolutionTable data={data.tableData as TDemographicProjectionDataTable} />
  }
}
