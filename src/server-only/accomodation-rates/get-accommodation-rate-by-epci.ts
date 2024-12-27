import { auth } from '~/lib/auth/auth'

export const getAccommodationRatesByEpci = async (epci: string) => {
  const session = await auth()

  if (!session?.accessToken) {
    throw new Error('Unauthorized')
  }

  const res = await fetch(`${process.env.NEXT_OTELO_API_URL}/accommodation-rates?epciCode=${epci}`, {
    headers: {
      Authorization: `Bearer ${session.accessToken}`,
      'Content-Type': 'application/json',
    },
  })
  if (!res.ok) {
    throw new Error('Failed to get accommodation rates by epci')
  }
  return res.json() as Promise<{ txLv: number; txRs: number }>
}
