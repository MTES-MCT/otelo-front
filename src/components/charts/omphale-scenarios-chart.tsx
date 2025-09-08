'use client'

import { fr } from '@codegouvfr/react-dsfr'
import Alert from '@codegouvfr/react-dsfr/Alert'
import Button from '@codegouvfr/react-dsfr/Button'
import { parseAsArrayOf, parseAsString, useQueryStates } from 'nuqs'
import React, { FC, useEffect, useState } from 'react'
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { NameType, Payload as TooltipPayload, ValueType } from 'recharts/types/component/DefaultTooltipContent'
import { tss } from 'tss-react'
import { CustomizedDot } from '~/components/charts/customized-dot'
import { UploadDemographicEvolutionCustom } from '~/components/charts/upload-demographic-evolution-custom'
import { SelectOmphale } from '~/components/simulations/settings/select-omphale'
import { useDemographicEvolutionCustom } from '~/hooks/use-demographic-evolution-custom'
import { useEpcis } from '~/hooks/use-epcis'
import { TOmphaleDemographicEvolution, TOmphaleEvolution } from '~/schemas/demographic-evolution'
import { formatNumber } from '~/utils/format-numbers'
import { roundPopulation } from '~/utils/round-chart-axis'

interface DemographicEvolutionChartProps {
  demographicEvolution: TOmphaleDemographicEvolution
  onChange?: (e: string) => void
  scenarioId?: string
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
  {
    dataKey: 'custom',
    id: 'custom',
    name: 'Personnalisé',
    queryValue: 'PH_C',
    stroke: '#31c51d',
  },
]

type TOmphaleEvolutionWithCustom = TOmphaleEvolution & { custom?: number }

const OmphaleScenariosTooltip = ({
  active,
  basePopulation,
  label,
  payload,
}: {
  active?: boolean
  label?: string
  payload?: TooltipPayload<ValueType, NameType>[]
  basePopulation: TOmphaleEvolution
}) => {
  const { classes } = useStyles()
  if (!active || !payload?.length) return null
  return (
    <div className={classes.tooltipContainer}>
      <p className={classes.tooltipTitle}>{`Année ${label}`}</p>
      {/* biome-ignore lint/suspicious/noExplicitAny: TODO */}
      {payload.map((item: any) => {
        const evol = item.value - basePopulation[item.dataKey as keyof typeof basePopulation]
        return (
          <div key={item.dataKey} className={classes.tooltipItem}>
            <div className={classes.tooltipDot} style={{ backgroundColor: item.stroke }} />
            <span>{item.name}:</span>
            <span>
              <span className={classes.bold}>{evol > 0 ? `+${formatNumber(evol)}` : formatNumber(evol)}</span> ménages par rapport à{' '}
              <span className={classes.bold}>2021</span>
            </span>
            <span className={classes.smallText}>({formatNumber(item.value)} ménages)</span>
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

export const OmphaleScenariosChart: FC<DemographicEvolutionChartProps> = ({ demographicEvolution, onChange, scenarioId }) => {
  const { classes } = useStyles()

  const [queryStates, setQueryStates] = useQueryStates({
    omphale: parseAsString,
    population: parseAsString,
    projection: parseAsString,
    epciChart: parseAsString.withDefault(''),
    epcis: parseAsArrayOf(parseAsString).withDefault([]),
    demographicEvolutionOmphaleCustomIds: parseAsArrayOf(parseAsString).withDefault([]),
  })
  const currentEpci = queryStates.epciChart || queryStates.epcis[0]
  const { data, metadata } = demographicEvolution[currentEpci]
  const [chartData, setChartData] = useState<TOmphaleEvolutionWithCustom[]>(data)
  const [isUsingCustomData, setIsUsingCustomData] = useState(false)

  // Fetch all custom demographic data with a single query
  const { data: allCustomData = [] } = useDemographicEvolutionCustom(queryStates.demographicEvolutionOmphaleCustomIds)

  // Find custom data that matches the current EPCI and scenario (if provided)
  const customDataEpci = allCustomData.find((data) => data.epciCode === currentEpci) || null

  // Transform custom data to match the chart format if available
  useEffect(() => {
    if (customDataEpci && customDataEpci.data) {
      // Only use custom data if it matches the current EPCI and scenario
      setChartData(
        data.map((item) => {
          const yearCustomData = customDataEpci.data.find((d) => d.year === item.year)
          return { ...item, custom: yearCustomData?.value || 0 }
        }),
      )
      setIsUsingCustomData(true)
    } else {
      setChartData(data)
      setIsUsingCustomData(false)
    }
  }, [customDataEpci, currentEpci])
  const { data: epcis } = useEpcis([currentEpci])
  const currentEpciData = epcis?.[0]
  const currentEpciName = currentEpciData?.name || ''

  const period = queryStates.projection ? queryStates.projection : '2030'
  const displayedScenarios = SCENARIOS.filter(
    (scenario) => scenario.id === queryStates.population || (isUsingCustomData && scenario.dataKey === 'custom'),
  ).map((scenario) => {
    const isActive = scenario.queryValue === queryStates.omphale || (isUsingCustomData && scenario.dataKey === 'custom')
    return {
      ...scenario,
      stroke: queryStates.omphale ? (isActive ? scenario.stroke : `${scenario.stroke}33`) : scenario.stroke,
      strokeWidth: isActive ? 2 : 1,
    }
  })

  const basePopulation = chartData.find((item) => item.year === 2021)
  const popEvolution = chartData.find((item) => item.year === Number(period))
  const formattedOmphale = queryStates.omphale?.replace('Central_', 'central').replace('PB_', 'pb').replace('PH_', 'ph')
  const basePopulationValue = isUsingCustomData ? basePopulation?.custom : basePopulation?.[formattedOmphale as keyof typeof basePopulation]
  const popEvolutionValue = isUsingCustomData ? popEvolution?.custom : popEvolution?.[formattedOmphale as keyof typeof popEvolution]
  const evol = basePopulationValue && popEvolutionValue ? popEvolutionValue - basePopulationValue : 0
  const maxYear = findMaxValueYear(chartData, formattedOmphale)

  const onDeleteCustomData = async () => {
    if (!customDataEpci?.id) return

    try {
      // Call the delete API
      const response = await fetch(`/api/demographic-evolution-custom/${customDataEpci.id}`, {
        method: 'DELETE',
      })

      if (!response.ok) {
        throw new Error('Failed to delete custom demographic data')
      }

      // Remove the deleted ID from search params
      const remainingIds = queryStates.demographicEvolutionOmphaleCustomIds.filter((id) => id !== customDataEpci.id)
      await setQueryStates({ demographicEvolutionOmphaleCustomIds: remainingIds })
    } catch (error) {
      console.error('Error deleting custom demographic data:', error)
      alert('Erreur lors de la suppression des données personnalisées')
    }
  }

  return (
    <>
      {isUsingCustomData ? (
        <Alert
          description={`Vous utilisez actuellement des données démographiques personnalisées importées pour ${currentEpciName}. Les scénarios affichés utilisent ces données personnalisées.`}
          severity="warning"
          small
          className={fr.cx('fr-mb-2w')}
        />
      ) : (
        <Alert
          description="Les scénarios d'évolution proposés sont basés sur votre choix de projection par population à l'étape précédente.
          Vous avez la possibilité de revenir à l'étape précèdente pour modifier votre choix de projection par population."
          severity="info"
          small
          className={fr.cx('fr-mb-2w')}
        />
      )}
      <div className={fr.cx('fr-mb-2w')}>
        <UploadDemographicEvolutionCustom epciCode={currentEpci} scenarioId={scenarioId} />
        {isUsingCustomData && (
          <Button iconId="fr-icon-delete-line" onClick={onDeleteCustomData} priority="tertiary" size="small" className={fr.cx('fr-mt-1w')}>
            Supprimer les données personnalisées
          </Button>
        )}
      </div>
      <div className={classes.chartContainer}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart width={500} height={300} data={chartData}>
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
                  onClick={() => {
                    setQueryStates({ omphale: queryValue })
                  }}
                />
              </React.Fragment>
            ))}

            <XAxis dataKey="year" />
            <Tooltip content={<OmphaleScenariosTooltip basePopulation={basePopulation as TOmphaleEvolutionWithCustom} />} />

            <YAxis domain={[metadata.min, metadata.max]} tickFormatter={(value) => roundPopulation(value).toString()} />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div className={fr.cx('fr-py-2w')}>
        <SelectOmphale onChange={onChange} />
      </div>
      {queryStates.omphale && maxYear && (
        <Alert
          description={
            <>
              <p>
                Votre scénario anticipe une évolution du nombre de ménages de {evol > 0 ? `+${evol}` : evol} sur la période 2021 - {period}.
              </p>
              <p>Le pic de ménages sera atteint {maxYear < 2050 ? `en ${maxYear}` : `après ${maxYear}`}.</p>
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
    backgroundColor: 'var(--stroke-color)',
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
