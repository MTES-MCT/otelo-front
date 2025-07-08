import { fr } from '@codegouvfr/react-dsfr'
import { EpcisAccommodationRates } from '~/components/simulations/settings/epcis-accommodation-rates/epcis-accommodation-rates'
import { NextStepLinkWithoutValidation } from '~/components/simulations/settings/next-step-link'
import { getEpcis } from '~/server-only/epcis/get-epcis'
import { getSimulationWithResults } from '~/server-only/simulation/get-simulation-with-results'
import styles from './taux-cibles-logements.module.css'

type PageProps = {
  params: {
    id: string
  }
}

export default async function TauxCiblesLogementsPage({ params }: PageProps) {
  const simulation = await getSimulationWithResults(params.id)
  const epcisCodes = simulation.scenario.epciScenarios.map((e) => e.epciCode)
  const baseEpci = simulation.scenario.epciScenarios.find((e) => e.baseEpci)
  const simulationsEpcis = await getEpcis(epcisCodes, baseEpci?.epciCode)

  const href = `/simulation/${params.id}/modifier/validation-parametrage`

  return (
    <div className={styles.container}>
      <EpcisAccommodationRates epcis={simulationsEpcis} />
      <div className={fr.cx('fr-ml-auto', 'fr-my-1w', 'fr-my-auto')}>
        <NextStepLinkWithoutValidation href={href} />
      </div>
    </div>
  )
}
