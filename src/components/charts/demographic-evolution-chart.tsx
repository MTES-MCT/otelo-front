'use client'

import { Table } from '@codegouvfr/react-dsfr/Table'
import { FC } from 'react'
import { LineChart, Line, YAxis, XAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts'
import { tss } from 'tss-react'
import { TSimulationWithResults } from '~/schemas/simulation'

interface DemographicEvolutionChartProps {
  data: TSimulationWithResults
}

export const DemographicEvolutionChart: FC<DemographicEvolutionChartProps> = ({ data }) => {
  const { classes } = useStyles()
  const omphaleData = data.results.demographicEvolution.futureProjections?.data
  const { max, min } = data.results.demographicEvolution.futureProjections?.metadata.data ?? { max: 0, min: 0 }
  const { demographicEvolution, renewalNeeds, secondaryResidenceAccomodationEvolution, totalFlux, vacantAccomodationEvolution } =
    data.results
  const { currentProjection } = demographicEvolution

  return (
    <div className={classes.container}>
      <h5>Besoin en flux - Evolution du besoin démographique en logements année par année</h5>
      <div className={classes.rowContainer}>
        <div className={classes.chartContainer}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              width={500}
              height={300}
              data={omphaleData}
              margin={{
                bottom: 5,
                left: 20,
                right: 30,
                top: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <Line name="Besoin en flux" type="monotone" dataKey="value" stroke="#8884d8" activeDot={{ r: 8 }} />
              <XAxis dataKey="year" />
              <YAxis domain={[min, max]} tickFormatter={(value) => Math.round(value).toString()} />
              <Tooltip />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className={classes.tableContainer}>
          <Table
            noCaption
            caption="Résumé des besoins en flux"
            data={[
              ['Évolution démographique', currentProjection, `${Number((currentProjection / totalFlux) * 100).toFixed(1)} %`],
              ['Besoin lié au renouvellement', renewalNeeds, `${Number((renewalNeeds / totalFlux) * 100).toFixed(1)} %`],
              [
                'Besoin lié à la résidence secondaire',
                secondaryResidenceAccomodationEvolution,
                `${Number((secondaryResidenceAccomodationEvolution / totalFlux) * 100).toFixed(1)} %`,
              ],
              [
                'Besoin lié à la vacance',
                vacantAccomodationEvolution,
                `${Number((vacantAccomodationEvolution / totalFlux) * 100).toFixed(1)} %`,
              ],
              ['Total', totalFlux, '-'],
            ]}
            fixed
            headers={['Catégorie', 'Besoin calculé', 'en % du total']}
          />
        </div>
      </div>
    </div>
  )
}

const useStyles = tss.create({
  chartContainer: {
    height: '600px',
    marginBottom: '2rem',
    width: '100%',
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    paddingLeft: '2rem',
    paddingTop: '2rem',
  },
  rowContainer: {
    borderBottom: '1px solid var(--border-default-grey)',
    display: 'flex',
    flexDirection: 'row',
    gap: '2rem',
  },
  tableContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    width: '50%',
  },
})
