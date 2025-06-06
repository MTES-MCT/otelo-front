'use client'

import Select from '@codegouvfr/react-dsfr/Select'
import { parseAsString, useQueryStates } from 'nuqs'
import { FC } from 'react'
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { tss } from 'tss-react'
import { DATA_TYPE_OPTIONS } from '~/components/data-visualisation/select-data-type'
import { TInadequateHousing } from '~/schemas/population-evolution'
import styles from './accommodation-evolution-charts.module.css'

interface MalLogementChartProps {
  data: TInadequateHousing
}

export const MalLogementChart: FC<MalLogementChartProps> = ({ data }) => {
  const [queryStates, setQueryStates] = useQueryStates({
    type: parseAsString,
    epci: parseAsString,
  })
  const { classes } = useStyles()

  const chartData = [data[queryStates.epci as string]]
  const title = DATA_TYPE_OPTIONS.find((option) => option.value === queryStates.type)?.label
  const EPCIS_OPTIONS = Object.entries(data).map(([key, value]) => ({ label: value.name, value: key }))
  return (
    <>
      <div className={styles.headerContainer}>
        <h5>
          {title} - {chartData[0].name}
        </h5>
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
      <div className={classes.chartContainer}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart width={500} height={300} data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="badQuality" name="Mauvaise qualité" fill="#4F46E5" />
            <Bar dataKey="financialInadequation" name="Inadéquation financière" fill="#F59E0B" />
            <Bar dataKey="physicalInadequation" name="Inadéquation physique" fill="#10B981" />
            <Bar dataKey="hosted" name="Hébergés" fill="#4F46E5" />
            <Bar dataKey="noAccommodation" name="Sans logement" fill="#EC4899" />
            <Legend />
          </BarChart>
        </ResponsiveContainer>
      </div>
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
})
