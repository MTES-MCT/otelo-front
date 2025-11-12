import { fr } from '@codegouvfr/react-dsfr'
import Select from '@codegouvfr/react-dsfr/Select'
import { parseAsArrayOf } from 'nuqs'
import { parseAsString } from 'nuqs'
import { useQueryStates } from 'nuqs'
import { FC } from 'react'
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, TooltipProps, XAxis, YAxis } from 'recharts'
import { NameType, Payload as TooltipPayload, ValueType } from 'recharts/types/component/DefaultTooltipContent'
import { tss } from 'tss-react'
import { CustomizedDot } from '~/components/charts/customized-dot'
import { getChartColor } from '~/components/charts/data-visualisation/colors'
import { DATA_TYPE_OPTIONS } from '~/components/data-visualisation/select-data-type'
import { THouseholdSizesChart } from '~/schemas/household-sizes'
import { formatNumber } from '~/utils/format-numbers'
import styles from './projection-menages-evolution-charts.module.css'

export const HOUSEHOLD_SIZES_TYPE_OPTIONS = [
  { label: 'Population haute', value: 'haute' },
  { label: 'Population centrale', value: 'central' },
  { label: 'Population basse', value: 'basse' },
]

const SCENARIOS = [
  {
    dataKey: 'phH',
    id: 'haute',
    name: 'Taille ménages - Accélération',
    stroke: getChartColor('phH'),
  },
  {
    dataKey: 'centralH',
    id: 'central',
    name: 'Taille ménages - Accélération',
    stroke: getChartColor('centralH'),
  },
  {
    dataKey: 'pbH',
    id: 'basse',
    name: 'Taille ménages - Accélération',
    stroke: getChartColor('pbH'),
  },
  {
    dataKey: 'centralC',
    id: 'central',
    name: 'Taille ménages - Tendanciel',
    stroke: getChartColor('centralC'),
  },
  {
    dataKey: 'pbC',
    id: 'basse',
    name: 'Taille ménages - Tendanciel',
    stroke: getChartColor('pbC'),
  },
  {
    dataKey: 'pbB',
    id: 'basse',
    name: 'Taille ménages - Décélération',
    stroke: getChartColor('pbB'),
  },
  {
    dataKey: 'centralB',
    id: 'central',
    name: 'Taille ménages - Décélération',
    stroke: getChartColor('centralB'),
  },
  {
    dataKey: 'phB',
    id: 'haute',
    name: 'Taille ménages - Décélération',
    stroke: getChartColor('phB'),
  },
  {
    dataKey: 'phC',
    id: 'haute',
    name: 'Taille ménages - Tendanciel',
    stroke: getChartColor('phC'),
  },
]

export const CustomTooltip = ({
  active,
  label,
  payload,
}: TooltipProps<ValueType, NameType> & { label?: string; payload?: TooltipPayload<ValueType, NameType>[] }) => {
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
                    {label}: {value}
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

export type HouseholdSizesChartProps = {
  data: THouseholdSizesChart
}

export const HouseholdSizesChart: FC<HouseholdSizesChartProps> = ({ data: chartData }) => {
  const [queryStates, setQueryStates] = useQueryStates({
    epcis: parseAsArrayOf(parseAsString).withDefault([]),
    epci: parseAsString.withDefault(''),
    populationType: parseAsString.withDefault('haute'),
  })

  const { classes } = useStyles()
  const epcisLinearChart = Object.keys(chartData.linearChart).filter((epci) => queryStates.epcis.includes(epci))
  const epciName = chartData.linearChart[queryStates.epci as string]?.epci.name

  const title = DATA_TYPE_OPTIONS.find((option) => option.value === 'taille-menages')?.label
  const displayedScenarios = SCENARIOS.map((scenario) => ({
    ...scenario,
    stroke: scenario.stroke,
    strokeWidth: 2,
  }))

  return (
    <>
      <div className={styles.headerContainer}>
        <h2 className={fr.cx('fr-h5')}>
          {title} - {epciName}
        </h2>
        <Select
          label=""
          nativeSelectProps={{
            onChange: (event) => setQueryStates({ populationType: event.target.value }),
            value: queryStates.populationType || '',
          }}
        >
          {HOUSEHOLD_SIZES_TYPE_OPTIONS.map((item) => (
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
                        period={undefined}
                        key={`${epci}-${dataKey}-${props.payload.year}`}
                      />
                    )}
                  />
                ))
            })}
          </LineChart>
        </ResponsiveContainer>
        <span className={classes.title}>Évolution de la taille moyenne des ménages</span>
      </div>
    </>
  )
}

const useStyles = tss.create({
  chartContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    height: '700px',
    width: '100%',
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
  tooltipDot: {
    borderRadius: '50%',
    height: '8px',
    width: '8px',
  },
  bold: {
    fontWeight: 'bold',
  },
})
