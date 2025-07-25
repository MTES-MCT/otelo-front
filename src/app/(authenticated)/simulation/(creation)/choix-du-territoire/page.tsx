import { TEpci } from '~/schemas/epci'
import { getBassinEpcis } from '~/server-only/epcis/get-bassin-epcis'
import classes from './choix-du-territoire.module.css'
import { WrapperSimulationTypePage } from './wrapper-simulation-type-page'

type TerritorialChoicePageProps = {
  searchParams: Promise<{ baseEpci: string }>
}

export default async function TerritorialChoicePage({ searchParams }: TerritorialChoicePageProps) {
  const { baseEpci } = await searchParams

  let bassinEpcis: TEpci[] = []
  if (baseEpci) {
    bassinEpcis = await getBassinEpcis(baseEpci)
  }

  return (
    <div className={classes.container}>
      <WrapperSimulationTypePage bassinEpcis={bassinEpcis} />
    </div>
  )
}
