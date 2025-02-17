'use client'
import { FC } from 'react'
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { CustomizedDot } from '~/components/charts/customized-dot'
import { TChartData } from '~/schemas/results'
import { formatNumber } from '~/utils/format-numbers'

interface SitadelEvolutionChartProps {
  results: TChartData
}

export const SitadelEvolutionChart: FC<SitadelEvolutionChartProps> = ({ results }) => {
  const { data, metadata } = results
  const { max, min } = metadata
  return (
    <>
      <h5>Évolution du nombre de logements construits - Données SITADEL</h5>
      <div style={{ height: '600px', marginBottom: '2rem', paddingLeft: '2rem', paddingTop: '2rem', width: '100%' }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            width={500}
            height={300}
            data={data}
            margin={{
              bottom: 5,
              left: 20,
              right: 30,
              top: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <Line
              name="Évolution du nombre de logement construit par an"
              type="monotone"
              dataKey="value"
              stroke="#8884d8"
              dot={(props) => (
                <CustomizedDot {...props} stroke="#8884d8" year={props.payload.year} key={`${props.key}-${props.payload.year}`} />
              )}
            />
            <XAxis dataKey="year" />
            <Tooltip />
            <Legend />
            <YAxis domain={[min, max]} tickFormatter={(value) => formatNumber(value)} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </>
  )
}
