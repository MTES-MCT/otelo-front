'use client'

import { fr } from '@codegouvfr/react-dsfr'
import { Alert } from '@codegouvfr/react-dsfr/Alert'
import Button from '@codegouvfr/react-dsfr/Button'
import Select from '@codegouvfr/react-dsfr/SelectNext'
import { parseAsString, useQueryStates } from 'nuqs'
import { FC } from 'react'
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, TooltipProps, XAxis, YAxis } from 'recharts'
import { NameType, ValueType } from 'recharts/types/component/DefaultTooltipContent'
import { tss } from 'tss-react'
import { CustomizedDot } from '~/components/charts/customized-dot'
import { TPopulationDemographicEvolution, TPopulationEvolution } from '~/schemas/demographic-evolution'
import { formatNumber } from '~/utils/format-numbers'
import { roundPopulation } from '~/utils/round-chart-axis'

interface PopulationEvolutionChartProps {
  demographicEvolution: TPopulationDemographicEvolution
}

const SCENARIOS = [
  {
    dataKey: 'haute',
    name: 'Haute',
    queryValue: 'haute',
    stroke: '#666666',
  },
  {
    dataKey: 'central',
    name: 'Central',
    queryValue: 'central',
    stroke: '#000091',
  },
  {
    dataKey: 'basse',
    name: 'Basse',
    queryValue: 'basse',
    stroke: '#161616',
  },
]

const selectOptions = [
  {
    label: 'Population: Haute',
    value: 'haute',
  },
  {
    label: 'Population: Central',
    value: 'central',
  },
  {
    label: 'Population: Basse',
    value: 'basse',
  },
]

const CustomTooltip = ({
  active,
  basePopulation,
  label,
  payload,
}: TooltipProps<ValueType, NameType> & { basePopulation: TPopulationEvolution }) => {
  if (!active || !payload?.length) return null
  return (
    <div
      style={{
        backgroundColor: 'white',
        border: '1px solid var(--border-default-grey)',
        borderRadius: '4px',
        padding: '1rem',
      }}
    >
      <p style={{ fontWeight: 'bold', marginBottom: '0.5rem' }}>{`Année ${label}`}</p>
      {/* biome-ignore lint/suspicious/noExplicitAny: TODO */}
      {payload.map((item: any) => {
        const evol = item.value - basePopulation[item.dataKey as keyof typeof basePopulation]
        return (
          <div
            key={item.dataKey}
            style={{
              alignItems: 'center',
              display: 'flex',
              gap: '0.5rem',
              marginTop: '0.25rem',
            }}
          >
            <div
              style={{
                backgroundColor: item.stroke,
                borderRadius: '50%',
                height: '8px',
                width: '8px',
              }}
            />
            <span>{item.name}:</span>
            <span>
              <span style={{ fontWeight: 'bold' }}>{evol > 0 ? `+${formatNumber(evol)}` : formatNumber(evol)}</span> habitants par rapport à{' '}
              <span style={{ fontWeight: 'bold' }}>2021</span>
            </span>
            <span style={{ fontSize: '10px' }}>({formatNumber(item.value)} habitants)</span>
          </div>
        )
      })}
    </div>
  )
}

export const PopulationScenariosChart: FC<PopulationEvolutionChartProps> = ({ demographicEvolution }) => {
  const { classes } = useStyles()
  const { data, metadata } = demographicEvolution

  const [queryStates, setQueryStates] = useQueryStates({
    population: parseAsString,
    projection: parseAsString,
    scenario: parseAsString,
  })

  const period = queryStates.projection ? queryStates.projection : '2030'
  const displayedScenarios = SCENARIOS.map((scenario) => ({
    ...scenario,
    stroke: queryStates.population
      ? scenario.queryValue === queryStates.population
        ? scenario.stroke
        : `${scenario.stroke}33`
      : scenario.stroke,
    strokeWidth: queryStates.population && scenario.queryValue === queryStates.population ? 2 : 1,
  }))

  const basePopulation = data.find((item) => item.year === 2021) as TPopulationEvolution
  const popEvolution = data.find((item) => item.year === Number(period)) as TPopulationEvolution

  const evol =
    popEvolution[queryStates.population as keyof typeof popEvolution] -
    basePopulation[queryStates.population as keyof typeof basePopulation]

  return (
    <>
      <div className={classes.chartContainer}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart width={500} height={300} data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            {displayedScenarios.map(({ dataKey, name, queryValue, stroke, strokeWidth }) => (
              <Line
                key={dataKey}
                name={name}
                type="monotone"
                dataKey={dataKey}
                stroke={stroke}
                strokeWidth={strokeWidth}
                dot={(props) => (
                  <CustomizedDot
                    {...props}
                    stroke={stroke}
                    period={period}
                    year={props.payload.year}
                    key={`${dataKey}-${props.payload.year}`}
                  />
                )}
                onClick={() => setQueryStates({ population: queryValue })}
              />
            ))}
            <XAxis dataKey="year" />
            <YAxis domain={[metadata.min, metadata.max]} tickFormatter={(value) => roundPopulation(value).toString()} />
            <Tooltip content={<CustomTooltip basePopulation={basePopulation} />} />
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
      {queryStates.population && (
        <Alert
          description={`Votre scénario anticipe une évolution de la population de ${evol > 0 ? `+${evol}` : evol} habitants sur la période 2021 - ${period}.`}
          severity="info"
          small
        />
      )}
      <div className={classes.buttonContainer}>
        <Button disabled={!queryStates.population} onClick={() => setQueryStates({ scenario: 'menages' })}>
          Traduire en nombre de ménages
        </Button>
      </div>
    </>
  )
}

const useStyles = tss.create({
  buttonContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginTop: '1rem',
  },
  chartContainer: {
    backgroundColor: 'white',
    height: '500px',
    padding: '1rem',
    width: '100%',
  },
})
