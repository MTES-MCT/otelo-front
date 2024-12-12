'use client'

import { fr } from '@codegouvfr/react-dsfr'
import Button from '@codegouvfr/react-dsfr/Button'
import Select from '@codegouvfr/react-dsfr/SelectNext'
import { parseAsString, useQueryStates } from 'nuqs'
import React, { FC } from 'react'
import { LineChart, Line, YAxis, XAxis, CartesianGrid, ResponsiveContainer } from 'recharts'
import { tss } from 'tss-react'
import { TPopulationDemographicEvolution } from '~/schemas/demographic-evolution'

interface PopulationEvolutionChartProps {
  demographicEvolution: TPopulationDemographicEvolution
}

const SCENARIOS = [
  {
    dataKey: 'central',
    name: 'Population : Central',
    queryValue: 'central',
    stroke: '#000091',
  },
  {
    dataKey: 'haute',
    name: 'Population : Haute',
    queryValue: 'haute',
    stroke: '#666666',
  },
  {
    dataKey: 'basse',
    name: 'Population : Basse',
    queryValue: 'basse',
    stroke: '#161616',
  },
]

const selectOptions = [
  {
    label: 'Population: Central',
    value: 'central',
  },
  {
    label: 'Population: Haute',
    value: 'haute',
  },
  {
    label: 'Population: Basse',
    value: 'basse',
  },
]

export const PopulationScenariosChart: FC<PopulationEvolutionChartProps> = ({ demographicEvolution }) => {
  const { classes } = useStyles()
  const { data, metadata } = demographicEvolution

  const [queryStates, setQueryStates] = useQueryStates({
    population: parseAsString,
    scenario: parseAsString,
  })

  const displayedScenarios = SCENARIOS.map((scenario) => ({
    ...scenario,
    stroke: queryStates.population
      ? scenario.queryValue === queryStates.population
        ? scenario.stroke
        : `${scenario.stroke}33`
      : scenario.stroke,
    strokeWidth: queryStates.population && scenario.queryValue === queryStates.population ? 2 : 1,
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
                  onClick={() => setQueryStates({ population: queryValue })}
                />
              </React.Fragment>
            ))}

            <XAxis dataKey="year" />
            <YAxis domain={[metadata.min, metadata.max]} tickFormatter={(value) => Math.round(value).toString()} />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div className={fr.cx('fr-py-2w')}>
        <Select
          label=""
          placeholder="Choix du scénario"
          nativeSelectProps={{
            onChange: (event) => setQueryStates({ population: event.target.value }),
            value: queryStates.population ?? undefined,
          }}
          options={selectOptions}
          style={{ marginTop: '1rem' }}
        />
      </div>
      <div className={classes.buttonContainer}>
        <Button disabled={!queryStates.population} onClick={() => setQueryStates({ scenario: 'menages' })}>
          Étape suivante
        </Button>
      </div>
    </>
  )
}

const useStyles = tss.create({
  buttonContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  chartContainer: {
    backgroundColor: 'white',
    height: '500px',
    padding: '1rem',
    width: '100%',
  },
})
