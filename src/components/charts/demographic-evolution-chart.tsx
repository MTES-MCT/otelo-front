'use client'

import { FC } from 'react'
import { LineChart, Line, YAxis, XAxis, Legend, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts'
import { TSimulationWithResults } from '~/schemas/simulation'

interface DemographicEvolutionChartProps {
  data: TSimulationWithResults
}

export const DemographicEvolutionChart: FC<DemographicEvolutionChartProps> = ({ data }) => {
  const chartData = data.results.demographicEvolution.futureProjections.data
  return (
    <div style={{ height: '600px', width: '100%' }}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          width={500}
          height={300}
          data={chartData}
          margin={{
            bottom: 5,
            left: 20,
            right: 30,
            top: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <Line name="Besoin en ménages" type="monotone" dataKey="value" stroke="#8884d8" activeDot={{ r: 8 }} />
          <XAxis dataKey="year" />
          <YAxis dataKey="value" />
          <Tooltip />
          <Legend />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
