import Select from '@codegouvfr/react-dsfr/Select'
import { parseAsArrayOf } from 'nuqs'
import { parseAsString } from 'nuqs'
import { useQueryStates } from 'nuqs'
import { FC } from 'react'
import { Bar, BarChart, CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, TooltipProps, XAxis, YAxis } from 'recharts'
import { NameType, Payload as TooltipPayload, ValueType } from 'recharts/types/component/DefaultTooltipContent'
import { tss } from 'tss-react'
import { CustomizedDot } from '~/components/charts/customized-dot'
import { barChartColors } from '~/components/charts/data-visualisation/colors'
import { DATA_TYPE_OPTIONS } from '~/components/data-visualisation/select-data-type'
import { TDemographicProjectionEvolution } from '~/schemas/population-evolution'
import { formatNumber } from '~/utils/format-numbers'
import styles from './projection-menages-evolution-charts.module.css'

export const MENAGES_TYPE_OPTIONS = [
  { label: 'Population haute', value: 'haute' },
  { label: 'Population centrale', value: 'central' },
  { label: 'Population basse', value: 'basse' },
]

const SCENARIOS = [
  {
    dataKey: 'phH',
    id: 'haute',
    name: 'Ménages - Accélération',
    stroke: '#E4794A',
  },
  {
    dataKey: 'centralH',
    id: 'central',
    name: 'Ménages - Accélération',
    stroke: '#161616',
  },
  {
    dataKey: 'pbH',
    id: 'basse',
    name: 'Ménages - Accélération',
    stroke: '#FF9940',
  },
  {
    dataKey: 'centralC',
    id: 'central',
    name: 'Ménages - Tendanciel',
    stroke: '#666666',
  },
  {
    dataKey: 'pbC',
    id: 'basse',
    name: 'Ménages - Tendanciel',
    stroke: '#A558A0',
  },
  {
    dataKey: 'pbB',
    id: 'basse',
    name: 'Ménages - Décélération',
    stroke: '#CE614A',
  },
  {
    dataKey: 'centralB',
    id: 'central',
    name: 'Ménages - Décélération',
    stroke: '#000091',
  },
  {
    dataKey: 'phB',
    id: 'haute',
    name: 'Ménages - Décélération',
    stroke: '#91A7D0',
  },
  {
    dataKey: 'phC',
    id: 'haute',
    name: 'Ménages - Tendanciel',
    stroke: '#169B62',
  },
]

export const CustomTooltip = ({ active, label, payload }: TooltipProps<ValueType, NameType>) => {
  const { classes } = useStyles()
  if (!active || !payload?.length) return null

  const grouped: Record<string, typeof payload> = {}
  payload.forEach((item: TooltipPayload<ValueType, NameType>) => {
    const epciName = item.name ?? 'Inconnu'
    if (!grouped[epciName]) grouped[epciName] = []
    grouped[epciName].push(item)
  })

  return (
    <div className={classes.tooltipContainer}>
      <p className={classes.tooltipTitle}>{`Année ${label}`}</p>
      {Object.entries(grouped).map(([epciName, items]) => (
        <div key={epciName} style={{ marginBottom: 8 }}>
          <div className={classes.bold}>{epciName}</div>
          <ul style={{ margin: 0, paddingLeft: 16 }}>
            {items.map((item: TooltipPayload<ValueType, NameType>) => {
              if (!item.dataKey || typeof item.dataKey !== 'string') return null
              const scenario = SCENARIOS.find((s) => s.dataKey === item.dataKey)
              const label = scenario ? scenario.name : item.dataKey
              const value = typeof item.value === 'number' ? formatNumber(item.value) : '-'
              return (
                <li key={item.dataKey} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <span className={classes.tooltipDot} style={{ backgroundColor: item.stroke, marginRight: 6 }} />
                  <span>
                    {label}: {value} habitants
                  </span>
                </li>
              )
            })}
          </ul>
        </div>
      ))}
    </div>
  )
}

export type ProjectionMenagesEvolutionChartProps = {
  data: TDemographicProjectionEvolution
  type: string | null
}

export const ProjectionMenagesEvolutionChart: FC<ProjectionMenagesEvolutionChartProps> = ({ data: chartData, type }) => {
  const [queryStates, setQueryStates] = useQueryStates({
    epcis: parseAsArrayOf(parseAsString).withDefault([]),
    epci: parseAsString.withDefault(''),
    populationType: parseAsString.withDefault('haute'),
  })

  const { classes } = useStyles()
  const epcisLinearChart = Object.keys(chartData.linearChart).filter((epci) => queryStates.epcis.includes(epci))
  const epciName = chartData.tableData[queryStates.epci as string]?.name

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
  const displayedScenarios = SCENARIOS.map((scenario) => ({
    ...scenario,
    stroke: `${scenario.stroke}33`,
    strokeWidth: 2,
  }))

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
      <div className={classes.chartsContainer}>
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
              <Tooltip content={<CustomTooltip />} />
              {epcisLinearChart.map((epci) => {
                const epciData = chartData.linearChart[epci].data
                return displayedScenarios
                  .filter((scenario) => scenario.id === queryStates.populationType)
                  .map(({ dataKey, stroke, strokeWidth }) => (
                    <Line
                      dataKey={dataKey}
                      data={epciData}
                      type="monotone"
                      stroke={stroke}
                      strokeWidth={strokeWidth}
                      name={chartData.linearChart[epci].epci.name}
                      key={`${epci}-${dataKey}`}
                      dot={(props) => (
                        <CustomizedDot
                          {...props}
                          stroke={stroke}
                          year={props.payload.year}
                          key={`${epci}-${dataKey}-${props.payload.year}`}
                        />
                      )}
                    />
                  ))
              })}
            </LineChart>
          </ResponsiveContainer>
          <span className={classes.title}>Évolution du nombre de ménages, en fonction des scénarios de décohabitation</span>
        </div>
        <div className={classes.chartContainer}>
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
              <XAxis dataKey="period" ticks={['2021-2030', '2030-2040', '2040-2050']} />
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
          <span className={classes.title}>Évolution décennal du nombre de ménages, par scénario de décohabitation</span>
        </div>
      </div>
    </>
  )
}

const useStyles = tss.create({
  chartsContainer: {
    display: 'flex',
    gap: '2rem',
    height: '700px',
    width: '100%',
  },
  chartContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  title: {
    textAlign: 'center',
    marginTop: '1rem',
  },
  tooltipContainer: {
    backgroundColor: 'white',
    border: '1px solid var(--border-default-grey)',
    borderRadius: '4px',
    padding: '1rem',
  },
  tooltipTitle: {
    fontWeight: 'bold',
    marginBottom: '0.5rem',
  },
  tooltipItem: {
    alignItems: 'center',
    display: 'flex',
    gap: '0.5rem',
    marginTop: '0.25rem',
  },
  tooltipDot: {
    borderRadius: '50%',
    height: '8px',
    width: '8px',
  },
  bold: {
    fontWeight: 'bold',
  },
})
