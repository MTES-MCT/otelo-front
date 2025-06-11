import { TableauDeBord } from '~/components/tableau-de-bord/tableau-de-bord'
import { auth } from '~/lib/auth/auth'
import { findSimulationsBy } from '~/server-only/simulation/find-simulations-by'

export default async function TableauDeBordTerritoirePage({ params }: { params: { id: string } }) {
  const { id } = params

  const session = await auth()
  const results = await findSimulationsBy({ epciCode: id })
  const name = results[0]?.epcis?.[0]?.name

  return <TableauDeBord simulations={results} name={name} userEmail={session?.user?.email as string} />
}
