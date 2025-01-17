import { useQuery } from '@tanstack/react-query'
import { useQueryState } from 'nuqs'
import { TEpci } from '~/schemas/epci'

export const useEpci = () => {
  const [selectedEpci] = useQueryState('epci')
  const fetchEpcis = async () => {
    try {
      const response = await fetch(`/api/epci/${selectedEpci}`)
      if (!response.ok) {
        throw new Error('Failed to fetch epci data')
      }
      const data: TEpci = await response.json()
      return data
    } catch (error) {
      console.error('Error fetching epci:', error)
    }
  }

  const { data, isLoading } = useQuery({
    enabled: !!selectedEpci,
    queryFn: fetchEpcis,
    queryKey: ['epci', selectedEpci],
  })

  return { data, isLoading }
}
