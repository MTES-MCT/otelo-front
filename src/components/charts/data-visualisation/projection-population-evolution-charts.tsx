import { FC } from 'react'
import { Bar, BarChart, CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { tss } from 'tss-react'
import { barChartColors } from '~/components/charts/data-visualisation/colors'
import { DATA_TYPE_OPTIONS } from '~/components/data-visualisation/select-data-type'
import { useEpci } from '~/hooks/use-epci'
import { TDemographicProjectionEvolution } from '~/schemas/population-evolution'

export type ProjectionPopulationEvolutionChartProps = {
  data: TDemographicProjectionEvolution
  type: string | null
}

export const ProjectionPopulationEvolutionChart: FC<ProjectionPopulationEvolutionChartProps> = ({ data: chartData, type }) => {
  const { classes } = useStyles()
  const epcisLinearChart = Object.keys(chartData.linearChart)
  const { data: epciData } = useEpci()

  const barChartData = Object.entries(chartData.tableData)
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    .map(([_, epciData]) => {
      return [
        {
          basse: epciData.annualEvolution?.['2021-2030']?.basse?.value || 0,
          central: epciData.annualEvolution?.['2021-2030']?.central?.value || 0,
          haute: epciData.annualEvolution?.['2021-2030']?.haute?.value || 0,
          name: epciData.name,
          period: '2021-2030',
        },
        {
          basse: epciData.annualEvolution?.['2030-2040']?.basse?.value || 0,
          central: epciData.annualEvolution?.['2030-2040']?.central?.value || 0,
          haute: epciData.annualEvolution?.['2030-2040']?.haute?.value || 0,
          name: epciData.name,
          period: '2030-2040',
        },
        {
          basse: epciData.annualEvolution?.['2040-2050']?.basse?.value || 0,
          central: epciData.annualEvolution?.['2040-2050']?.central?.value || 0,
          haute: epciData.annualEvolution?.['2040-2050']?.haute?.value || 0,
          name: epciData.name,
          period: '2040-2050',
        },
      ]
    })
    .flat()

  const title = type && DATA_TYPE_OPTIONS.find((option) => option.value === type)?.label
  return (
    <>
      <h5>
        {title} - {epciData?.name}
      </h5>
      <div className={classes.chartContainer}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart width={500} height={500} margin={{ left: 20, right: 20 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="year" allowDuplicatedCategory={false} />

            {epcisLinearChart.length > 0 && (
              <YAxis
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
              const epciData = chartData.linearChart[epci].data
              return (
                <>
                  <Line
                    dataKey="haute"
                    stroke={barChartColors[index]}
                    data={epciData}
                    name={`${chartData.linearChart[epci].epci.name} - Haute`}
                    key={epci}
                  />
                  <Line
                    dataKey="central"
                    stroke={barChartColors[index]}
                    data={epciData}
                    name={`${chartData.linearChart[epci].epci.name} - Central`}
                    key={epci}
                  />
                  <Line
                    dataKey="basse"
                    stroke={barChartColors[index]}
                    data={epciData}
                    name={`${chartData.linearChart[epci].epci.name} - Basse`}
                    key={epci}
                  />
                </>
              )
            })}
          </LineChart>
        </ResponsiveContainer>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart width={730} height={600} data={barChartData} margin={{ left: 20 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <Legend
              align="right"
              verticalAlign="top"
              payload={[
                { color: barChartColors[0], type: 'rect', value: 'Population haute' },
                { color: barChartColors[1], type: 'rect', value: 'Population centrale' },
                { color: barChartColors[2], type: 'rect', value: 'Population basse' },
              ]}
            />
            <XAxis dataKey="period" />
            <YAxis />
            <Tooltip
              formatter={(value: number, name: string) => {
                // Format the value and include the population type
                return [`${value}`, `${name}`]
              }}
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              labelFormatter={(label: string, payload: any[]) => {
                // Show both period and EPCI name
                if (payload && payload.length > 0) {
                  return `${payload[0].payload.name} - ${label}`
                }
                return label
              }}
            />
            <Bar dataKey="haute" name="Population haute" fill={barChartColors[0]} />
            <Bar dataKey="central" name="Population centrale" fill={barChartColors[1]} />
            <Bar dataKey="basse" name="Population basse" fill={barChartColors[2]} />
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
    height: '700px',
    width: '100%',
  },
})
