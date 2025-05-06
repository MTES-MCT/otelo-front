import Select from '@codegouvfr/react-dsfr/Select'
import { parseAsArrayOf, parseAsString, useQueryStates } from 'nuqs'
import { FC } from 'react'
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { tss } from 'tss-react'
import { barChartColors } from '~/components/charts/data-visualisation/colors'
import { DATA_TYPE_OPTIONS } from '~/components/data-visualisation/select-data-type'
import { TAccommodationLovacEvolution } from '~/schemas/accommodation-evolution'
import styles from './accommodation-evolution-charts.module.css'

export type LovacAccommodationEvolutionChart = {
  data: TAccommodationLovacEvolution
}

export const LovacAccommodationEvolutionChart: FC<LovacAccommodationEvolutionChart> = ({ data: chartData }) => {
  const [queryStates, setQueryStates] = useQueryStates({
    type: parseAsString,
    epcis: parseAsArrayOf(parseAsString).withDefault([]),
    source: parseAsString.withDefault('rp'),
  })
  const SOURCE_OPTIONS = [
    { label: 'RP (INSEE)', value: 'rp' },
    { label: 'LOVAC', value: 'lovac' },
  ]
  const { classes } = useStyles()

  const epcisLinearChart = Object.keys(chartData.linearChart).filter((epci) => queryStates.epcis.includes(epci))
  const epciName = chartData.tableData[queryStates.epcis[0] as string]?.name
  const barChartData = Object.entries(chartData.tableData)
    .filter(([key]) => queryStates.epcis.includes(key))
    .map(([_, value]) => {
      return [
        {
          nbLogVac2Less: value.annualEvolution?.['2014-2019']?.nbLogVac2Less?.value ?? 0,
          nbLogVac2More: value.annualEvolution?.['2014-2019']?.nbLogVac2More?.value ?? 0,
          period: '2014-2019',
          name: value.name,
        },
        {
          nbLogVac2Less: value.annualEvolution?.['2019-2024']?.nbLogVac2Less?.value ?? 0,
          nbLogVac2More: value.annualEvolution?.['2019-2024']?.nbLogVac2More?.value ?? 0,
          period: '2019-2024',
          name: value.name,
        },
      ]
    })
    .flat()
    .sort((a, b) => a.period.localeCompare(b.period))

  const title = DATA_TYPE_OPTIONS.find((option) => option.value === queryStates.type)?.label

  const epciColorPairs: [string, string][] = [
    ['#2563eb', '#60a5fa'], // blue
    ['#16a34a', '#4ade80'], // green
    ['#b91c1c', '#f87171'], // red
    ['#a21caf', '#e879f9'], // purple
    ['#ca8a04', '#fde047'], // yellow
    ['#0e7490', '#67e8f9'], // cyan
    ['#be185d', '#f472b6'], // pink
    ['#7c3aed', '#c4b5fd'], // indigo
    ['#ea580c', '#fdba74'], // orange
    ['#15803d', '#bbf7d0'], // emerald
  ]

  return (
    <>
      <div className={styles.headerContainer}>
        <h5>
          {title} - {epciName}
        </h5>
        <Select
          label=""
          nativeSelectProps={{
            onChange: (event) => setQueryStates({ source: event.target.value }),
            value: queryStates.source || '',
          }}
        >
          {SOURCE_OPTIONS.map((item) => (
            <option key={item.value} value={item.value}>
              {item.label}
            </option>
          ))}
        </Select>
      </div>
      <div className={classes.chartContainer}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            width={500}
            height={500}
            margin={{ left: 20, right: 20 }}
            data={(() => {
              // Merge all selected EPCI data by year, with each EPCI's values as separate keys
              const years = [2014, 2019, 2024]
              return years.map((year) => {
                const entry: { year: number; [key: string]: number } = { year }
                epcisLinearChart.forEach((epci) => {
                  const epciRawData = chartData.linearChart[epci].data as Array<{
                    nbLogVac2Less: number
                    nbLogVac2More: number
                    nbTotal: number
                    propLogVac2Less: number
                    propLogVac2More: number
                  }>
                  const yearsList = [2014, 2019, 2024]
                  const epciDataWithYear = epciRawData.map((d, i) => ({ ...d, year: yearsList[i] }))
                  const epciData = epciDataWithYear.find((d) => d.year === year)
                  entry[`${epci}-nbLogVac2Less`] = epciData?.nbLogVac2Less ?? 0
                  entry[`${epci}-nbLogVac2More`] = epciData?.nbLogVac2More ?? 0
                })
                return entry
              })
            })()}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="year" ticks={[2014, 2019, 2024]} />
            <YAxis />
            <Tooltip />
            <Legend />
            {epcisLinearChart.map((epci, index) => [
              <Bar
                key={`${epci}-nbLogVac2Less`}
                dataKey={`${epci}-nbLogVac2Less`}
                stackId={epci}
                fill={epciColorPairs[index % epciColorPairs.length][0]}
                name={`${chartData.linearChart[epci].epci.name} < 2 ans`}
              />,
              <Bar
                key={`${epci}-nbLogVac2More`}
                dataKey={`${epci}-nbLogVac2More`}
                stackId={epci}
                fill={epciColorPairs[index % epciColorPairs.length][1]}
                name={`${chartData.linearChart[epci].epci.name} > 2 ans`}
              />,
            ])}
          </BarChart>
        </ResponsiveContainer>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart width={730} height={600} data={barChartData} margin={{ left: 20 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <Legend align="right" verticalAlign="top" />
            <XAxis dataKey="period" ticks={['2014-2019', '2019-2024']} />
            <YAxis
              domain={(() => {
                const minNbLogVac2Less = Math.min(...barChartData.map((d) => d.nbLogVac2Less))
                const minNbLogVac2More = Math.min(...barChartData.map((d) => d.nbLogVac2More))
                const maxNbLogVac2Less = Math.max(...barChartData.map((d) => d.nbLogVac2Less))
                const maxNbLogVac2More = Math.max(...barChartData.map((d) => d.nbLogVac2More))
                const globalMin = Math.min(minNbLogVac2Less, minNbLogVac2More)
                const globalMax = Math.max(maxNbLogVac2Less, maxNbLogVac2More)
                const padding = (globalMax - globalMin) * 0.05
                const min = globalMin === 0 ? 0 : Math.max(0, Math.round(globalMin - padding))
                const max = Math.round(globalMax + padding)
                return [min, max]
              })()}
            />
            <Tooltip
              formatter={(value: number, name: string) => [`${value}`, `${name}`]}
              // biome-ignore lint/suspicious/noExplicitAny: TODO
              labelFormatter={(label: string, payload: any[]) => {
                // Show both period and EPCI name
                if (payload && payload.length > 0) {
                  return `${payload[0].payload.name} - ${label}`
                }
                return label
              }}
            />
            <Bar dataKey="nbLogVac2Less" name="Logements vacants < 2 ans" fill={barChartColors[2]} key="nbLogVac2Less" />
            <Bar dataKey="nbLogVac2More" name="Logements vacants longue durée" fill={barChartColors[3]} key="nbLogVac2More" />
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
