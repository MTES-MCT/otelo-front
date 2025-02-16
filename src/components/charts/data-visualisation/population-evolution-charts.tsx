import { FC } from 'react'
import { Bar, BarChart, CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { tss } from 'tss-react'
import { useEpci } from '~/hooks/use-epci'
import { TRPPopulationEvolution } from '~/schemas/population-evolution'

type PopulationEvolutionChartProps = {
  data: TRPPopulationEvolution
  type: string | null
}

export const PopulationEvolutionChart: FC<PopulationEvolutionChartProps> = ({ data: chartData, type }) => {
  const { classes } = useStyles()
  const epcis = Object.keys(chartData.linearChart)
  const linearDataKey = type?.split('-')[0]
  const { data: epciData } = useEpci()
  console.log('datakey', linearDataKey, epciData)
  return (
    <>
      <h1>{epciData?.name}</h1>
      <div className={classes.chartContainer}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart width={500} height={500}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="year" allowDuplicatedCategory={false} />

            <YAxis dataKey={linearDataKey} />
            <Tooltip />
            {epcis.map((epci) => {
              const data = chartData.linearChart[epci].data
              return <Line dataKey={linearDataKey} data={data} name={epci} key={epci} />
            })}
          </LineChart>
        </ResponsiveContainer>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart width={730} height={250} data={chartData.barChart}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="year" />
            <YAxis />
            <Tooltip />
            {epcis.map((epci) => {
              return <Bar dataKey={epci} fill="#82ca9d" key={epci} />
            })}
          </BarChart>
        </ResponsiveContainer>
      </div>
    </>
  )
}

const useStyles = tss.create({
  chartContainer: {
    display: 'flex',
    height: '500px',
    marginBottom: '2rem',
    paddingLeft: '2rem',
    paddingTop: '2rem',
    width: '100%',
  },
})
