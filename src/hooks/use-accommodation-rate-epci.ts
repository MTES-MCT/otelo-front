import { useQuery } from '@tanstack/react-query'
import { useSearchParams } from 'next/navigation'
import { TEpcisAccommodationRates } from '~/schemas/accommodations-rates'

export const useAccommodationRatesByEpci = (epci?: string) => {
  const searchParams = useSearchParams()
  const epciParam = epci ?? searchParams.get('epci')

  const getAccommodationRatesByEpci = async (): Promise<TEpcisAccommodationRates> => {
    try {
      const response = await fetch(`/api/accommodation-rates/${epciParam}`)
      if (!response.ok) {
        throw new Error('Failed to get accommodation rates by epci')
      }

      const data = await response.json()
      return data as TEpcisAccommodationRates
    } catch (error) {
      console.error('Failed to get accommodation rates by epci:', error)
      return {}
    }
  }

  const { data, isLoading } = useQuery({
    enabled: !!epciParam,
    queryFn: () => getAccommodationRatesByEpci(),
    queryKey: ['accommodation-rates-by-epci', epciParam],
  })
  return { data, isLoading }
}
