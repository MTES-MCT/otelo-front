import Select from '@codegouvfr/react-dsfr/Select'
import { parseAsArrayOf } from 'nuqs'
import { parseAsString } from 'nuqs'
import { useQueryStates } from 'nuqs'
import { FC } from 'react'
import { Bar, BarChart, CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { tss } from 'tss-react'
import { barChartColors } from '~/components/charts/data-visualisation/colors'
import { DATA_TYPE_OPTIONS } from '~/components/data-visualisation/select-data-type'
import { TDemographicProjectionEvolution } from '~/schemas/population-evolution'
import styles from './projection-menages-evolution-charts.module.css'

export const MENAGES_TYPE_OPTIONS = [
  { label: 'Population haute', value: 'haute' },
  { label: 'Population centrale', value: 'central' },
  { label: 'Population basse', value: 'basse' },
]

export type ProjectionMenagesEvolutionChartProps = {
  data: TDemographicProjectionEvolution
  type: string | null
}

export const ProjectionMenagesEvolutionChart: FC<ProjectionMenagesEvolutionChartProps> = ({ data: chartData, type }) => {
  const [queryStates, setQueryStates] = useQueryStates({
    epcis: parseAsArrayOf(parseAsString).withDefault([]),
    populationType: parseAsString.withDefault('haute'),
  })

  const { classes } = useStyles()
  const epcisLinearChart = Object.keys(chartData.linearChart).filter((epci) => queryStates.epcis.includes(epci))
  const epciName = chartData.tableData[queryStates.epcis[0] as string]?.name

  const barChartData = Object.entries(chartData.tableData)
    .filter(([key]) => queryStates.epcis.includes(key))
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
    .sort((a, b) => a.period.localeCompare(b.period))

  const title = type && DATA_TYPE_OPTIONS.find((option) => option.value === type)?.label
  const dataKeyPrefix = queryStates.populationType === 'haute' ? 'ph' : queryStates.populationType === 'central' ? 'central' : 'pb'

  return (
    <>
      <div className={styles.headerContainer}>
        <h5>
          {title} - {epciName}
        </h5>
        <Select
          label=""
          nativeSelectProps={{
            onChange: (event) => setQueryStates({ populationType: event.target.value }),
            value: queryStates.populationType || '',
          }}
        >
          {MENAGES_TYPE_OPTIONS.map((item) => (
            <option key={item.value} value={item.value}>
              {item.label}
            </option>
          ))}
        </Select>
      </div>
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
                    dataKey={`${dataKeyPrefix}H`}
                    stroke={barChartColors[index]}
                    data={epciData}
                    name={`${chartData.linearChart[epci].epci.name} - Décohabitation haute`}
                    key={epci}
                  />
                  <Line
                    dataKey={`${dataKeyPrefix}C`}
                    stroke={barChartColors[index]}
                    data={epciData}
                    name={`${chartData.linearChart[epci].epci.name} - Décohabitation tendanciel`}
                    key={epci}
                  />
                  <Line
                    dataKey={`${dataKeyPrefix}B`}
                    stroke={barChartColors[index]}
                    data={epciData}
                    name={`${chartData.linearChart[epci].epci.name} - Décohabitation basse`}
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
                { color: barChartColors[0], type: 'rect', value: 'Décohabitation haute' },
                { color: barChartColors[1], type: 'rect', value: 'Décohabitation tendanciel' },
                { color: barChartColors[2], type: 'rect', value: 'Décohabitation basse' },
              ]}
            />
            <XAxis dataKey="period" />
            <YAxis />
            <Tooltip
              formatter={(value: number, name: string) => {
                // Format the value and include the population type
                return [`${value}`, `${name}`]
              }}
              // biome-ignore lint/suspicious/noExplicitAny: TODO
              labelFormatter={(label: string, payload: any[]) => {
                // Show both period and EPCI name
                if (payload && payload.length > 0) {
                  return `${payload[0].payload.name} - ${label}`
                }
                return label
              }}
            />
            <Bar dataKey="haute" name="Décohabitation haute" fill={barChartColors[0]} />
            <Bar dataKey="central" name="Décohabitation tendanciel" fill={barChartColors[1]} />
            <Bar dataKey="basse" name="Décohabitation basse" fill={barChartColors[2]} />
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
