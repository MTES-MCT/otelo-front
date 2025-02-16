'use client'

import { useQueryState } from 'nuqs'
import { FC } from 'react'
import { PopulationEvolutionChart } from '~/components/charts/data-visualisation/population-evolution-charts'
import { useDataVisualisation } from '~/hooks/use-data-visualisation'

export const DataVisualisationPage: FC = () => {
  const [type] = useQueryState('type')
  const { data, isLoading } = useDataVisualisation()

  if (isLoading) return <div>Chargement des données en cours...</div>
  const isPopulationEvolution = ['population-evolution', 'menage-evolution'].includes(type ?? '')
  return <div>{data && isPopulationEvolution && <PopulationEvolutionChart data={data} type={type} />}</div>
}
