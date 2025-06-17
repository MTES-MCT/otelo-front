import { getServerSession } from 'next-auth'
import { authOptions } from '~/lib/auth/auth.config'
import { TSimulationWithRelations } from '~/schemas/simulation'

export const getDashboardList = async () => {
  const session = await getServerSession(authOptions)
  if (!session?.accessToken) {
    throw new Error('Unauthorized')
  }

  const res = await fetch(`${process.env.NEXT_OTELO_API_URL}/simulations/dashboard-list`, {
    headers: {
      Authorization: `Bearer ${session.accessToken}`,
      'Content-Type': 'application/json',
    },
  })

  if (!res.ok) {
    const errorText = await res.text()
    throw new Error(`Failed to get dashboard list: ${res.status} - ${errorText}`)
  }

  return res.json() as Promise<Record<string, TSimulationWithRelations[]>>
}
