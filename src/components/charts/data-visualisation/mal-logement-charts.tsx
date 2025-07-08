'use client'

import Checkbox from '@codegouvfr/react-dsfr/Checkbox'
import Select from '@codegouvfr/react-dsfr/Select'
import { parseAsString, useQueryStates } from 'nuqs'
import { FC, useState } from 'react'
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { tss } from 'tss-react'
import { DATA_TYPE_OPTIONS } from '~/components/data-visualisation/select-data-type'
import { TInadequateHousing } from '~/schemas/population-evolution'
import styles from './accommodation-evolution-charts.module.css'

interface MalLogementChartProps {
  data: TInadequateHousing
}

export const MalLogementChart: FC<MalLogementChartProps> = ({ data }) => {
  const [withOteloParams, setWithOteloParams] = useState(false)
  const [queryStates, setQueryStates] = useQueryStates({
    type: parseAsString,
    epci: parseAsString,
  })
  const { classes } = useStyles()

  const chartData = [data[queryStates.epci as string]]
  const chartDataOteloParams = [
    {
      badQuality: chartData[0].badQuality * 0.5,
      financialInadequation: chartData[0].financialInadequation * 0.3,
      physicalInadequation: chartData[0].physicalInadequation * 0.9,
      hosted: chartData[0].hosted * 0.3,
      noAccommodation: chartData[0].noAccommodation * 0.5,
      name: chartData[0].name,
    },
  ]

  const title = DATA_TYPE_OPTIONS.find((option) => option.value === queryStates.type)?.label
  const EPCIS_OPTIONS = Object.entries(data).map(([key, value]) => ({ label: value.name, value: key }))
  const dataToDisplay = withOteloParams ? chartDataOteloParams : chartData
  return (
    <>
      <div className={styles.headerContainer}>
        <h5>
          {title} - {chartData[0].name}
        </h5>
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
          <Checkbox
            options={[
              {
                label: 'Avec paramètres Otelo',
                nativeInputProps: {
                  checked: withOteloParams,
                  onChange: (event) => setWithOteloParams(event.target.checked),
                },
              },
            ]}
          />
        </div>
      </div>
      <div className={classes.chartContainer}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart width={500} height={300} data={dataToDisplay}>
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
        <div className={classes.titleContainer}>
          <span className={classes.title}>Graphique de la répartition des formes de mal logement à {chartData[0].name}</span>
        </div>
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
  title: {
    textAlign: 'center',
  },
  titleContainer: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '1rem',
  },
})
