import { getServerSession } from 'next-auth'
import { TableauDeBord } from '~/components/tableau-de-bord/tableau-de-bord'
import { authOptions } from '~/lib/auth/auth.config'
import { findSimulationsBy } from '~/server-only/simulation/find-simulations-by'

export default async function TableauDeBordBassinPage({ params }: { params: { id: string } }) {
  const { id } = params

  const session = await getServerSession(authOptions)
  const results = await findSimulationsBy({ epciCode: id, isBassin: true })
  const name = results[0]?.epcis?.[0]?.bassinName || ''

  return <TableauDeBord simulations={results} name={name} userEmail={session?.user?.email as string} />
}
