'use client'

import { fr } from '@codegouvfr/react-dsfr'
import { FC } from 'react'
import { Bar, CartesianGrid, ComposedChart, Legend, ReferenceLine, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { tss } from 'tss-react'
import { dsfrRealColors, getChartColor } from '~/components/charts/data-visualisation/colors'
import { TFlowRequirementChartData, TSitadelData } from '~/schemas/results'

interface AccommodationContructionEvolutionChartProps {
  newConstructionsResults: TFlowRequirementChartData
  sitadelResults: TSitadelData
  horizon: number
}

export const AccommodationContructionEvolutionChart: FC<AccommodationContructionEvolutionChartProps> = ({
  newConstructionsResults,
  sitadelResults,
  horizon,
}) => {
  const { classes } = useStyles()
  const { data: sitadelData } = sitadelResults
  const { data: newConstructionsData } = newConstructionsResults

  const allYears = Array.from(
    new Set([
      ...sitadelData.map((d) => d.year),
      ...Object.keys(newConstructionsData.housingNeeds).map(Number),
      ...Object.keys(newConstructionsData.surplusHousing).map(Number),
    ]),
  ).sort((a, b) => a - b)

  const mergedData = allYears.map((year) => {
    const sitadelEntry = sitadelData.find((d) => d.year === year)
    return {
      housingNeeds: newConstructionsData.housingNeeds[year] ?? null,
      surplusHousing: newConstructionsData.surplusHousing[year] ?? null,
      authorizedHousing: sitadelEntry?.authorizedHousingCount ?? null,
      startedHousing: sitadelEntry?.startedHousingCount ?? null,
      year,
    }
  })

  const maxValue = Math.max(
    Math.max(...sitadelData.map((d) => d.authorizedHousingCount)),
    Math.max(...sitadelData.map((d) => d.startedHousingCount)),
    Math.max(...Object.values(newConstructionsData.housingNeeds)),
    Math.max(...Object.values(newConstructionsData.surplusHousing)),
  )

  return (
    <div className={classes.container}>
      <h3 className={fr.cx('fr-h5')}>Besoins en construction neuves annualisés</h3>
      <div className={classes.chartContainer}>
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart
            width={500}
            height={300}
            data={mergedData}
            margin={{
              bottom: 5,
              right: 50,
              top: 20,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <ReferenceLine
              x={horizon}
              stroke={dsfrRealColors.blueFrance}
              strokeDasharray="3 3"
              label={{
                value: 'Horizon de projection',
                position: 'top',
                fill: dsfrRealColors.blueFrance,
                fontSize: 12,
                offset: 10,
              }}
            />
            <Bar name="Permis de construire autorisés (Sit@del)" dataKey="authorizedHousing" fill={getChartColor('authorizedHousing')} />
            <Bar name="Logements commencés (Sit@del)" dataKey="startedHousing" fill={getChartColor('startedHousing')} />
            <Bar name="Besoins en logements" dataKey="housingNeeds" fill={getChartColor('housingNeeds')} />
            <Bar name="Logements excédentaires" dataKey="surplusHousing" fill={getChartColor('surplusHousing')} />
            <XAxis dataKey="year" angle={-45} textAnchor="end" height={60} />
            <Tooltip />
            <Legend
              itemSorter={(item) => {
                const order = ['authorizedHousing', 'startedHousing', 'housingNeeds', 'surplusHousing']
                return order.indexOf(item.dataKey as string)
              }}
            />
            <YAxis domain={[0, maxValue]} allowDecimals={false} includeHidden={true} />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

const useStyles = tss.create(() => ({
  chartContainer: {
    height: '600px',
    marginBottom: '2rem',
    paddingLeft: '2rem',
    paddingTop: '2rem',
    width: '100%',
  },
  container: {
    paddingTop: '2rem',
  },
}))
