'use client'

import { FC } from 'react'
import { LineChart, Line, YAxis, XAxis, CartesianGrid, ResponsiveContainer, Tooltip } from 'recharts'
import { tss } from 'tss-react'
import { CustomizedDot } from '~/components/charts/customized-dot'
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
      <h5>Besoin en flux - Evolution du besoin démographique en logements année par année</h5>
      <div className={classes.rowContainer}>
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
              <Line
                name="Besoin en flux"
                type="monotone"
                dataKey="value"
                stroke="#8884d8"
                dot={(props) => (
                  <CustomizedDot
                    {...props}
                    stroke="#8884d8"
                    period={data.scenario.projection}
                    year={props.payload.year}
                    key={`${props.key}-${props.payload.year}`}
                  />
                )}
              />
              <XAxis dataKey="year" />
              <Tooltip />
              <YAxis domain={[min, max]} tickFormatter={(value) => Math.round(value).toString()} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}

const useStyles = tss.create({
  chartContainer: {
    height: '600px',
    marginBottom: '2rem',
    width: '100%',
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    paddingLeft: '2rem',
    paddingTop: '2rem',
  },
  rowContainer: {
    borderBottom: '1px solid var(--border-default-grey)',
    display: 'flex',
    flexDirection: 'row',
    gap: '2rem',
  },
})
