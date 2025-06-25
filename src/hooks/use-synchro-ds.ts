import { useQuery } from '@tanstack/react-query'

export const useSynchroDs = () => {
  const getCronSynchro = async () => {
    try {
      const response = await fetch(`/api/cron/synchro`)

      if (!response.ok) {
        throw new Error('Failed to synchro ds')
      }
    } catch {
      return
    }
  }

  const { data, isLoading, refetch } = useQuery({
    queryFn: getCronSynchro,
    queryKey: ['synchro-ds', new Date().toISOString()],
    enabled: false,
  })
  return { data, isLoading, refetch }
}
