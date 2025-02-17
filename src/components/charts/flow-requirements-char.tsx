'use client'
import { FC } from 'react'
import { Bar, Legend, Tooltip, XAxis, YAxis } from 'recharts'
import { CartesianGrid } from 'recharts'
import { BarChart } from 'recharts'
import { ResponsiveContainer } from 'recharts'
import { tss } from 'tss-react'
import { DemographicEvolutionResultsTable } from '~/components/simulations/results/demographic-evolution-results-table'

interface FlowRequirementsChartProps {
  results: {
    demographicEvolution: number
    renewalNeeds: number
    secondaryResidenceAccomodationEvolution: number
    totalFlux: number
    vacantAccomodationEvolution: number
  }
}

export const FlowRequirementsChart: FC<FlowRequirementsChartProps> = ({ results }) => {
  const { demographicEvolution, renewalNeeds, secondaryResidenceAccomodationEvolution, totalFlux, vacantAccomodationEvolution } = results

  const positiveData = {
    name: 'Besoin supplémentaire',
    ...(demographicEvolution > 0 && { demographicEvolution }),
    ...(renewalNeeds > 0 && { renewalNeeds }),
    ...(secondaryResidenceAccomodationEvolution > 0 && { secondaryResidenceAccomodationEvolution }),
    ...(vacantAccomodationEvolution > 0 && { vacantAccomodationEvolution }),
  }

  const negativeData = {
    name: 'Besoin résorbée',
    ...(demographicEvolution < 0 && { demographicEvolution: Math.abs(demographicEvolution) }),
    ...(renewalNeeds < 0 && { renewalNeeds: Math.abs(renewalNeeds) }),
    ...(secondaryResidenceAccomodationEvolution < 0 && {
      secondaryResidenceAccomodationEvolution: Math.abs(secondaryResidenceAccomodationEvolution),
    }),
    ...(vacantAccomodationEvolution < 0 && {
      vacantAccomodationEvolution: Math.abs(vacantAccomodationEvolution),
    }),
  }

  const hasNegativeValues = Object.keys(negativeData).length > 1 // > 1 because it always has 'name'

  const chartData = [
    positiveData,
    ...(hasNegativeValues ? [negativeData] : []),
    {
      name: 'Bilan',
      totalFlux: Math.abs(totalFlux),
    },
  ]

  const { classes } = useStyles()

  return (
    <div className={classes.rowContainer}>
      <div className={classes.tableContainer}>
        <DemographicEvolutionResultsTable results={results} />
      </div>
      <div className={classes.chartContainer}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            width={500}
            height={300}
            data={chartData}
            margin={{
              bottom: 5,
              left: 20,
              right: 30,
              top: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="demographicEvolution" name="Démographie" stackId="a" fill="#4F46E5" />
            <Bar dataKey="secondaryResidenceAccomodationEvolution" name="Résidences secondaires" stackId="a" fill="#EC4899" />
            <Bar dataKey="vacantAccomodationEvolution" name="Vacance" stackId="a" fill="#10B981" />
            <Bar dataKey="renewalNeeds" name="Renouvellement" stackId="a" fill="#F59E0B" />
            <Bar dataKey="totalFlux" name="Demande potentielle" stackId="a" fill="#6366F1" />
            <Legend content={<p style={{ color: 'rgb(136, 132, 216)', margin: 0 }}>Évolution du besoin en flux détaillé</p>} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

const useStyles = tss.create({
  chartContainer: {
    height: '600px',
    marginBottom: '2rem',
    paddingLeft: '2rem',
    paddingTop: '2rem',
    width: '100%',
  },
  rowContainer: {
    display: 'flex',
    flexDirection: 'row',
    gap: '2rem',
  },
  tableContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    width: '30%',
  },
})
