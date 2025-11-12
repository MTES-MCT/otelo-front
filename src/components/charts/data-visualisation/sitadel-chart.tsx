'use client'

import { fr } from '@codegouvfr/react-dsfr'
import Select from '@codegouvfr/react-dsfr/Select'
import { parseAsString, useQueryStates } from 'nuqs'
import { FC } from 'react'
import { Bar, CartesianGrid, ComposedChart, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { tss } from 'tss-react'
import { DATA_TYPE_OPTIONS } from '~/components/data-visualisation/select-data-type'
import { TSitadel } from '~/schemas/sitadel'
import { formatNumber } from '~/utils/format-numbers'
import styles from './accommodation-evolution-charts.module.css'
import { getChartColor } from './colors'

interface SitadelChartProps {
  data: TSitadel
}

export const SitadelChart: FC<SitadelChartProps> = ({ data }) => {
  const [queryStates, setQueryStates] = useQueryStates({
    type: parseAsString,
    epci: parseAsString,
  })
  const { classes } = useStyles()

  const selectedEpciData = data[queryStates.epci as string]

  // Transform data to show each year with its housing counts
  const chartData = selectedEpciData.data.map((item) => ({
    year: item.year,
    authorizedHousing: item.authorizedHousingCount,
    startedHousing: item.startedHousingCount,
  }))

  const title = DATA_TYPE_OPTIONS.find((option) => option.value === queryStates.type)?.label
  const EPCIS_OPTIONS = Object.entries(data).map(([key, value]) => ({ label: value.name, value: key }))
  const name = selectedEpciData.name
  const chartTitle = `Données SITADEL - ${name}`

  const maxValue = Math.max(...chartData.map((d) => Math.max(d.authorizedHousing, d.startedHousing)))

  const customTooltip = (props: { active?: boolean; payload?: Array<{ dataKey: string; value: number }>; label?: string | number }) => {
    const { active, payload, label } = props
    if (active && payload && payload.length) {
      return (
        <div style={{ backgroundColor: 'white', border: '1px solid #ccc', padding: '10px', borderRadius: '4px' }}>
          <p style={{ margin: '0 0 10px 0', fontWeight: 'bold' }}>{label}</p>
          {payload.map((entry) => (
            <p key={entry.dataKey} style={{ margin: '5px 0', display: 'flex', alignItems: 'center' }}>
              <span
                style={{
                  display: 'inline-block',
                  width: '12px',
                  height: '12px',
                  backgroundColor:
                    entry.dataKey === 'authorizedHousing' ? getChartColor('authorizedHousing') : getChartColor('startedHousing'),
                  marginRight: '8px',
                }}
              />
              <span
                style={{
                  color: entry.dataKey === 'authorizedHousing' ? getChartColor('authorizedHousing') : getChartColor('startedHousing'),
                }}
              >
                {entry.dataKey === 'authorizedHousing' ? 'Permis de construire autorisés' : 'Logements commencés'}:{' '}
                {formatNumber(entry.value)}
              </span>
            </p>
          ))}
        </div>
      )
    }
    return null
  }

  const chartDescription = (
    <>
      <p className={fr.cx('fr-mb-0')}>
        <span className={fr.cx('fr-text--bold')}>Clé de lecture :</span> Ce graphique présente les données SITADEL pour le territoire de{' '}
        {name}, montrant les permis de construire autorisés et les logements commencés.
      </p>
      <p>Total permis de construire autorisés : {formatNumber(chartData.reduce((sum, d) => sum + d.authorizedHousing, 0))}</p>
      <p>Total logements commencés : {formatNumber(chartData.reduce((sum, d) => sum + d.startedHousing, 0))}</p>
    </>
  )

  return (
    <>
      <div className={styles.headerContainer}>
        <h2 className={fr.cx('fr-h5')}>
          {title} - {name}
        </h2>
        <div>
          <Select
            label=""
            nativeSelectProps={{
              onChange: (event) => setQueryStates({ epci: event.target.value }),
              value: queryStates.epci || '',
            }}
          >
            {EPCIS_OPTIONS.map((item) => (
              <option key={item.value} value={item.value}>
                {item.label}
              </option>
            ))}
          </Select>
        </div>
      </div>
      <div className={classes.chartContainer}>
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart
            width={500}
            height={300}
            data={chartData}
            margin={{
              bottom: 5,
              right: 50,
              top: 20,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <Bar name="Permis de construire autorisés" dataKey="authorizedHousing" fill={getChartColor('authorizedHousing')} />
            <Bar name="Logements commencés" dataKey="startedHousing" fill={getChartColor('startedHousing')} />
            <XAxis dataKey="year" />
            <Tooltip content={customTooltip} />
            <Legend
              itemSorter={(item) => {
                const order = ['authorizedHousing', 'startedHousing']
                return order.indexOf(item.dataKey as string)
              }}
            />
            <YAxis domain={[0, maxValue]} allowDecimals={false} includeHidden={true} />
          </ComposedChart>
        </ResponsiveContainer>
        <div className={classes.titleContainer}>
          <span className={classes.title}>{chartTitle}</span>
        </div>
      </div>
      <div>{chartDescription}</div>
    </>
  )
}

const useStyles = tss.create({
  chartContainer: {
    height: '600px',
    marginBottom: '2rem',
    paddingLeft: '2rem',
    paddingTop: '2rem',
    width: '100%',
  },
  title: {
    textAlign: 'center',
  },
  titleContainer: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '1rem',
  },
})
