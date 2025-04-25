import { auth } from '~/lib/auth/auth'
import { TPopulationDemographicEvolution } from '~/schemas/demographic-evolution'

export const getPopulationDemographicEvolutionByEpci = async (epcis: string[]) => {
  const session = await auth()

  if (!session?.accessToken) {
    throw new Error('Unauthorized')
  }

  const res = await fetch(`${process.env.NEXT_OTELO_API_URL}/demographic-evolution/population?epciCodes=${epcis.join(',')}`, {
    headers: {
      Authorization: `Bearer ${session.accessToken}`,
      'Content-Type': 'application/json',
    },
  })
  if (!res.ok) {
    throw new Error('Failed to get population demographic evolution by epci')
  }
  return res.json() as Promise<TPopulationDemographicEvolution>
}
