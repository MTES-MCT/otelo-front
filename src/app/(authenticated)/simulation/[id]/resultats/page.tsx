import Button from '@codegouvfr/react-dsfr/Button'
import { RiIconClassName } from '@codegouvfr/react-dsfr/fr/generatedFromCss/classNames'
import { AccommodationContructionEvolutionChart } from '~/components/charts/accommodation-construction-evolution-chart'
import { FlowRequirementsChart } from '~/components/charts/flow-requirements-char'
import { StockEvolutionChart } from '~/components/charts/stock-evolution-chart'
import { ExportSimulationSettings } from '~/components/simulations/results/export/export-simulation-settings'
import { SimulationNeedsSummary } from '~/components/simulations/results/simulation-needs-summary/simulation-needs-summary'
import { SimulationResultsTabs } from '~/components/simulations/results/simulation-results-tabs'
import { TChartData, TEpciCalculationResult, TEpciTotalCalculationResult, TNewConstructionsChartData } from '~/schemas/results'
import { getSimulationWithResults } from '~/server-only/simulation/get-simulation-with-results'
import styles from './resultats.module.css'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export default async function Resultats({ params }: { params: { id: string } }) {
  const simulation = await getSimulationWithResults(params.id)
  const results = {
    badQuality: simulation.results.badQuality.total,
    total: simulation.results.total,
    totalFlux: simulation.results.totalFlux,
    totalStock: simulation.results.totalStock,
    vacancy: simulation.results.vacantAccomodationEvolution.total,
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
      vacancy: (simulation.results.vacantAccomodationEvolution.epcis.find((e) => e.epciCode === epci.code) as TEpciCalculationResult).value,
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
      socialParc: (simulation.results.socialParc.epcis.find((e) => e.epciCode === epci.code) as TEpciCalculationResult).value,
      totalStock,
    }

    const flowResults = {
      demographicEvolution: (simulation.results.demographicEvolution.epcis.find((e) => e.epciCode === epci.code) as TEpciCalculationResult)
        .value,
      renewalNeeds: (simulation.results.renewalNeeds.epcis.find((e) => e.epciCode === epci.code) as TEpciCalculationResult).value,
      secondaryResidenceAccomodationEvolution: (
        simulation.results.secondaryResidenceAccomodationEvolution.epcis.find((e) => e.epciCode === epci.code) as TEpciCalculationResult
      ).value,
      totalFlux,
      vacantAccomodationEvolution: (
        simulation.results.vacantAccomodationEvolution.epcis.find((e) => e.epciCode === epci.code) as TEpciCalculationResult
      ).value,
    }

    const sitadelResults = simulation.results.sitadel.epcis.find((e) => e.code === epci.code) as TChartData
    const newConstructionsResults = simulation.results.newConstructions.epcis.find(
      (e) => e.code === epci.code,
    ) as TNewConstructionsChartData
    return {
      content: (
        <>
          <SimulationNeedsSummary projection={simulation.scenario.projection} results={epciResults} />
          <div className={styles.flowContainer}>
            <h5 className={styles.flowTitle}>Besoin en flux - Evolution du besoin démographique en logements</h5>
            <div className={styles.flowChartContainer}>
              {/* <DemographicEvolutionChart data={simulation} /> */}
              <FlowRequirementsChart results={flowResults} />
            </div>
          </div>
          <StockEvolutionChart results={stockResults} />
          <AccommodationContructionEvolutionChart
            sitadelResults={sitadelResults}
            newConstructionsResults={newConstructionsResults}
            horizon={simulation.scenario.projection}
          />
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
        <SimulationNeedsSummary projection={simulation.scenario.projection} results={results} />
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
        <div className={styles.buttonsContainer}>
          <Button linkProps={{ href: `/simulation/${params.id}/modifier/cadrage-temporel` }}>Modifier mes paramètres</Button>
          <Button priority="secondary" linkProps={{ href: `/simulation/${params.id}/modifier/mal-logement/horizon-de-resorption` }}>
            Paramétrer le mal-logement
          </Button>
        </div>
        <div className={styles.border} />
        <ExportSimulationSettings id={params.id} />
      </div>
      <SimulationResultsTabs tabs={tabs} />
    </>
  )
}
