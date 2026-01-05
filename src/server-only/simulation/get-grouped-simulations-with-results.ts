import { getServerSession } from 'next-auth'
import { authOptions } from '~/lib/auth/auth.config'
import { TGroupedSimulationWithResults } from '~/schemas/simulation'

export const getGroupedSimulationWithResults = async (id: string) => {
  const session = await getServerSession(authOptions)

  if (!session?.accessToken) {
    throw new Error('Unauthorized')
  }

  const res = await fetch(`${process.env.NEXT_OTELO_API_URL}/simulations/${id}/results`, {
    headers: {
      Authorization: `Bearer ${session.accessToken}`,
      'Content-Type': 'application/json',
    },
    cache: 'no-store',
  })

  if (!res.ok) {
    throw new Error('Failed to get grouped simulation with results')
  }
  return res.json() as Promise<TGroupedSimulationWithResults>
}
