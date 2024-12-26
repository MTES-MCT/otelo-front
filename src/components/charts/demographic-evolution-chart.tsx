'use client'

import { FC } from 'react'
import { LineChart, Line, YAxis, XAxis, Legend, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts'
import { tss } from 'tss-react'
import { TSimulationWithResults } from '~/schemas/simulation'

interface DemographicEvolutionChartProps {
  data: TSimulationWithResults
}

export const DemographicEvolutionChart: FC<DemographicEvolutionChartProps> = ({ data }) => {
  const { classes } = useStyles()
  const omphaleData = data.results.demographicEvolution.futureProjections?.data
  const { max, min } = data.results.demographicEvolution.futureProjections?.metadata.data ?? { max: 0, min: 0 }

  return (
    <div className={classes.container}>
      <h5>Besoin en flux - Evolution du besoin en logements année par année</h5>
      <div className={classes.chartContainer}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            width={500}
            height={300}
            data={omphaleData}
            margin={{
              bottom: 5,
              left: 20,
              right: 30,
              top: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <Line name="Besoin en flux" type="monotone" dataKey="value" stroke="#8884d8" activeDot={{ r: 8 }} />
            <XAxis dataKey="year" />
            <YAxis domain={[min, max]} tickFormatter={(value) => Math.round(value).toString()} />

            <Tooltip />
            <Legend />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

const useStyles = tss.create({
  chartContainer: {
    borderBottom: '1px solid var(--border-default-grey)',
    height: '600px',
    width: '100%',
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    paddingLeft: '2rem',
    paddingTop: '2rem',
  },
})
