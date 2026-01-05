'use client'

import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Sector } from 'recharts'
import { PieSectorDataItem } from 'recharts/types/polar/Pie'
import { tss } from 'tss-react'
import { dsfrRealColors, getChartColor } from '~/components/charts/data-visualisation/colors'

const COLORS = [
  getChartColor('hosted'),
  getChartColor('noAccommodation'),
  getChartColor('financialInadequation'),
  getChartColor('physicalInadequation'),
  getChartColor('badQuality'),
]

export const StockEvolutionChart = ({
  chartData,
}: {
  chartData: {
    name: string
    value: number
  }[]
}) => {
  const { classes } = useStyles()

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
          {payload.name as string}
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
        <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} fill={fill}>{`Besoin en logements: ${value}`}</text>
        <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={18} textAnchor={textAnchor} fill={dsfrRealColors.blueEcume}>
          {`(soit ${(percent * 100).toFixed(2)}% du total)`}
        </text>
      </g>
    )
  }

  return (
    <div className={classes.chartContainer}>
      <ResponsiveContainer height="100%">
        <PieChart>
          <Pie
            data={chartData}
            activeShape={renderActiveShape}
            cx="50%"
            cy="50%"
            outerRadius={180}
            fill={dsfrRealColors.blueFrance}
            dataKey="value"
            innerRadius={160}
          >
            {chartData.map((_entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}

const useStyles = tss.create({
  chartContainer: {
    display: 'flex',
    height: '500px',
    width: '100%',
  },
})
