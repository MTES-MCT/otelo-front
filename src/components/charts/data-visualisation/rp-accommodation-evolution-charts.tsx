import { fr } from '@codegouvfr/react-dsfr'
import Select from '@codegouvfr/react-dsfr/Select'
import { parseAsArrayOf, parseAsString, useQueryStates } from 'nuqs'
import { FC } from 'react'
import { Bar, BarChart, CartesianGrid, Label, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { tss } from 'tss-react'
import { barChartColors } from '~/components/charts/data-visualisation/colors'
import { DATA_TYPE_OPTIONS } from '~/components/data-visualisation/select-data-type'
import { TAccommodationEvolution } from '~/schemas/accommodation-evolution'
import styles from './accommodation-evolution-charts.module.css'

export type RPAccommodationEvolutionChart = {
  data: TAccommodationEvolution
  type: string | null
}

export const RPAccommodationEvolutionChart: FC<RPAccommodationEvolutionChart> = ({ data: chartData, type }) => {
  const [queryStates, setQueryStates] = useQueryStates({
    type: parseAsString,
    epcis: parseAsArrayOf(parseAsString).withDefault([]),
    epci: parseAsString.withDefault(''),
    source: parseAsString.withDefault('rp'),
  })

  const SOURCE_OPTIONS = [
    { label: 'RP (INSEE)', value: 'rp' },
    // todo : reenable as soon as filocom data is available
    // ...(type === 'residences-secondaires' ? [{ label: 'FILOCOM', value: 'filocom' }] : []),
    ...(type === 'logements-vacants' ? [{ label: 'Fichiers Fonciers', value: 'lovac' }] : []),
  ]
  const { classes } = useStyles()

  const epcisLinearChart = Object.keys(chartData.linearChart).filter((epci) => queryStates.epcis.includes(epci))
  const linearDataKey = type === 'residences-secondaires' ? 'secondaryAccommodation' : 'vacant'
  const epciName = chartData.tableData[queryStates.epci as string]?.name
  const barChartData = Object.entries(chartData.tableData)
    .filter(([key]) => queryStates.epcis.includes(key))
    .map(([key, value]) => {
      return {
        '2010-2015': value.annualEvolution?.['2010-2015']?.value ?? 0,
        '2015-2021': value.annualEvolution?.['2015-2021']?.value ?? 0,
        epciCode: key,
        name: value.name,
      }
    })

  const title = type && DATA_TYPE_OPTIONS.find((option) => option.value === queryStates.type)?.label
  const barChartTitle =
    type === 'residences-secondaires'
      ? 'Évolution annuelle moyenne du nombre de résidences secondaires'
      : 'Évolution annuelle moyenne du nombre de logements vacants'
  const lineChartTitle =
    type === 'residences-secondaires'
      ? 'Évolution du nombre de résidences secondaires en volume'
      : 'Évolution du nombre de logements vacants en volume'
  return (
    <>
      <div className={styles.headerContainer}>
        <h2 className={fr.cx('fr-h5')}>
          {title} - {epciName}
        </h2>
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
      <div className={classes.chartsContainer}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart width={500} height={500} margin={{ left: 20, right: 20, bottom: 30 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="year" allowDuplicatedCategory={false}>
              <Label value={lineChartTitle} offset={10} position="bottom" />
            </XAxis>

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
          <BarChart width={730} height={600} data={barChartData} margin={{ bottom: 100, left: 20 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <Legend align="right" verticalAlign="top" />
            <XAxis dataKey="name" angle={-30} textAnchor="end" interval={0} tick={{ fontSize: 12 }}>
              <Label value={barChartTitle} offset={80} position="bottom" />
            </XAxis>
            <YAxis />
            <Tooltip />
            <Bar dataKey="2010-2015" name="2010-2015" fill={barChartColors[0]} key="2010-2015" />
            <Bar dataKey="2015-2021" name="2015-2021" fill={barChartColors[1]} key="2015-2021" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </>
  )
}

const useStyles = tss.create({
  chartsContainer: {
    display: 'flex',
    height: '700px',
    width: '100%',
    justifyContent: 'space-between',
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
})
