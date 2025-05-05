import { useQuery } from '@tanstack/react-query'
import { parseAsInteger, parseAsString, useQueryStates } from 'nuqs'

export const useDataVisualisation = () => {
  const [queryStates] = useQueryStates({
    epcis: parseAsInteger,
    type: parseAsString,
  })

  const fetchDataVisualisation = async () => {
    try {
      const response = await fetch(`/api/data-visualisation?epci=${queryStates.epcis}&type=${queryStates.type}`)
      if (!response.ok) {
        throw new Error('Failed to fetch data visualisation')
      }
      return response.json()
    } catch (error) {
      console.error('Error fetching data visualisation:', error)
      return []
    }
  }
  const { data, isLoading } = useQuery({
    enabled: !!queryStates.epcis && !!queryStates.type,
    queryFn: () => fetchDataVisualisation(),
    queryKey: ['data-visualisation', queryStates.epcis, queryStates.type],
  })
  return { data, isLoading }
}
