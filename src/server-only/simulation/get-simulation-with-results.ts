import { auth } from '~/lib/auth/auth'

export const getSimulationWithResults = async (id: string) => {
  const session = await auth()
  if (!session?.accessToken) {
    throw new Error('Unauthorized')
  }
  const res = await fetch(`${process.env.NEXT_OTELO_API_URL}/simulations/${id}/results`, {
    headers: {
      Authorization: `Bearer ${session.accessToken}`,
      'Content-Type': 'application/json',
    },
  })
  if (!res.ok) {
    throw new Error('Failed to get simulation with results')
  }
  return res.json()
}
