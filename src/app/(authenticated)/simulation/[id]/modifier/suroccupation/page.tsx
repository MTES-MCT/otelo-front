import { fr } from '@codegouvfr/react-dsfr'
import Alert from '@codegouvfr/react-dsfr/Alert'
import { SelectSuroccupationCategories } from '~/components/simulations/settings/modification/suroccupation /select-suroccupation-categories'
import { SelectSuroccupationLevel } from '~/components/simulations/settings/modification/suroccupation /select-suroccupation-level'
import { SelectSuroccupationPart } from '~/components/simulations/settings/modification/suroccupation /select-suroccupation-part'
import { SelectSuroccupationSource } from '~/components/simulations/settings/modification/suroccupation /select-suroccupation-source'
import { NextStepLinkWithoutValidation } from '~/components/simulations/settings/next-step-link'
import styles from './suroccupation.module.css'

export default async function SuroccupationPage({ params }: { params: { id: string } }) {
  const href = `/simulation/${params.id}/modifier/validation-parametrage`

  return (
    <div className={styles.container}>
      <h5>Niveaux de suroccupation</h5>
      <SelectSuroccupationSource />
      <SelectSuroccupationLevel />
      <h5>Catégories prises en compte</h5>
      <SelectSuroccupationCategories />
      <h5>Part de logements réalloués aux autres ménages dont la taille est plus adaptée aux logement</h5>
      <Alert
        severity="info"
        description={
          <>
            <p>
              Une situation d’inadéquation physique n’implique pas nécessairement un besoin en nouveaux logements, dans la mesure où une
              partie des logements concernés par l’inadéquation peut être réallouée à d’autres ménages plus petits. Plus la part de
              logements réalloués est élevée, plus le besoin en logement lié à l&apos;inadéquation physique est faible.
            </p>
            <p>Par défaut elle s&apos;élève à 80%.</p>
          </>
        }
        small
      />
      <SelectSuroccupationPart />
      <div className={fr.cx('fr-ml-auto', 'fr-my-1w')}>
        <NextStepLinkWithoutValidation href={href} />
      </div>
    </div>
  )
}
