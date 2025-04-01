'use client'

import { fr } from '@codegouvfr/react-dsfr'
import classNames from 'classnames'
import { useQueryState } from 'nuqs'
import { FC } from 'react'
import { tss } from 'tss-react'
import { DataVisualisationChart } from '~/components/data-visualisation/data-visualisation-chart'
import { DataVisualisationTable } from '~/components/data-visualisation/data-visualisation-table'
import { useDataVisualisation } from '~/hooks/use-data-visualisation'

export const DataVisualisationPage: FC = () => {
  const { classes } = useStyles()
  const [type] = useQueryState('type')
  const { data, isLoading } = useDataVisualisation()

  if (isLoading) return <div>Chargement des données en cours...</div>

  return (
    <div className={classNames(fr.cx('fr-my-4v'), classes.container)}>
      {!!data && (
        <>
          <DataVisualisationChart data={data} type={type} />
          <DataVisualisationTable type={type} data={data} />
        </>
      )}
    </div>
  )
}

const useStyles = tss.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: '2rem',
  },
})
