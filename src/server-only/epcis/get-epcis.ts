import { getServerSession } from 'next-auth'
import { authOptions } from '~/lib/auth/auth.config'
import { TEpci } from '~/schemas/epci'

export const getEpcis = async (epcis: Array<string>) => {
  const session = await getServerSession(authOptions)

  if (!session?.accessToken) {
    throw new Error('Unauthorized')
  }

  const res = await fetch(`${process.env.NEXT_OTELO_API_URL}/epcis?epcis=${epcis.join(',')}`, {
    headers: {
      Authorization: `Bearer ${session.accessToken}`,
      'Content-Type': 'application/json',
    },
  })
  if (!res.ok) {
    throw new Error('Failed to get epcis list')
  }
  return res.json() as Promise<TEpci[]>
}
