import { auth } from '~/lib/auth/auth'
import { TSimulationWithRelations } from '~/schemas/simulation'

export const findSimulationsBy = async ({
  epciCode,
  isBassin = false,
}: {
  epciCode?: string
  isBassin?: boolean
}) => {
  const session = await auth()

  if (!session?.accessToken) {
    throw new Error('Unauthorized')
  }

  // Build query parameters
  const searchParams = new URLSearchParams()
  if (epciCode) {
    searchParams.append('epciCode', epciCode)
  }
  if (isBassin) {
    searchParams.append('isBassin', String(isBassin))
  }

  const url = `${process.env.NEXT_OTELO_API_URL}/simulations/find-by`
  const urlWithParams = searchParams.toString() ? `${url}?${searchParams.toString()}` : url

  console.log('MAX urlWithParams', urlWithParams)

  const res = await fetch(urlWithParams, {
    headers: {
      Authorization: `Bearer ${session.accessToken}`,
      'Content-Type': 'application/json',
    },
  })
  if (!res.ok) {
    throw new Error('Failed to get simulation with results')
  }
  return res.json() as Promise<TSimulationWithRelations[]>
}
