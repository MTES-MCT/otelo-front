'use client'

import React, { FC, useState } from 'react'
import { Cell, Pie, PieChart, ResponsiveContainer, Sector } from 'recharts'
import { PieSectorDataItem } from 'recharts/types/polar/Pie'
import { tss } from 'tss-react'
import { TSimulationWithResults } from '~/schemas/simulation'
import { Table } from '@codegouvfr/react-dsfr/Table'

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042']

export const StockEvolutionChart: FC<{ data: TSimulationWithResults }> = ({ data }) => {
  const [activeIndex, setActiveIndex] = useState<number>()
  const { classes } = useStyles()
  const { badQuality, financialInadequation, hosted, noAccomodation, physicalInadequation, socialParc, totalStock } = data.results
  const chartData = [
    { name: 'Hébergés', value: hosted },
    { name: 'Hors logement', value: noAccomodation },
    { name: 'Inadéquation financière', value: financialInadequation },
    { name: 'Inadéquation physique', value: physicalInadequation },
    { name: 'Parc social', value: socialParc },
    { name: 'Mauvaise qualité', value: badQuality },
  ]

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onPieEnter = (_: any, index: number) => setActiveIndex(index)

  const renderActiveShape = (props: PieSectorDataItem) => {
    const RADIAN = Math.PI / 180
    const { endAngle, fill, innerRadius, payload, startAngle, value } = props
    const midAngle = props.midAngle as number
    const cx = props.cx as number
    const cy = props.cy as number
    const outerRadius = props.outerRadius as number
    const percent = props.percent as number
    const sin = Math.sin(-RADIAN * midAngle)
    const cos = Math.cos(-RADIAN * midAngle)
    const sx = cx + (outerRadius + 10) * cos
    const sy = cy + (outerRadius + 10) * sin
    const mx = cx + (outerRadius + 30) * cos
    const my = cy + (outerRadius + 30) * sin
    const ex = mx + (cos >= 0 ? 1 : -1) * 22
    const ey = my
    const textAnchor = cos >= 0 ? 'start' : 'end'

    return (
      <g>
        <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
          {payload.name}
        </text>
        <Sector
          cx={cx}
          cy={cy}
          innerRadius={innerRadius}
          outerRadius={outerRadius}
          startAngle={startAngle}
          endAngle={endAngle}
          fill={fill}
        />
        <Sector
          cx={cx}
          cy={cy}
          startAngle={startAngle}
          endAngle={endAngle}
          innerRadius={outerRadius + 6}
          outerRadius={outerRadius + 10}
          fill={fill}
        />
        <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none" />
        <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
        <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} fill="#333">{`Besoin en logements: ${value}`}</text>
        <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={18} textAnchor={textAnchor} fill="#999">
          {`(soit ${(percent * 100).toFixed(2)}% du total)`}
        </text>
      </g>
    )
  }

  return (
    <div className={classes.container}>
      <h5>Besoin en stock - Evolution du besoin en stock</h5>
      <div className={classes.rowContainer}>
        <div className={classes.chartContainer}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                activeIndex={activeIndex}
                onMouseEnter={onPieEnter}
                data={chartData}
                activeShape={renderActiveShape}
                cx="50%"
                cy="50%"
                outerRadius={220}
                fill="#8884d8"
                dataKey="value"
                innerRadius={180}
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className={classes.tableContainer}>
          <Table
            noCaption
            caption="Résumé des besoins en stock"
            data={[
              ['Hébergés', hosted, `${Number((hosted / totalStock) * 100).toFixed(1)} %`],
              ['Hors logement', noAccomodation, `${Number((noAccomodation / totalStock) * 100).toFixed(1)} %`],
              ['Inadéquation financière', financialInadequation, `${Number((financialInadequation / totalStock) * 100).toFixed(1)} %`],
              ['Inadéquation physique', physicalInadequation, `${Number((physicalInadequation / totalStock) * 100).toFixed(1)} %`],
              ['Parc social', socialParc, `${Number((socialParc / totalStock) * 100).toFixed(1)} %`],
              ['Mauvaise qualité', badQuality, `${Number((badQuality / totalStock) * 100).toFixed(1)} %`],
              ['Total', totalStock, '-'],
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
    display: 'flex',
    height: '600px',
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
