import { fr } from '@codegouvfr/react-dsfr'
import Alert from '@codegouvfr/react-dsfr/Alert'
import { SelectResorptionHorizonPeriod } from '~/components/simulations/settings/modification/horizon/select-horizon-resorption-period'
import { NextStepLinkWithoutValidation } from '~/components/simulations/settings/next-step-link'
import classes from './horizon-de-resorption.module.css'

export default async function ResorptionHorizonPage({ params }: { params: { id: string } }) {
  const href = `/simulation/${params.id}/modifier/hors-logement`

  return (
    <div className={classes.container}>
      <Alert
        severity="info"
        description={
          <>
            <p>
              Otelo vous permet d&apos;estimer un volume de mal logement. Sa prise en compte dans le besoin en logement se fait à travers un
              &apos;horizon de résorption&apos;, qui correspond au nombre d&apos;années que l&apos;on estime nécessaire pour répondre au mal
              logement à un rythme annuel constant.
            </p>
            <p>
              Par défaut, il est de 20 ans. Dans ce cas, pour un volume de mal logement estimé à 1000, le besoin annuel en stock sera de
              1000/20 soit 50 logements/an.
            </p>
          </>
        }
        small
      />

      <SelectResorptionHorizonPeriod />

      <div className={fr.cx('fr-ml-auto', 'fr-my-1w')}>
        <NextStepLinkWithoutValidation href={href} />
      </div>
    </div>
  )
}
