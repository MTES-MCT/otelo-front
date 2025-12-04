import Button from '@codegouvfr/react-dsfr/Button'
import type { Metadata } from 'next'
import { SearchParams } from 'nuqs'
import { searchParamsCache } from '~/app/(authenticated)/simulation/(creation)/searchParams'
import { CreateEpcisAccommodationRates } from '~/components/simulations/settings/epcis-accommodation-rates/create-epcis-accomodation-rates'
import { NextStepLink } from '~/components/simulations/settings/next-step-link'
import { getEpcis } from '~/server-only/epcis/get-epcis'

export const metadata: Metadata = {
  title: 'Élaborer scénario - étape 4 sur 6 - Otelo',
}

type PageProps = {
  searchParams: Promise<SearchParams>
}

export default async function TargetRatesHousing({ searchParams }: PageProps) {
  const { epcis, baseEpci } = await searchParamsCache.parse(searchParams)
  const simulationsEpcis = await getEpcis(epcis, baseEpci)
  const href = `/simulation/taux-cibles-residences-secondaires`

  return (
    <>
      <div className="fr-flex fr-direction-column fr-background-default--grey">
        <CreateEpcisAccommodationRates epcis={simulationsEpcis} />
      </div>
      <div className="fr-flex fr-flex-gap-6v fr-justify-content-end fr-py-4w fr-px-2w">
        {/* todo: extract to a component and set preivous url href*/}
        <Button priority="secondary" size="large">
          Précédent
        </Button>
        <NextStepLink href={href} query="omphale" />
      </div>
    </>
  )
}
