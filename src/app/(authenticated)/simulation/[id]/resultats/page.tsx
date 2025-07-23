import { fr } from '@codegouvfr/react-dsfr'
import { RiIconClassName } from '@codegouvfr/react-dsfr/fr/generatedFromCss/classNames'
import { AccommodationContructionEvolutionChart } from '~/components/charts/accommodation-construction-evolution-chart'
import { FlowRequirementsChart } from '~/components/charts/flow-requirements-char'
import { StockEvolutionChart } from '~/components/charts/stock-evolution-chart'
import { ExportSimulationSettings } from '~/components/simulations/results/export/export-simulation-settings'
import { SimulationNeedsSummary } from '~/components/simulations/results/simulation-needs-summary/simulation-needs-summary'
import { SimulationResultsTabs } from '~/components/simulations/results/simulation-results-tabs'
import { TChartData, TEpciCalculationResult, TEpciTotalCalculationResult, TFlowRequirementChartData } from '~/schemas/results'
import { getSimulationWithResults } from '~/server-only/simulation/get-simulation-with-results'
import styles from './resultats.module.css'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export default async function Resultats({ params }: { params: { id: string } }) {
  const simulation = await getSimulationWithResults(params.id)
  const projection = simulation.scenario.projection

  const results = {
    badQuality: simulation.results.badQuality.total,
    total: simulation.results.total,
    totalFlux: simulation.results.totalFlux,
    totalStock: simulation.results.totalStock,
    vacancy: simulation.results.vacantAccomodation,
  }

  const epciTabs = simulation.epcis.map((epci) => {
    const badQuality = (simulation.results.badQuality.epcis.find((e) => e.epciCode === epci.code) as TEpciCalculationResult).value
    const totalStock = (simulation.results.epcisTotals.find((e) => e.epciCode === epci.code) as TEpciTotalCalculationResult).totalStock
    const totalFlux = (simulation.results.epcisTotals.find((e) => e.epciCode === epci.code) as TEpciTotalCalculationResult).totalFlux
    const epciResults = {
      badQuality,
      total: (simulation.results.epcisTotals.find((e) => e.epciCode === epci.code) as TEpciTotalCalculationResult).total,
      totalFlux,
      totalStock,
      vacancy: (simulation.results.flowRequirement.epcis.find((e) => e.code === epci.code) as TFlowRequirementChartData).totals
        .longTermVacantAccomodation,
    }

    const stockResults = {
      badQuality,
      financialInadequation: (
        simulation.results.financialInadequation.epcis.find((e) => e.epciCode === epci.code) as TEpciCalculationResult
      ).value,
      hosted: (simulation.results.hosted.epcis.find((e) => e.epciCode === epci.code) as TEpciCalculationResult).value,
      noAccomodation: (simulation.results.noAccomodation.epcis.find((e) => e.epciCode === epci.code) as TEpciCalculationResult).value,
      physicalInadequation: (simulation.results.physicalInadequation.epcis.find((e) => e.epciCode === epci.code) as TEpciCalculationResult)
        .value,
      totalStock,
    }

    const flowResults = {
      demographicEvolution: (simulation.results.flowRequirement.epcis.find((e) => e.code === epci.code) as TFlowRequirementChartData).totals
        .demographicEvolution,
      renewalNeeds: (simulation.results.flowRequirement.epcis.find((e) => e.code === epci.code) as TFlowRequirementChartData).totals
        .renewalNeeds,
      secondaryResidenceAccomodationEvolution: (
        simulation.results.flowRequirement.epcis.find((e) => e.code === epci.code) as TFlowRequirementChartData
      ).totals.secondaryResidenceAccomodationEvolution,
      totalFlux,
      vacantAccomodationEvolution: (simulation.results.flowRequirement.epcis.find((e) => e.code === epci.code) as TFlowRequirementChartData)
        .totals.vacantAccomodation,
      shortTermVacantAccomodation: (simulation.results.flowRequirement.epcis.find((e) => e.code === epci.code) as TFlowRequirementChartData)
        .totals.shortTermVacantAccomodation,
      longTermVacantAccomodation: (simulation.results.flowRequirement.epcis.find((e) => e.code === epci.code) as TFlowRequirementChartData)
        .totals.longTermVacantAccomodation,
    }

    const sitadelResults = simulation.results.sitadel.epcis.find((e) => e.code === epci.code) as TChartData
    const newConstructionsResults = simulation.results.flowRequirement.epcis.find((e) => e.code === epci.code) as TFlowRequirementChartData
    const hasSurplusHousing = Object.values(newConstructionsResults.data.surplusHousing).some((value) => value !== 0)
    return {
      content: (
        <>
          <SimulationNeedsSummary projection={simulation.scenario.projection} id={simulation.id} results={epciResults} />
          <AccommodationContructionEvolutionChart
            sitadelResults={sitadelResults}
            newConstructionsResults={newConstructionsResults}
            horizon={simulation.scenario.projection}
          />
          <div>
            <p className={fr.cx('fr-mb-0')}>
              <span className={fr.cx('fr-text--bold')}>Clé de lecture</span> : Ce graphique présente l’évolution des besoins annuels en
              construction neuve sur le territoire de {epci.name}, en les comparant avec les permis de construire autorisés sur les années
              récentes. Il distingue trois courbes différentes :
            </p>
            <ul>
              <li>
                <span className={fr.cx('fr-text--bold')}>Besoins en logements (barres vertes)</span> : volume estimé de logements à
                construire chaque année pour répondre aux dynamiques démographiques, aux situations de mal-logement (partiellement traduites
                en besoins neufs). Ces besoins sont projetés jusqu’en {projection}.
              </li>
              {hasSurplusHousing && (
                <li>
                  <span className={fr.cx('fr-text--bold')}>Logements excédentaires</span> : représentent les résidences principales devenant
                  vacants ou résidences secondaires, à partir des années où le besoin en construction est nul.
                </li>
              )}
              <li>
                <span className={fr.cx('fr-text--bold')}>Permis de construire autorisés (barres bleues)</span> : nombre d’autorisation de
                construction d’après Sit@del2.
              </li>
            </ul>
          </div>
          <div className={styles.flowContainer}>
            <h5 className={styles.flowTitle}>
              Besoins liés à la démographie et à l'évolution du parc - Evolution du besoin démographique en logements
            </h5>
            <div className={styles.flowChartContainer}>
              <FlowRequirementsChart results={flowResults} />
            </div>
          </div>
          <StockEvolutionChart results={stockResults} horizon={simulation.scenario.b1_horizon_resorption} />
        </>
      ),
      iconId: 'ri-road-map-line' as RiIconClassName,
      label: epci.name,
      tabId: epci.code,
    }
  })
  const bassinTab = {
    content: (
      <div>
        <SimulationNeedsSummary projection={simulation.scenario.projection} id={simulation.id} results={results} />
      </div>
    ),
    iconId: 'ri-home-line' as RiIconClassName,
    label: 'Synthèse des besoins',
    tabId: 'bassin',
  }
  const tabs = [bassinTab, ...epciTabs]

  return (
    <>
      <div className={styles.headerContainer}>
        <ExportSimulationSettings id={params.id} />
      </div>
      <SimulationResultsTabs tabs={tabs} />
    </>
  )
}
