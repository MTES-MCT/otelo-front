'use client'

import { FC } from 'react'
import { Bar, CartesianGrid, ComposedChart, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { tss } from 'tss-react'
import { TChartData } from '~/schemas/results'

interface AccommodationContructionEvolutionChartProps {
  newConstructionsResults: TChartData
  sitadelResults: TChartData
}

export const AccommodationContructionEvolutionChart: FC<AccommodationContructionEvolutionChartProps> = ({
  newConstructionsResults,
  sitadelResults,
}) => {
  const { classes } = useStyles()
  const { data: sitadelData } = sitadelResults
  const { data: newConstructionsData } = newConstructionsResults

  const allYears = Array.from(new Set([...sitadelData.map((d) => d.year), ...newConstructionsData.map((d) => d.year)])).sort(
    (a, b) => a - b,
  )

  const mergedData = allYears.map((year) => ({
    constructionValue: newConstructionsData.find((d) => d.year === year)?.value ?? null,
    sitadelValue: sitadelData.find((d) => d.year === year)?.value ?? null,
    year,
  }))

  const maxValue = Math.max(Math.max(...sitadelData.map((d) => d.value)), Math.max(...newConstructionsData.map((d) => d.value)))

  return (
    <>
      <h5>Évolution du nombre de logements construits (Données SITADEL)</h5>
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
              top: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <Bar name="Logements construits sur la période récente (2017-2021)" dataKey="sitadelValue" fill="#8884d8" />
            <Bar name="Projections des besoins en constructions neuve selon votre scénario" dataKey="constructionValue" fill="#82ca9d" />
            <XAxis dataKey="year" angle={-45} textAnchor="end" height={60} />
            <Tooltip />
            <Legend />
            <YAxis domain={[0, maxValue]} allowDecimals={false} includeHidden={true} />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </>
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
}))
