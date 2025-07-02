import { getServerSession } from 'next-auth'
import { NextResponse } from 'next/server'
import { authOptions } from '~/lib/auth/auth.config'
import { TEpci } from '~/schemas/epci'
import { getBassinEpcis } from '~/server-only/epcis/get-bassin-epcis'
import classes from './choix-du-territoire.module.css'
import { WrapperSimulationTypePage } from './wrapper-simulation-type-page'

type TerritorialChoicePageProps = {
  searchParams: Promise<{ baseEpci: string }>
}

export default async function TerritorialChoicePage({ searchParams }: TerritorialChoicePageProps) {
  const session = await getServerSession(authOptions)

  if (!session?.accessToken) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

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
