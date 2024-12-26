'use client'

import React, { FC } from 'react'
import { ResponsiveContainer, Pie, Cell, PieChart, Tooltip } from 'recharts'
import { tss } from 'tss-react'
import { TSimulationWithResults } from '~/schemas/simulation'

const mockData = [
  { name: 'Group A', value: 400 },
  { name: 'Group B', value: 300 },
  { name: 'Group C', value: 300 },
  { name: 'Group D', value: 200 },
]

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042']

export const StockEvolutionChart: FC<{ data: TSimulationWithResults }> = ({ data }) => {
  const { classes } = useStyles()
  const { badQuality, financialInadequation, hosted, noAccomodation, physicalInadequation, socialParc, totalStock } = data.results

  return (
    <div className={classes.container}>
      <h5>Besoin en stock - Evolution du besoin en stock sur la periode 2021 - 2027</h5>
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <div className={classes.chartContainer}>
          <ResponsiveContainer>
            <PieChart width={800} height={400}>
              <Pie data={mockData} cx="50%" cy="50%" labelLine label outerRadius={80} fill="#8884d8" dataKey="value">
                {mockData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
          <span>Hébergés {hosted}</span>
          <span>Hors logement {noAccomodation}</span>
          <span>Inadéquation financière {financialInadequation}</span>
          <span>Inadéquation physique {physicalInadequation}</span>
          <span>Parc social {socialParc}</span>
          <span>Mauvaise qualité {badQuality}</span>
          <span>Total {totalStock}</span>
        </div>
      </div>
    </div>
  )
}

const useStyles = tss.create({
  chartContainer: {
    display: 'flex',
    height: '600px',
    width: '40%',
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    paddingLeft: '2rem',
    paddingTop: '2rem',
  },
})
