import { SimulationVacantsDropdownSummary } from '~/components/simulations/results/secondary-vacants-accommodation/simulation-vacants-dropdown-summary'
import { SimulationResultPresentationHighlight } from '~/components/simulations/results/simulation-result-presentation-highlight'
import { formatNumber } from '~/utils/format-numbers'
import { sPluriel } from '~/utils/sPluriel'

type SimulationVacantsSummaryProps = {
  results: {
    badQuality: number
    total: number
    totalFlux: number
    totalStock: number
    secondaryAccommodation: number
    vacancy: number
  }
  epci?: {
    name: string
    peakYear: number
    prepeakTotalStock: number
    postpeakTotalStock: number
  }
  projection?: number
}

export const SimulationSecondaryVacantsAccommodationsSummary = ({ results, epci, projection }: SimulationVacantsSummaryProps) => {
  const { vacancy, secondaryAccommodation } = results
  const vacantAccomodations = Math.abs(vacancy)
  const scdAccomodations = Math.abs(secondaryAccommodation)

  return (
    <div className="fr-background-default--grey shadow">
      <div className="fr-py-8w fr-px-5w fr-flex fr-direction-column fr-justify-content-space-between fr-align-items-center">
        <div className="fr-flex fr-direction-column fr-justify-content-space-between fr-width-full">
          <span className="fr-text-default--grey">
            D'ici <strong>{epci ? epci.peakYear : projection}</strong>, {epci ? `l'EPCI du ${epci.name}` : 'le territoire'} pourra agir sur
            le parc de logements existants.
          </span>
          <div>
            <div className="fr-flex fr-direction-column">
              <span className="fr-text--bold fr-mt-2w fr-h3 fr-mb-0">
                {vacancy < 0 ? formatNumber(vacantAccomodations) : 0} logement{sPluriel(vacantAccomodations)} vacants{' '}
                {vacancy < 0 ? 'résorbables' : 'remobilisables'}
              </span>
            </div>
            <SimulationResultPresentationHighlight>
              Aliquip in voluptate occaecat commodo laboris laboris dolore ut in proident non nisi ut. Mollit dolore dolor aliqua esse.
              Minim enim aliquip eu ut qui exercitation est eu commodo ut proident ad. Eu labore eiusmod aliqua cillum exercitation.
            </SimulationResultPresentationHighlight>
            <div className="fr-flex fr-direction-column">
              <span className="fr-text--bold fr-mt-1v fr-h3">
                {formatNumber(scdAccomodations)} résidence{sPluriel(scdAccomodations)} secondaire
                {sPluriel(scdAccomodations)} {secondaryAccommodation < 0 ? 'résorbables' : 'remobilisables'}
              </span>
            </div>

            <SimulationResultPresentationHighlight>
              Aliquip in voluptate occaecat commodo laboris laboris dolore ut in proident non nisi ut. Mollit dolore dolor aliqua esse.
              Minim enim aliquip eu ut qui exercitation est eu commodo ut proident ad. Eu labore eiusmod aliqua cillum exercitation.
            </SimulationResultPresentationHighlight>
          </div>
        </div>
        <p className="fr-text--sm fr-mb-0">
          Au-delà de la construction neuve, le territoire peut répondre à une partie de ses besoins en mobilisant le parc existant : remise
          sur le marché de logements vacants ou de résidences secondaires.
        </p>
      </div>
      <SimulationVacantsDropdownSummary />
    </div>
  )
}
