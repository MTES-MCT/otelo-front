import { useQuery } from '@tanstack/react-query'
import { useSession } from 'next-auth/react'
import { TSimulationWithRelations } from '~/schemas/simulation'

export const useSimulations = () => {
  const { data: session } = useSession()

  const fetchSimulations = async () => {
    try {
      const response = await fetch('/api/simulations')
      if (!response.ok) {
        throw new Error('Failed to fetch user simulations')
      }
      return response.json()
    } catch (error) {
      console.error('Error fetching user simulations:', error)
      return []
    }
  }

  const { data, isLoading } = useQuery<TSimulationWithRelations[]>({
    enabled: !!session,
    queryFn: fetchSimulations,
    queryKey: ['simulations', session?.user?.email],
  })

  return { data, isLoading }
}
