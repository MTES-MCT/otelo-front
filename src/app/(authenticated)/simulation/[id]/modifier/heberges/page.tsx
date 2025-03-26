import { fr } from '@codegouvfr/react-dsfr'
import { SelectHebergesAccommodationTypes } from '~/components/simulations/settings/modification/heberges/select-heberges-accommodation-types'
import { SelectHebergesPart } from '~/components/simulations/settings/modification/heberges/select-heberges-part'
import { NextStepLinkWithoutValidation } from '~/components/simulations/settings/next-step-link'
import styles from './heberges.module.css'
export default async function HebergesPage({ params }: { params: { id: string } }) {
  const href = `/simulation/${params.id}/modifier/inadequation-financiere`

  return (
    <div className={styles.container}>
      <h5>Cohabitation intergénérationnelle présumée subie</h5>
      <SelectHebergesPart />
      <h5>Cohabitation subie (hors cohabitation intergénérationnelle)</h5>
      <SelectHebergesAccommodationTypes />
      <div className={fr.cx('fr-ml-auto', 'fr-my-1w')}>
        <NextStepLinkWithoutValidation href={href} />
      </div>
    </div>
  )
}
