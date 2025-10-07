import Table from '@codegouvfr/react-dsfr/Table'
import { TEpciTotalCalculationResult, TFlowRequirementChartData } from '~/schemas/results'
import { TSimulationWithResults } from '~/schemas/simulation'
import { calculateFlowResultsForEpci } from '~/utils/calculation-helpers'
import { formatNumber } from '~/utils/format-numbers'
import styles from './epcis-details-table.module.css'

type EpcisDetailsTableProps = {
  simulation: TSimulationWithResults
}

export const EpcisDetailsTable = ({ simulation }: EpcisDetailsTableProps) => {
  const tableData = simulation.epcis.map((epci) => {
    const total = (simulation.results.epcisTotals.find((e) => e.epciCode === epci.code) as TEpciTotalCalculationResult).total
    const totalFlux = (simulation.results.epcisTotals.find((e) => e.epciCode === epci.code) as TEpciTotalCalculationResult).totalFlux
    const totalStock = (simulation.results.epcisTotals.find((e) => e.epciCode === epci.code) as TEpciTotalCalculationResult).totalStock
    const flowRequirementsEpci = simulation.results.flowRequirement.epcis.find((e) => e.code === epci.code) as TFlowRequirementChartData
    const flowResults = calculateFlowResultsForEpci(flowRequirementsEpci, totalFlux)
    return [
      epci.name,
      formatNumber(flowResults.totalFlux),
      formatNumber(totalStock), // Mal-logement - needs to be calculated
      formatNumber(total),
      flowResults.longTermVacantAccomodation < 0 ? formatNumber(Math.abs(flowResults.longTermVacantAccomodation)) : 0, // Logements vacants à remobiliser
      flowRequirementsEpci.data.peakYear !== 2050 ? flowRequirementsEpci.data.peakYear : 'après 2050', // Année à partir de laquelle le territoire n'a plus de besoin - needs to be calculated
    ]
  })

  return (
    <div className={styles.container}>
      <Table
        caption="Détails des besoins en logements supplémentaires par EPCI"
        headers={[
          'EPCI',
          "Besoins liés à l'évolution démographique et du parc",
          'Besoins liés aux situations de mal logement',
          'Besoins en constructions neuves',
          'Remobilisation de logements vacants',
          "Année à partir de laquelle le territoire n'a plus de besoin en logements",
        ]}
        data={tableData}
        fixed
      />
    </div>
  )
}
