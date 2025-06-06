'use client'

import { Table } from '@codegouvfr/react-dsfr/Table'
import { FC, useState } from 'react'
import { Cell, Pie, PieChart, ResponsiveContainer, Sector } from 'recharts'
import { PieSectorDataItem } from 'recharts/types/polar/Pie'
import { tss } from 'tss-react'
import { formatNumber } from '~/utils/format-numbers'

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042']

interface StockEvolutionChartProps {
  results: {
    badQuality: number
    financialInadequation: number
    hosted: number
    noAccomodation: number
    physicalInadequation: number
    socialParc: number
    totalStock: number
  }
}

export const StockEvolutionChart: FC<StockEvolutionChartProps> = ({ results }) => {
  const [activeIndex, setActiveIndex] = useState<number>()
  const { classes } = useStyles()
  const { badQuality, financialInadequation, hosted, noAccomodation, physicalInadequation, socialParc, totalStock } = results
  const chartData = [
    { name: 'Hébergés', value: hosted },
    { name: 'Hors logement', value: noAccomodation },
    { name: 'Inadéquation financière', value: financialInadequation },
    { name: 'Inadéquation physique', value: physicalInadequation },
    { name: 'Parc social', value: socialParc },
    { name: 'Mauvaise qualité', value: badQuality },
  ]

  const onPieEnter = (_: unknown, index: number) => setActiveIndex(index)

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
        <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill} style={{ fontSize: '20px' }}>
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
          <ResponsiveContainer height="100%">
            <PieChart>
              <Pie
                activeIndex={activeIndex}
                onMouseEnter={onPieEnter}
                data={chartData}
                activeShape={renderActiveShape}
                cx="50%"
                cy="50%"
                outerRadius={180}
                fill="#8884d8"
                dataKey="value"
                innerRadius={160}
              >
                {chartData.map((_entry, index) => (
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
              ['Hébergés', formatNumber(hosted), `${Number((hosted / totalStock) * 100).toFixed(1)} %`],
              ['Hors logement', formatNumber(noAccomodation), `${Number((noAccomodation / totalStock) * 100).toFixed(1)} %`],
              [
                'Inadéquation financière',
                formatNumber(financialInadequation),
                `${Number((financialInadequation / totalStock) * 100).toFixed(1)} %`,
              ],
              [
                'Inadéquation physique',
                formatNumber(physicalInadequation),
                `${Number((physicalInadequation / totalStock) * 100).toFixed(1)} %`,
              ],
              ['Parc social', formatNumber(socialParc), `${Number((socialParc / totalStock) * 100).toFixed(1)} %`],
              ['Mauvaise qualité', formatNumber(badQuality), `${Number((badQuality / totalStock) * 100).toFixed(1)} %`],
              ['Total', formatNumber(totalStock), '-'],
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
    height: '500px',
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
    flexDirection: 'column',
    gap: '1rem',
  },
  tableContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
})
