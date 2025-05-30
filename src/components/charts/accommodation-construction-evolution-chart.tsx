'use client'

import { FC } from 'react'
import { Bar, CartesianGrid, ComposedChart, Legend, ReferenceLine, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { tss } from 'tss-react'
import { TChartData, TNewConstructionsChartData } from '~/schemas/results'

interface AccommodationContructionEvolutionChartProps {
  newConstructionsResults: TNewConstructionsChartData
  sitadelResults: TChartData
  horizon: number
  projection: number
}

export const AccommodationContructionEvolutionChart: FC<AccommodationContructionEvolutionChartProps> = ({
  newConstructionsResults,
  sitadelResults,
  horizon,
  projection,
}) => {
  const { classes } = useStyles()
  const { data: sitadelData } = sitadelResults
  const { data: newConstructionsData } = newConstructionsResults

  const allYears = Array.from(
    new Set([
      ...sitadelData.map((d) => d.year),
      ...Object.keys(newConstructionsData.housingNeeds).map(Number),
      ...Object.keys(newConstructionsData.surplusHousing).map(Number),
    ]),
  ).sort((a, b) => a - b)

  const mergedData = allYears.map((year) => ({
    housingNeeds: newConstructionsData.housingNeeds[year] ?? null,
    surplusHousing: newConstructionsData.surplusHousing[year] ?? null,
    sitadelValue: sitadelData.find((d) => d.year === year)?.value ?? null,
    year,
  }))

  const maxValue = Math.max(
    Math.max(...sitadelData.map((d) => d.value)),
    Math.max(...Object.values(newConstructionsData.housingNeeds)),
    Math.max(...Object.values(newConstructionsData.surplusHousing)),
  )

  return (
    <div className={classes.container}>
      <h5>Résultats annualisés de l'estimation</h5>
      <div className={classes.chartContainer}>
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart
            width={500}
            height={300}
            data={mergedData}
            margin={{
              bottom: 5,
              left: 20,
              right: 30,
              top: 20,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <ReferenceLine
              x={horizon}
              stroke="#666"
              strokeDasharray="3 3"
              label={{
                value: 'Horizon',
                position: 'top',
                fill: '#666',
                fontSize: 12,
                offset: 10,
              }}
            />
            <ReferenceLine
              x={projection}
              stroke="#666"
              strokeDasharray="3 3"
              label={{
                value: 'Projection',
                position: 'top',
                fill: '#666',
                fontSize: 12,
                offset: 10,
              }}
            />
            <Bar name="Permis de construire commencés (Sit@del)" dataKey="sitadelValue" fill="#8884d8" />
            <Bar name="Besoins en logements" dataKey="housingNeeds" fill="#82ca9d" />
            <Bar name="Logements excédentaires" dataKey="surplusHousing" fill="#ffc658" />
            <XAxis dataKey="year" angle={-45} textAnchor="end" height={60} />
            <Tooltip />
            <Legend />
            <YAxis domain={[0, maxValue]} allowDecimals={false} includeHidden={true} />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

const useStyles = tss.create(() => ({
  chartContainer: {
    height: '600px',
    marginBottom: '2rem',
    paddingLeft: '2rem',
    paddingTop: '2rem',
    width: '100%',
  },
  container: {
    paddingLeft: '2rem',
    paddingTop: '2rem',
  },
}))
