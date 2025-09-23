import { fr } from '@codegouvfr/react-dsfr'
import { parseAsArrayOf } from 'nuqs'
import { parseAsString } from 'nuqs'
import { useQueryStates } from 'nuqs'
import { FC } from 'react'
import { Bar, BarChart, CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { NameType, Payload as TooltipPayload, ValueType } from 'recharts/types/component/DefaultTooltipContent'
import { tss } from 'tss-react'
import { CustomizedDot } from '~/components/charts/customized-dot'
import { getChartColor } from '~/components/charts/data-visualisation/colors'
import { DATA_TYPE_OPTIONS } from '~/components/data-visualisation/select-data-type'
import { TDemographicProjectionEvolution } from '~/schemas/population-evolution'
import { formatNumber } from '~/utils/format-numbers'

const SCENARIOS = [
  {
    dataKey: 'haute',
    stroke: getChartColor('haute'),
  },
  {
    dataKey: 'central',
    stroke: getChartColor('central'),
  },
  {
    dataKey: 'basse',
    stroke: getChartColor('basse'),
  },
]

const CustomTooltip = ({
  active,
  label,
  payload,
}: { active?: boolean; label?: string; payload?: TooltipPayload<ValueType, NameType>[] }) => {
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
              const label = item.dataKey.charAt(0).toUpperCase() + item.dataKey.slice(1)
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

export type ProjectionPopulationEvolutionChartProps = {
  data: TDemographicProjectionEvolution
  type: string | null
}

export const ProjectionPopulationEvolutionChart: FC<ProjectionPopulationEvolutionChartProps> = ({ data: chartData, type }) => {
  const [queryStates] = useQueryStates({
    epcis: parseAsArrayOf(parseAsString).withDefault([]),
    epci: parseAsString.withDefault(''),
  })
  const { classes } = useStyles()
  const epcisLinearChart = Object.keys(chartData.linearChart).filter((epci) => queryStates.epcis.includes(epci))
  const epciName = chartData.tableData[queryStates.epci]?.name

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
    stroke: scenario.stroke,
    strokeWidth: 2,
  }))

  return (
    <>
      <h2 className={fr.cx('fr-h5')}>
        {title} - {epciName}
      </h2>
      <div className={classes.chartContainer}>
        <div className={classes.chartLabelContainer}>
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
                return displayedScenarios.map(({ dataKey, stroke, strokeWidth }) => (
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
                        period={undefined}
                        key={`${epci}-${dataKey}-${props.payload.year}`}
                      />
                    )}
                  />
                ))
              })}
            </LineChart>
          </ResponsiveContainer>
          <div style={{ textAlign: 'center', marginBottom: '1rem' }}>Évolution du nombre d'habitants par scenario démographique</div>
        </div>
        <div className={classes.chartLabelContainer}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart width={730} height={600} data={barChartData} margin={{ left: 20 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <Legend
                align="right"
                verticalAlign="top"
                content={() => (
                  <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end', marginBottom: '1rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <div style={{ width: '12px', height: '12px', backgroundColor: getChartColor('haute') }} />
                      <span>Population haute</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <div style={{ width: '12px', height: '12px', backgroundColor: getChartColor('central') }} />
                      <span>Population centrale</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <div style={{ width: '12px', height: '12px', backgroundColor: getChartColor('basse') }} />
                      <span>Population basse</span>
                    </div>
                  </div>
                )}
              />
              <XAxis dataKey="period" ticks={['2021-2030', '2030-2040', '2040-2050']} />

              <YAxis />
              <Tooltip
                formatter={(value: number, name: string) => {
                  // Format the value and include the population type
                  return [`${value}`, `${name}`]
                }}
                // biome-ignore lint/suspicious/noExplicitAny: TODO
                labelFormatter={(label: string, payload: readonly any[]) => {
                  // Show both period and EPCI name
                  if (payload && payload.length > 0) {
                    return `${payload[0].payload.name} - ${label}`
                  }
                  return label
                }}
              />
              <Bar dataKey="haute" name="Population haute" fill={getChartColor('haute')} />
              <Bar dataKey="central" name="Population centrale" fill={getChartColor('central')} />
              <Bar dataKey="basse" name="Population basse" fill={getChartColor('basse')} />
            </BarChart>
          </ResponsiveContainer>
          <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
            Évolution décennal du nombre d'habitants, par scenario démographique
          </div>
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
