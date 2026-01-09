'use client'
import { FC } from 'react'
import { Bar, Legend, Tooltip, XAxis, YAxis } from 'recharts'
import { CartesianGrid } from 'recharts'
import { BarChart } from 'recharts'
import { ResponsiveContainer } from 'recharts'
import { tss } from 'tss-react'
import { getChartColor } from '~/components/charts/data-visualisation/colors'
interface CustomXAxisTickProps {
  x?: number
  y?: number
  payload?: {
    value: string
  }
}

const CustomXAxisTick = (props: CustomXAxisTickProps) => {
  const { x, y, payload } = props

  if (!payload) return null

  const { value } = payload

  if (value.includes('démographique')) {
    return (
      <g transform={`translate(${x},${y})`}>
        <text x={0} y={0} dy={16} textAnchor="middle" fill="#666" fontSize="12">
          <tspan x={0} dy="16">
            Besoin en logements liés à l'évolution
          </tspan>
          <tspan x={0} dy="16">
            démographique et évolution du parc
          </tspan>
        </text>
      </g>
    )
  }

  return (
    <g transform={`translate(${x},${y})`}>
      <text x={0} y={0} dy={16} textAnchor="middle" fill="#666" fontSize="12">
        {value}
      </text>
    </g>
  )
}

interface FlowRequirementsChartProps {
  results: {
    demographicEvolution: number
    renewalNeeds: number
    secondaryResidenceAccomodationEvolution: number
    totalFlux: number
    vacantAccomodationEvolution: number
    shortTermVacantAccomodation: number
    longTermVacantAccomodation: number
  }
}

export const FlowRequirementsChart: FC<FlowRequirementsChartProps> = ({ results }) => {
  const {
    demographicEvolution,
    renewalNeeds,
    secondaryResidenceAccomodationEvolution,
    totalFlux,
    shortTermVacantAccomodation,
    longTermVacantAccomodation,
  } = results

  const positiveData = {
    name: "Besoin en logements liés à l'évolution démographique et à l'évolution du parc",
    ...(demographicEvolution > 0 && { demographicEvolution }),
    ...(renewalNeeds > 0 && { renewalNeeds }),
    ...(secondaryResidenceAccomodationEvolution > 0 && { secondaryResidenceAccomodationEvolution }),
    ...(longTermVacantAccomodation > 0 && { longTermVacantAccomodation }),
    ...(shortTermVacantAccomodation > 0 && { shortTermVacantAccomodation }),
  }

  const negativeData = {
    name: 'Mobilisation du parc existant',
    ...(longTermVacantAccomodation < 0 && {
      longTermVacantAccomodation: Math.abs(longTermVacantAccomodation),
    }),
    ...(secondaryResidenceAccomodationEvolution < 0 && {
      secondaryResidenceAccomodationEvolution: Math.abs(secondaryResidenceAccomodationEvolution),
    }),
    ...(renewalNeeds < 0 && { renewalNeeds: Math.abs(renewalNeeds) }),
  }

  const hasNegativeValues = Object.keys(negativeData).length > 1 // > 1 because it always has 'name'

  const chartData = [
    positiveData,
    ...(hasNegativeValues ? [negativeData] : []),
    {
      name: 'Construction neuves supplémentaires',
      totalFlux,
    },
  ]

  const { classes } = useStyles()

  return (
    <div className={classes.chartContainer}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart width={500} height={300} data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" tick={<CustomXAxisTick />} interval={0} height={60} />
          <YAxis />
          <Tooltip />
          <Bar dataKey="demographicEvolution" name="Démographie" stackId="a" fill={getChartColor('demographicEvolution')} />
          <Bar
            dataKey="secondaryResidenceAccomodationEvolution"
            name="Résidences secondaires"
            stackId="a"
            fill={getChartColor('secondaryResidenceAccomodationEvolution')}
          />
          <Bar
            dataKey="longTermVacantAccomodation"
            name="Logements vacants de longue durée"
            stackId="a"
            fill={getChartColor('longTermVacantAccomodation')}
          />
          <Bar
            dataKey="shortTermVacantAccomodation"
            name="Logements vacants de courte durée"
            stackId="a"
            fill={getChartColor('shortTermVacantAccomodation')}
          />
          <Bar dataKey="renewalNeeds" name="Renouvellement" stackId="a" fill={getChartColor('renewalNeeds')} />
          <Bar dataKey="totalFlux" name="Demande potentielle" stackId="a" fill={getChartColor('totalFlux')} />
          <Legend
            content={
              <p style={{ color: 'rgb(136, 132, 216)', margin: 0 }}>
                Évolution du besoin liés à la démographie et à l'évolution du parc détaillé
              </p>
            }
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

const useStyles = tss.create({
  chartContainer: {
    height: '600px',
    width: '100%',
  },
})
