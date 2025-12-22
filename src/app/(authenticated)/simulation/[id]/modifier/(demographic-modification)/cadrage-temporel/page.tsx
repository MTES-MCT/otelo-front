import Button from '@codegouvfr/react-dsfr/Button'
import { UpdateProjectionPeriod } from '~/components/simulations/settings/modification/update-projection-period'
import { NextStepLinkWithoutValidation } from '~/components/simulations/settings/next-step-link'

export default async function CadrageTemporelPage({ params }: { params: { id: string } }) {
  const href = `/simulation/${params.id}/modifier/parametrages-demographique`

  return (
    <>
      <div className="fr-flex fr-direction-column fr-background-default--grey fr-p-2w fr-pt-md-3w fr-pb-md-5w fr-px-md-5w fr-border-top">
        <UpdateProjectionPeriod />
      </div>
      <div className="fr-flex fr-flex-gap-6v fr-justify-content-end fr-py-4w fr-px-2w">
        {/* todo: extract to a component and set preivous url href*/}
        <Button priority="secondary" size="large">
          Précédent
        </Button>
        <NextStepLinkWithoutValidation href={href} />
      </div>
    </>
  )
}
