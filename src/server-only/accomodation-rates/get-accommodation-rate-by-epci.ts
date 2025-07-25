import { getServerSession } from 'next-auth'
import { authOptions } from '~/lib/auth/auth.config'
import { TEpcisAccommodationRates } from '~/schemas/accommodations-rates'

export const getAccommodationRatesByEpci = async (epci: string) => {
  const session = await getServerSession(authOptions)

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

  return res.json() as Promise<TEpcisAccommodationRates>
}
