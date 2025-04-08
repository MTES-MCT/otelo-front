import { fr } from '@codegouvfr/react-dsfr'
import { EpcisAccommodationRates } from '~/components/simulations/settings/epcis-accommodation-rates/epcis-accommodation-rates'
import { NextStepLinkWithoutValidation } from '~/components/simulations/settings/next-step-link'
import { getBassinEpcis } from '~/server-only/epcis/get-bassin-epcis'
import { getSimulationWithResults } from '~/server-only/simulation/get-simulation-with-results'
import styles from './taux-cibles-logements.module.css'

type PageProps = {
  params: {
    id: string
  }
}

export default async function TauxCiblesLogementsPage({ params }: PageProps) {
  const simulation = await getSimulationWithResults(params.id)
  const epci = simulation.scenario.epciScenarios.find((e) => e.default)
  if (!epci) {
    throw new Error('Default EPCI of the simulation not found')
  }

  const bassinEpcis = await getBassinEpcis(epci.epciCode)
  const href = `/simulation/${params.id}/modifier/validation-parametrage`

  return (
    <div className={styles.container}>
      <EpcisAccommodationRates bassinEpcis={bassinEpcis} />
      <div className={fr.cx('fr-ml-auto', 'fr-my-1w', 'fr-my-auto')}>
        <NextStepLinkWithoutValidation href={href} />
      </div>
    </div>
  )
}
