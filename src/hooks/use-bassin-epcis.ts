import { useQuery } from '@tanstack/react-query'
import { useSearchParams } from 'next/navigation'
import { TEpci } from '~/schemas/epci'

export const useBassinEpcis = () => {
  const searchParams = useSearchParams()
  const epci = searchParams.get('epci')

  const getBassinEpcis = async (): Promise<TEpci[]> => {
    try {
      const response = await fetch(`/api/bassin/epcis/${epci}`)

      if (!response.ok) {
        throw new Error('Failed to get bassin epcis list')
      }

      const data = await response.json()
      return data
    } catch (error) {
      console.error('Failed to get bassin epcis list:', error)
      return []
    }
  }

  const { data, isLoading } = useQuery({
    enabled: !!epci,
    queryFn: () => getBassinEpcis(),
    queryKey: ['bassin-epcis', epci],
  })
  return { data, isLoading }
}
