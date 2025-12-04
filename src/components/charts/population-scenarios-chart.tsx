'use client'

import Badge from '@codegouvfr/react-dsfr/Badge'
import Button from '@codegouvfr/react-dsfr/Button'
import CallOut from '@codegouvfr/react-dsfr/CallOut'
import classNames from 'classnames'
import { parseAsArrayOf, parseAsString, useQueryStates } from 'nuqs'
import { FC } from 'react'
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { tss } from 'tss-react'
import { CustomizedDot } from '~/components/charts/customized-dot'
import { getChartColor } from '~/components/charts/data-visualisation/colors'
import { PopulationScenariosCustomTooltip } from '~/components/charts/population-scenarios-custom-tooltip'
import { PopulationScenariosSelection } from '~/components/charts/population-scenarios-selection'
import { DemographicSettingsSelectEpci } from '~/components/simulations/settings/demographic-settings-header'
import { TPopulationDemographicEvolution, TPopulationEvolution } from '~/schemas/demographic-evolution'
import { roundPopulation } from '~/utils/round-chart-axis'
interface PopulationEvolutionChartProps {
  demographicEvolution: TPopulationDemographicEvolution
  modification?: boolean
  epcis?: string[]
}

const SCENARIOS = [
  {
    dataKey: 'haute',
    name: 'Haute',
    queryValue: 'haute',
    stroke: getChartColor('haute'),
  },
  {
    dataKey: 'central',
    name: 'Central',
    queryValue: 'central',
    stroke: getChartColor('central'),
  },
  {
    dataKey: 'basse',
    name: 'Basse',
    queryValue: 'basse',
    stroke: getChartColor('basse'),
  },
]

export const PopulationScenariosChart: FC<PopulationEvolutionChartProps> = ({ demographicEvolution, epcis }) => {
  const { classes } = useStyles()
  const [queryStates, setQueryStates] = useQueryStates({
    population: parseAsString,
    projection: parseAsString,
    scenario: parseAsString,
    epcis: parseAsArrayOf(parseAsString).withDefault([]),
    epciChart: parseAsString,
  })

  const selectedEpci = queryStates.epciChart ?? queryStates.epcis[0]
  const selectedData = selectedEpci ? demographicEvolution[selectedEpci] : null

  if (!selectedData) {
    return (
      <div className={classes.chartContainer}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>Chargement...</div>
      </div>
    )
  }

  const { data, metadata } = selectedData

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
      <PopulationScenariosSelection />
      <DemographicSettingsSelectEpci epcis={epcis ?? queryStates.epcis} />

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
                onClick={() => {
                  setQueryStates({ population: queryValue })
                }}
              />
            ))}
            <XAxis dataKey="year" />
            <YAxis domain={[metadata.min, metadata.max]} tickFormatter={(value) => roundPopulation(value).toString()} />
            <Tooltip content={<PopulationScenariosCustomTooltip basePopulation={basePopulation} />} />
          </LineChart>
        </ResponsiveContainer>
      </div>
      {queryStates.population && (
        <CallOut
          title={
            <Badge severity="new" noIcon small>
              <span className={classNames(classes.badgeIcon, 'ri-lightbulb-line fr-mr-1v')} />
              <span className="fr-text--uppercase">Clé de lecture</span>
            </Badge>
          }
        >
          <>
            <span>
              Ce scénario anticipe une évolution de la population de <strong>{evol > 0 ? `+${evol}` : evol}</strong> habitant
              {evol > 0 ? 's' : ''} sur la période 2021 - {period}.
            </span>
            <br />
            <span className="fr-text--sm fr-text-mention--grey fr-mb-0">Source des données : INSEE</span>
          </>
        </CallOut>
      )}

      <div className={classes.buttonContainer}>
        <Button disabled={!queryStates.population} onClick={() => setQueryStates({ scenario: 'menages' })}>
          Choisir une projection de ménages
        </Button>
      </div>
    </>
  )
}

const useStyles = tss.create({
  badgeIcon: {
    '&::before': {
      '--icon-size': '12px',
    },
  },
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
  tooltipContainer: {
    backgroundColor: 'white',
    border: '1px solid var(--border-default-grey)',
    borderRadius: '4px',
    padding: '1rem',
  },
  tooltipTitle: {
    fontWeight: 'bold',
    marginBottom: '0.5rem',
  },
  tooltipItem: {
    alignItems: 'center',
    display: 'flex',
    gap: '0.5rem',
    marginTop: '0.25rem',
  },
  tooltipDot: {
    borderRadius: '50%',
    height: '8px',
    width: '8px',
  },
  bold: {
    fontWeight: 'bold',
  },
  smallText: {
    fontSize: '10px',
  },
})
