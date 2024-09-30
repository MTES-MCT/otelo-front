import { auth } from '~/lib/auth/auth'

export const getDemographicEvolutionByEpci = async (epci: string) => {
  const session = await auth()

  if (!session?.accessToken) {
    throw new Error('Unauthorized')
  }

  const res = await fetch(`${process.env.NEXT_OTELO_API_URL}/demographic-evolution?epciCode=${epci}`, {
    headers: {
      Authorization: `Bearer ${session.accessToken}`,
      'Content-Type': 'application/json',
    },
  })
  if (!res.ok) {
    throw new Error('Failed to get demographic evolution by epci')
  }
  return res.json()
}
