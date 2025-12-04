import { UpdateProjectionPeriod } from '~/components/simulations/settings/modification/update-projection-period'
import { NextStepLinkWithoutValidation } from '~/components/simulations/settings/next-step-link'

export default async function CadrageTemporelPage({ params }: { params: { id: string } }) {
  const href = `/simulation/${params.id}/modifier/parametrages-demographique`

  return (
    <div className="fr-flex fr-direction-column fr-background-default--grey fr-p-2w fr-px-md-5w">
      <UpdateProjectionPeriod />
      <div className="fr-ml-auto fr-my-1w">
        <NextStepLinkWithoutValidation href={href} />
      </div>
    </div>
  )
}
