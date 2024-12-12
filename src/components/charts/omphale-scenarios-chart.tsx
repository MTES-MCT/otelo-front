'use client'

import { fr } from '@codegouvfr/react-dsfr'
import { parseAsString, useQueryStates } from 'nuqs'
import React, { FC } from 'react'
import { LineChart, Line, YAxis, XAxis, CartesianGrid, ResponsiveContainer } from 'recharts'
import { tss } from 'tss-react'
import { SelectOmphale } from '~/components/simulations/settings/select-omphale'
import { TOmphaleDemographicEvolution } from '~/schemas/demographic-evolution'

interface DemographicEvolutionChartProps {
  demographicEvolution: TOmphaleDemographicEvolution
}

const SCENARIOS = [
  {
    dataKey: 'centralB',
    id: 'central',
    name: 'Population : Central | Ménages : Décélération',
    queryValue: 'Central_B',
    stroke: '#000091',
  },
  {
    dataKey: 'centralC',
    id: 'central',
    name: 'Population : Central | Ménages : Tendanciel',
    queryValue: 'Central_C',
    stroke: '#666666',
  },
  {
    dataKey: 'centralH',
    id: 'central',
    name: 'Population : Central | Ménages : Accélération',
    queryValue: 'Central_H',
    stroke: '#161616',
  },
  {
    dataKey: 'pbB',
    id: 'basse',
    name: 'Population : Basse | Ménages : Décélération',
    queryValue: 'PB_B',
    stroke: '#CE614A',
  },
  {
    dataKey: 'pbC',
    id: 'basse',
    name: 'Population : Basse | Ménages : Tendanciel',
    queryValue: 'PB_C',
    stroke: '#A558A0',
  },
  {
    dataKey: 'pbH',
    id: 'basse',
    name: 'Population : Basse | Ménages : Accélération',
    queryValue: 'PB_H',
    stroke: '#FF9940',
  },
  {
    dataKey: 'phB',
    id: 'haute',
    name: 'Population : Haute | Ménages : Décélération',
    queryValue: 'PH_B',
    stroke: '#91A7D0',
  },
  {
    dataKey: 'phC',
    id: 'haute',
    name: 'Population : Haute | Ménages : Tendanciel',
    queryValue: 'PH_C',
    stroke: '#169B62',
  },
  {
    dataKey: 'phH',
    id: 'haute',
    name: 'Population : Haute | Ménages : Accélération',
    queryValue: 'PH_H',
    stroke: '#E4794A',
  },
]

export const OmphaleScenariosChart: FC<DemographicEvolutionChartProps> = ({ demographicEvolution }) => {
  const { classes } = useStyles()
  const { data, metadata } = demographicEvolution

  const [queryStates, setQueryStates] = useQueryStates({
    omphale: parseAsString,
    population: parseAsString,
  })

  const displayedScenarios = SCENARIOS.filter((scenario) => scenario.id === queryStates.population).map((scenario) => ({
    ...scenario,
    stroke: queryStates.omphale
      ? scenario.queryValue === queryStates.omphale
        ? scenario.stroke
        : `${scenario.stroke}33`
      : scenario.stroke,
    strokeWidth: queryStates.omphale && scenario.queryValue === queryStates.omphale ? 2 : 1,
  }))

  return (
    <>
      <div className={classes.chartContainer}>
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
      <div className={fr.cx('fr-py-2w')}>
        <SelectOmphale />
      </div>
    </>
  )
}

const useStyles = tss.create({
  chartContainer: {
    backgroundColor: 'white',
    height: '500px',
    padding: '1rem',
    width: '100%',
  },
})
