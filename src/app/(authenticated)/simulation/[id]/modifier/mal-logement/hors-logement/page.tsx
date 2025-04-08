import { fr } from '@codegouvfr/react-dsfr'
import { SelectAccommodationTypes } from '~/components/simulations/settings/modification/mal-logement/hors-logement/select-accommodation-types'
import { SelectNoAccomodationPart } from '~/components/simulations/settings/modification/mal-logement/hors-logement/select-no-accommodation-part'
import { SelectNoAccommodationSource } from '~/components/simulations/settings/modification/mal-logement/hors-logement/select-no-accommodation-source'
import { NextStepLinkWithoutValidation } from '~/components/simulations/settings/next-step-link'
import styles from './hors-logement.module.css'

export default async function HorsLogementPage({ params }: { params: { id: string } }) {
  const href = `/simulation/${params.id}/modifier/mal-logement/heberges`

  return (
    <div className={styles.container}>
      <h5>Sans abris - Habitations de fortune - Logés à l&apos;hôtel</h5>
      <SelectNoAccommodationSource />
      <h5>Hébergement social</h5>
      <SelectAccommodationTypes />
      <SelectNoAccomodationPart />
      <div className={fr.cx('fr-ml-auto', 'fr-my-1w')}>
        <NextStepLinkWithoutValidation href={href} />
      </div>
    </div>
  )
}
