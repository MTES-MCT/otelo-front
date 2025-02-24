import Table from '@codegouvfr/react-dsfr/Table'
import { formatNumber } from '~/utils/format-numbers'

type DemographicEvolutionResultsTableProps = {
  results: {
    demographicEvolution: number
    renewalNeeds: number
    secondaryResidenceAccomodationEvolution: number
    totalFlux: number
    vacantAccomodationEvolution: number
  }
}
export const DemographicEvolutionResultsTable = ({ results }: DemographicEvolutionResultsTableProps) => {
  return (
    <Table
      noCaption
      caption="Résumé des besoins en stock"
      data={[
        ['Démographie', formatNumber(results.demographicEvolution)],
        ['Renouvellement', formatNumber(results.renewalNeeds)],
        ['Résidences secondaires', formatNumber(results.secondaryResidenceAccomodationEvolution)],
        ['Logements vacants', formatNumber(results.vacantAccomodationEvolution)],
        ['Total', formatNumber(results.totalFlux)],
      ]}
      fixed
      headers={['Catégorie', 'Besoin calculé']}
    />
  )
}
