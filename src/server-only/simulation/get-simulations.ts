import { auth } from '~/lib/auth/auth'
import { TSimulationWithRelations } from '~/schemas/simulation'

export const getSimulations = async () => {
  const session = await auth()

  if (!session?.accessToken) {
    throw new Error('Unauthorized')
  }

  const res = await fetch(`${process.env.NEXT_OTELO_API_URL}/simulations`, {
    headers: {
      Authorization: `Bearer ${session.accessToken}`,
      'Content-Type': 'application/json',
    },
  })
  if (!res.ok) {
    throw new Error('Failed to get simulations')
  }
  return res.json() as Promise<TSimulationWithRelations[]>
}
