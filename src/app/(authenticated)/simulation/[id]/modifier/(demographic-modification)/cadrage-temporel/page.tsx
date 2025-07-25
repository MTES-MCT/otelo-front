import { fr } from '@codegouvfr/react-dsfr'
import { UpdateProjectionPeriod } from '~/components/simulations/settings/modification/update-projection-period'
import { NextStepLinkWithoutValidation } from '~/components/simulations/settings/next-step-link'
import classes from './cadrage-temporel.module.css'

export default async function CadrageTemporelPage({ params }: { params: { id: string } }) {
  const href = `/simulation/${params.id}/modifier/parametrages-demographique`

  return (
    <div className={classes.container}>
      <UpdateProjectionPeriod />
      <div className={fr.cx('fr-ml-auto', 'fr-my-1w')}>
        <NextStepLinkWithoutValidation href={href} />
      </div>
    </div>
  )
}
