import { useQuery } from '@tanstack/react-query'
import { TDemographicEvolutionOmphaleCustom } from '~/schemas/demographic-evolution-custom'

export const useMultipleDemographicEvolutionCustom = (ids: string[]) => {
  return useQuery<TDemographicEvolutionOmphaleCustom[]>({
    queryKey: ['demographic-evolution-custom-many', ids],
    queryFn: async () => {
      if (!ids || ids.length === 0) return []

      const response = await fetch('/api/demographic-evolution-custom/find-many', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ids }),
      })

      if (!response.ok) {
        throw new Error('Failed to fetch custom demographic evolution data')
      }

      return response.json()
    },
    enabled: ids.length > 0,
  })
}
