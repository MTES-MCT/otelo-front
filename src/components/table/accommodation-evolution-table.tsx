import { FC } from 'react'
import { TAccommodationEvolutionDataTable } from '~/schemas/accommodation-evolution'
import { formatNumber } from '~/utils/format-numbers'
import styles from './population-evolution-table.module.css'

interface AccommodationEvolutionTableProps {
  data: TAccommodationEvolutionDataTable
  type: 'secondaryAccommodation' | 'vacant'
}

export const AccommodationEvolutionTable: FC<AccommodationEvolutionTableProps> = ({ data, type }) => {
  const dataTable = Object.entries(data).map((row) => {
    const rowValue = row[1]
    return {
      [rowValue.name]: {
        '2010': { value: rowValue[2010].value, percent: rowValue[2010].percent },
        '2015': { value: rowValue[2015].value, percent: rowValue[2015].percent },
        '2021': { value: rowValue[2021].value, percent: rowValue[2021].percent },
        annualEvolution: rowValue.annualEvolution,
      },
    }
  })
  const title = type === 'secondaryAccommodation' ? 'Résidences secondaires' : 'Logements vacants'

  return (
    <div className={styles.container}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th rowSpan={3} className={styles.headerCellSpan}>
              BH/EPCI
            </th>
            <th colSpan={6} className={styles.headerCell}>
              {title}
            </th>
            <th colSpan={4} className={styles.headerCell}>
              Evolution moyenne annuelle
            </th>
          </tr>
          <tr>
            <th colSpan={3} className={styles.headerCell}>
              Volume
            </th>
            <th colSpan={3} className={styles.headerCell}>
              Part
            </th>
            <th colSpan={2} className={styles.headerCell}>
              Volume
            </th>
            <th colSpan={2} className={styles.headerCell}>
              point de %
            </th>
          </tr>
          <tr>
            <th className={styles.headerCell}>2010</th>
            <th className={styles.headerCell}>2015</th>
            <th className={styles.headerCell}>2021</th>
            <th className={styles.headerCell}>2010</th>
            <th className={styles.headerCell}>2015</th>
            <th className={styles.headerCell}>2021</th>
            <th className={styles.headerCell}>2010 - 2015</th>
            <th className={styles.headerCell}>2015 - 2021</th>
            <th className={styles.headerCell}>2010 - 2015</th>
            <th className={styles.headerCell}>2015 - 2021</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(dataTable).map(([key, value]) => {
            const territoryName = Object.keys(value)[0]
            const territoryData = Object.values(value)[0]
            return (
              <tr key={key}>
                <td className={styles.cell}>{territoryName}</td>
                <td className={styles.cellMinWidth}>{formatNumber(territoryData['2010'].value)}</td>
                <td className={styles.cellMinWidth}>{formatNumber(territoryData['2015'].value)}</td>
                <td className={styles.cellMinWidth}>{formatNumber(territoryData['2021'].value)}</td>
                <td className={styles.cellMinWidth}>{territoryData['2010'].percent}</td>
                <td className={styles.cellMinWidth}>{territoryData['2015'].percent}</td>
                <td className={styles.cellMinWidth}>{territoryData['2021'].percent}</td>
                <td className={styles.cellMinWidth}>{formatNumber(territoryData.annualEvolution['2010-2015'].value) || '-'}</td>
                <td className={styles.cellMinWidth}>{formatNumber(territoryData.annualEvolution['2015-2021'].value) || '-'}</td>
                <td className={styles.cellMinWidth}>{territoryData.annualEvolution['2010-2015'].percent || '-'}</td>
                <td className={styles.cellMinWidth}>{territoryData.annualEvolution['2015-2021'].percent || '-'}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
