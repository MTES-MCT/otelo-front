import { FC } from 'react'
import { Bar, BarChart, CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { tss } from 'tss-react'
import { DATA_TYPE_OPTIONS } from '~/components/data-visualisation/select-data-type'
import { useEpci } from '~/hooks/use-epci'
import { TRPPopulationEvolution } from '~/schemas/population-evolution'

export type PopulationEvolutionChartProps = {
  data: TRPPopulationEvolution
  type: string | null
}

const barChartColors = ['#6b9bd0', '#82ca9d', '#f4a582', '#8884d8', '#a8a8a8', '#d9b26f']

export const PopulationEvolutionChart: FC<PopulationEvolutionChartProps> = ({ data: chartData, type }) => {
  const { classes } = useStyles()
  const epcisLinearChart = Object.keys(chartData.linearChart)
  const linearDataKey = type?.split('-')[0]
  const { data: epciData } = useEpci()
  const barChartData = Object.entries(chartData.tableData).map(([key, value]) => ({
    epciCode: key,
    name: value.name,
    ...value.annualEvolution,
  }))

  const title = type && DATA_TYPE_OPTIONS.find((option) => option.value === type)?.label
  console.log(chartData.linearChart)
  return (
    <>
      <h5>
        {title} - {epciData?.name}
      </h5>
      <div className={classes.chartContainer}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart width={500} height={500}>
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
        <ResponsiveContainer width="100%" height="100%">
          <BarChart width={730} height={250} data={barChartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <Legend align="right" verticalAlign="top" />

            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey={(dataPoint) => dataPoint['2010-2015'].value} name="2010-2015" fill={barChartColors[0]} key={`2010-2015`} />
            <Bar dataKey={(dataPoint) => dataPoint['2015-2021'].value} name="2015-2021" fill={barChartColors[1]} key={`2015-2021`} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </>
  )
}

const useStyles = tss.create({
  chartContainer: {
    display: 'flex',
    gap: '2rem',
    height: '500px',
    width: '100%',
  },
})
