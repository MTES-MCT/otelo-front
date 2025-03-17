'use client'

import { fr } from '@codegouvfr/react-dsfr'
import { useQueryState } from 'nuqs'
import { FC } from 'react'
import { PopulationEvolutionChart } from '~/components/charts/data-visualisation/population-evolution-charts'
import { PopulationEvolutionTable } from '~/components/table/population-evolution-table'
import { useDataVisualisation } from '~/hooks/use-data-visualisation'

export const DataVisualisationPage: FC = () => {
  const [type] = useQueryState('type')
  const { data, isLoading } = useDataVisualisation()

  if (isLoading) return <div>Chargement des données en cours...</div>
  const isPopulationEvolution = ['population-evolution', 'menage-evolution'].includes(type ?? '')

  return (
    <div className={fr.cx('fr-my-12v')} style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {data && isPopulationEvolution && <PopulationEvolutionChart data={data} type={type} />}
      {data && <PopulationEvolutionTable data={data} type={type} />}
    </div>
  )
}
