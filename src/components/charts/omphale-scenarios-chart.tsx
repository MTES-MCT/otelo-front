'use client'

import { fr } from '@codegouvfr/react-dsfr'
import Alert from '@codegouvfr/react-dsfr/Alert'
import { parseAsString, useQueryStates } from 'nuqs'
import React, { FC } from 'react'
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, TooltipProps, XAxis, YAxis } from 'recharts'
import { NameType, ValueType } from 'recharts/types/component/DefaultTooltipContent'
import { tss } from 'tss-react'
import { CustomizedDot } from '~/components/charts/customized-dot'
import { SelectOmphale } from '~/components/simulations/settings/select-omphale'
import { TOmphaleDemographicEvolution, TOmphaleEvolution } from '~/schemas/demographic-evolution'
import { formatNumber } from '~/utils/format-numbers'
import { roundPopulation } from '~/utils/round-chart-axis'

interface DemographicEvolutionChartProps {
  demographicEvolution: TOmphaleDemographicEvolution
}

const SCENARIOS = [
  {
    dataKey: 'phH',
    id: 'haute',
    name: 'Ménages - Accélération',
    queryValue: 'PH_H',
    stroke: '#E4794A',
  },
  {
    dataKey: 'centralH',
    id: 'central',
    name: 'Ménages - Accélération',
    queryValue: 'Central_H',
    stroke: '#161616',
  },
  {
    dataKey: 'pbH',
    id: 'basse',
    name: 'Ménages - Accélération',
    queryValue: 'PB_H',
    stroke: '#FF9940',
  },
  {
    dataKey: 'centralC',
    id: 'central',
    name: 'Ménages - Tendanciel',
    queryValue: 'Central_C',
    stroke: '#666666',
  },
  {
    dataKey: 'pbC',
    id: 'basse',
    name: 'Ménages - Tendanciel',
    queryValue: 'PB_C',
    stroke: '#A558A0',
  },
  {
    dataKey: 'pbB',
    id: 'basse',
    name: 'Ménages - Décélération',
    queryValue: 'PB_B',
    stroke: '#CE614A',
  },
  {
    dataKey: 'centralB',
    id: 'central',
    name: 'Ménages - Décélération',
    queryValue: 'Central_B',
    stroke: '#000091',
  },
  {
    dataKey: 'phB',
    id: 'haute',
    name: 'Ménages - Décélération',
    queryValue: 'PH_B',
    stroke: '#91A7D0',
  },
  {
    dataKey: 'phC',
    id: 'haute',
    name: 'Ménages - Tendanciel',
    queryValue: 'PH_C',
    stroke: '#169B62',
  },
]

const CustomTooltip = ({
  active,
  basePopulation,
  label,
  payload,
}: TooltipProps<ValueType, NameType> & { basePopulation: TOmphaleEvolution }) => {
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

const findMaxValueYear = (data: TOmphaleEvolution[], scenarioKey?: string) => {
  if (!scenarioKey) return null
  return data.reduce((maxItem, currentItem) => {
    const currentValue = currentItem[scenarioKey as keyof TOmphaleEvolution] as number
    const maxValue = maxItem[scenarioKey as keyof TOmphaleEvolution] as number

    return currentValue > maxValue ? currentItem : maxItem
  }, data[0]).year
}

export const OmphaleScenariosChart: FC<DemographicEvolutionChartProps> = ({ demographicEvolution }) => {
  const { classes } = useStyles()
  const { data, metadata } = demographicEvolution

  const [queryStates, setQueryStates] = useQueryStates({
    omphale: parseAsString,
    population: parseAsString,
    projection: parseAsString,
  })

  const period = queryStates.projection ? queryStates.projection : '2030'
  const displayedScenarios = SCENARIOS.filter((scenario) => scenario.id === queryStates.population).map((scenario) => ({
    ...scenario,
    stroke: queryStates.omphale
      ? scenario.queryValue === queryStates.omphale
        ? scenario.stroke
        : `${scenario.stroke}33`
      : scenario.stroke,
    strokeWidth: queryStates.omphale && scenario.queryValue === queryStates.omphale ? 2 : 1,
  }))
  const basePopulation = data.find((item) => item.year === 2021) as TOmphaleEvolution
  const popEvolution = data.find((item) => item.year === Number(period)) as TOmphaleEvolution
  const formattedOmphale = queryStates.omphale?.replace('Central_', 'central').replace('PB_', 'pb').replace('PH_', 'ph')
  const evol = popEvolution[formattedOmphale as keyof typeof popEvolution] - basePopulation[formattedOmphale as keyof typeof basePopulation]
  const maxYear = findMaxValueYear(data, formattedOmphale)

  return (
    <>
      <Alert
        description="Les scénarios d'évolution proposés sont basés sur votre choix de projection par population à l'étape précédente.
        Vous avez la possibilité de revenir à l'étape précèdente pour modifier votre choix de projection par population."
        severity="info"
        small
        style={{ marginBottom: '1rem' }}
      />
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
                  dot={(props) => (
                    <CustomizedDot
                      {...props}
                      stroke={stroke}
                      period={period}
                      year={props.payload.year}
                      key={`${dataKey}-${props.payload.year}`}
                    />
                  )}
                  onClick={() => setQueryStates({ omphale: queryValue })}
                />
              </React.Fragment>
            ))}

            <XAxis dataKey="year" />
            <Tooltip content={<CustomTooltip basePopulation={basePopulation} />} />

            <YAxis domain={[metadata.min, metadata.max]} tickFormatter={(value) => roundPopulation(value).toString()} />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div className={fr.cx('fr-py-2w')}>
        <SelectOmphale />
      </div>
      {queryStates.omphale && maxYear && (
        <Alert
          description={
            <>
              <p>
                Votre scénario anticipe une évolution du nombre de ménages de {evol > 0 ? `+${evol}` : evol} sur la période 2021 - {period}.
              </p>
              <p>Le pic de ménages sera atteint en {maxYear}.</p>
            </>
          }
          severity="info"
          small
        />
      )}
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
