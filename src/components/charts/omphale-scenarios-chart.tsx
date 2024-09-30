'use client'

import { parseAsString, useQueryStates } from 'nuqs'
import React, { FC } from 'react'
import { LineChart, Line, YAxis, XAxis, CartesianGrid, ResponsiveContainer } from 'recharts'
import { TDemographicEvolution } from '~/schemas/demographic-evolution'

interface DemographicEvolutionChartProps {
  demographicEvolution: TDemographicEvolution
}

const SCENARIOS = [
  {
    dataKey: 'centralB',
    name: 'Population : Central | Ménages : Décélération',
    queryValue: 'Central_B',
    stroke: '#000091',
  },
  {
    dataKey: 'centralC',
    name: 'Population : Central | Ménages : Tendanciel',
    queryValue: 'Central_C',
    stroke: '#666666',
  },
  {
    dataKey: 'centralH',
    name: 'Population : Central | Ménages : Accélération',
    queryValue: 'Central_H',
    stroke: '#161616',
  },
  {
    dataKey: 'pbB',
    name: 'Population : Basse | Ménages : Décélération',
    queryValue: 'PB_B',
    stroke: '#CE614A',
  },
  {
    dataKey: 'pbC',
    name: 'Population : Basse | Ménages : Tendanciel',
    queryValue: 'PB_C',
    stroke: '#A558A0',
  },
  {
    dataKey: 'pbH',
    name: 'Population : Basse | Ménages : Accélération',
    queryValue: 'PB_H',
    stroke: '#FF9940',
  },
  {
    dataKey: 'phB',
    name: 'Population : Haute | Ménages : Décélération',
    queryValue: 'PH_B',
    stroke: '#91A7D0',
  },
  {
    dataKey: 'phC',
    name: 'Population : Haute | Ménages : Tendanciel',
    queryValue: 'PH_C',
    stroke: '#169B62',
  },
  {
    dataKey: 'phH',
    name: 'Population : Haute | Ménages : Accélération',
    queryValue: 'PH_H',
    stroke: '#E4794A',
  },
]

export const OmphaleScenariosChart: FC<DemographicEvolutionChartProps> = ({ demographicEvolution }) => {
  const { data, metadata } = demographicEvolution

  const [queryStates, setQueryStates] = useQueryStates({
    omphale: parseAsString,
  })

  const displayedScenarios = SCENARIOS.map((scenario) => ({
    ...scenario,
    stroke: queryStates.omphale
      ? scenario.queryValue === queryStates.omphale
        ? scenario.stroke
        : `${scenario.stroke}33`
      : scenario.stroke,
    strokeWidth: queryStates.omphale && scenario.queryValue === queryStates.omphale ? 2 : 1,
  }))

  return (
    <div style={{ backgroundColor: 'white', height: '800px', padding: '1rem', width: '100%' }}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart width={500} height={300} data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          {displayedScenarios.map(({ dataKey, name, queryValue, stroke, strokeWidth }) => (
            <React.Fragment key={dataKey}>
              <Line
                key={dataKey}
                name={name}
                type="monotone"
                dataKey={dataKey}
                stroke={stroke}
                strokeWidth={strokeWidth}
                onClick={() => setQueryStates({ omphale: queryValue })}
              />
            </React.Fragment>
          ))}

          <XAxis dataKey="year" />
          <YAxis domain={[metadata.min, metadata.max]} tickFormatter={(value) => Math.round(value).toString()} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
