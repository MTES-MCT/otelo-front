import { parseAsArrayOf, parseAsString, useQueryStates } from 'nuqs'
import { FC } from 'react'
import { Bar, BarChart, CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { tss } from 'tss-react'
import { barChartColors } from '~/components/charts/data-visualisation/colors'
import { DATA_TYPE_OPTIONS } from '~/components/data-visualisation/select-data-type'
import { TRPPopulationEvolution } from '~/schemas/population-evolution'

export type PopulationEvolutionChartProps = {
  data: TRPPopulationEvolution
  type: string | null
}

export const PopulationEvolutionChart: FC<PopulationEvolutionChartProps> = ({ data: chartData, type }) => {
  const [queryStates] = useQueryStates({
    epcis: parseAsArrayOf(parseAsString).withDefault([]),
    epci: parseAsString.withDefault(''),
  })
  const { classes } = useStyles()
  const epcisLinearChart = Object.keys(chartData.linearChart).filter((epci) => queryStates.epcis.includes(epci))
  const linearDataKey = type?.split('-')[0]
  const epciName = chartData.tableData[queryStates.epci as string]?.name
  const barChartData = Object.entries(chartData.tableData)
    .filter(([key]) => queryStates.epcis.includes(key))
    .map(([key, value]) => ({
      '2010-2015': value.annualEvolution?.['2010-2015']?.value ?? 0,
      '2015-2021': value.annualEvolution?.['2015-2021']?.value ?? 0,
      epciCode: key,
      name: value.name,
    }))

  const title = type && DATA_TYPE_OPTIONS.find((option) => option.value === type)?.label
  const barChartTitle =
    type === 'menage-evolution' ? (
      <>Comparaison de l'évolution moyenne du nombre de ménages entre 2010-2015 et 2015-2021</>
    ) : (
      <>Comparaison de l'évolution moyenne du nombre d'habitants entre 2010-2015 et 2015-2021</>
    )
  const lineChartTitle =
    type === 'menage-evolution' ? (
      <>Evolution du nombre de ménages entre 2010 et 2021</>
    ) : (
      <>Évolution de la population entre 2010 et 2021</>
    )
  return (
    <>
      <h5>
        {title} - {epciName}
      </h5>
      <div className={classes.chartContainer}>
        <div className={classes.chartLabelContainer}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart width={500} height={500} margin={{ left: 20, right: 20, bottom: 30 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="year" allowDuplicatedCategory={false} />

              {epcisLinearChart.length > 0 && (
                <YAxis
                  dataKey={linearDataKey}
                  domain={(() => {
                    const allMetadata = epcisLinearChart.map((epci) => chartData.linearChart[epci].metadata)
                    const minValues = allMetadata.map((m) => m.min)
                    const maxValues = allMetadata.map((m) => m.max)
                    const globalMin = Math.min(...minValues)
                    const globalMax = Math.max(...maxValues)

                    const padding = (globalMax - globalMin) * 0.05
                    return [Math.max(0, Math.round(globalMin - padding)), Math.round(globalMax + padding)]
                  })()}
                />
              )}
              <Tooltip />
              {epcisLinearChart.map((epci, index) => {
                const data = chartData.linearChart[epci].data
                return (
                  <Line
                    dataKey={linearDataKey}
                    stroke={barChartColors[index]}
                    data={data}
                    name={chartData.linearChart[epci].epci.name}
                    key={epci}
                  />
                )
              })}
            </LineChart>
          </ResponsiveContainer>
          <div style={{ textAlign: 'center', marginBottom: '1rem' }}>{lineChartTitle}</div>
        </div>
        <div className={classes.chartLabelContainer}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart width={730} height={600} data={barChartData} margin={{ bottom: 130, left: 20 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <Legend align="right" verticalAlign="top" />
              <XAxis dataKey="name" angle={-30} textAnchor="end" interval={0} tick={{ fontSize: 12 }} />
              <YAxis />
              <Tooltip />
              <Bar dataKey="2010-2015" name="2010-2015" fill={barChartColors[0]} key="2010-2015" />
              <Bar dataKey="2015-2021" name="2015-2021" fill={barChartColors[1]} key="2015-2021" />
            </BarChart>
          </ResponsiveContainer>
          <div style={{ textAlign: 'center', marginBottom: '1rem' }}>{barChartTitle}</div>
        </div>
      </div>
    </>
  )
}

const useStyles = tss.create({
  chartContainer: {
    display: 'flex',
    gap: '2rem',
    height: '700px',
    width: '100%',
  },
  chartLabelContainer: {
    width: '100%',
    marginBottom: '2rem',
  },
})
