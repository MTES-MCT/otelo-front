import { RiIconClassName } from '@codegouvfr/react-dsfr/fr/generatedFromCss/classNames'
import { SimulationNeedsSummary } from '~/components/simulations/results/simulation-needs-summary/simulation-needs-summary'
import { FlowRequirementsChart } from '~/components/charts/flow-requirements-char'
import { StockEvolutionChart } from '~/components/charts/stock-evolution-chart'
import { getSimulationWithResults } from '~/server-only/simulation/get-simulation-with-results'
import { TChartData, TEpciCalculationResult, TEpciTotalCalculationResult } from '~/schemas/results'
import { AccommodationContructionEvolutionChart } from '~/components/charts/accommodation-construction-evolution-chart'
import Button from '@codegouvfr/react-dsfr/Button'
import { SimulationResultsTabs } from '~/components/simulations/results/simulation-results-tabs'

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
    const newConstructionsResults = simulation.results.newConstructions.epcis.find((e) => e.code === epci.code) as TChartData
    return {
      content: (
        <>
          <SimulationNeedsSummary projection={simulation.scenario.projection} results={epciResults} />
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <h5 style={{ paddingLeft: '2rem', paddingTop: '2rem' }}>Besoin en flux - Evolution du besoin démographique en logements</h5>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'space-between' }}>
              {/* <DemographicEvolutionChart data={simulation} /> */}
              <FlowRequirementsChart results={flowResults} />
            </div>
          </div>
          <StockEvolutionChart results={stockResults} />
          <AccommodationContructionEvolutionChart sitadelResults={sitadelResults} newConstructionsResults={newConstructionsResults} />
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
    label: "Résumé à l'échelle du bassin",
    tabId: 'bassin',
  }
  const tabs = [bassinTab, ...epciTabs]

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Button priority="secondary" linkProps={{ href: `/simulation/${params.id}/modifier/horizon-de-resorption` }}>
          Paramétrer le mal-logement
        </Button>
      </div>
      <SimulationResultsTabs tabs={tabs} />
    </>
  )
}
