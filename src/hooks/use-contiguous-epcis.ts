import { useQuery } from '@tanstack/react-query'
import { TEpci } from '~/schemas/epci'

export const useContiguousEpcis = (epciCode?: string) => {
  const getContiguousEpcis = async (): Promise<TEpci[]> => {
    if (!epciCode) return []

    try {
      const response = await fetch(`/api/epci/${epciCode}/contiguous`)

      if (!response.ok) {
        throw new Error('Failed to get contiguous epcis')
      }
      const data = await response.json()
      return data
    } catch (error) {
      console.error('Failed to get contiguous epcis:', error)
      return []
    }
  }

  const { data, isLoading } = useQuery({
    enabled: !!epciCode,
    queryFn: () => getContiguousEpcis(),
    queryKey: ['contiguous-epcis', epciCode],
  })

  return { data: data || [], isLoading }
}
