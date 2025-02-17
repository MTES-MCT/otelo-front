// 'use client'

// import { FC } from 'react'
// import { LineChart, Line, YAxis, XAxis, CartesianGrid, ResponsiveContainer, Tooltip, Legend } from 'recharts'
// import { tss } from 'tss-react'
// import { CustomizedDot } from '~/components/charts/customized-dot'
// import { TSimulationWithResults } from '~/schemas/simulation'

// interface DemographicEvolutionChartProps {
//   data: TSimulationWithResults
// }

// export const DemographicEvolutionChart: FC<DemographicEvolutionChartProps> = ({ data }) => {
//   const { classes } = useStyles()
//   const omphaleData = data.results.demographicEvolution.futureProjections?.data
//   const { max, min } = data.results.demographicEvolution.futureProjections?.metadata.data ?? { max: 0, min: 0 }

//   return (
//     <div className={classes.chartContainer}>
//       <ResponsiveContainer width="100%" height="100%">
//         <LineChart
//           width={500}
//           height={300}
//           data={omphaleData}
//           margin={{
//             bottom: 5,
//             left: 20,
//             right: 30,
//             top: 5,
//           }}
//         >
//           <CartesianGrid strokeDasharray="3 3" />
//           <Line
//             name="Évolution démographique année par année"
//             type="monotone"
//             dataKey="value"
//             stroke="#8884d8"
//             dot={(props) => (
//               <CustomizedDot
//                 {...props}
//                 stroke="#8884d8"
//                 period={data.scenario.projection}
//                 year={props.payload.year}
//                 key={`${props.key}-${props.payload.year}`}
//               />
//             )}
//           />
//           <XAxis dataKey="year" />
//           <Tooltip />
//           <Legend />
//           <YAxis domain={[min, max]} tickFormatter={(value) => Math.round(value).toString()} />
//         </LineChart>
//       </ResponsiveContainer>
//     </div>
//   )
// }

// const useStyles = tss.create({
//   chartContainer: {
//     height: '600px',
//     marginBottom: '2rem',
//     paddingLeft: '2rem',
//     paddingTop: '2rem',
//     width: '100%',
//   },
// })
