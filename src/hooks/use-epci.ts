import { useQuery } from '@tanstack/react-query'
import { useQueryState } from 'nuqs'
import { TDepartementGeoJSON } from '~/server-only/geojson/get-departments'
import { getDepartementDetails } from '~/server-only/get-departments-details'

export const useEpci = () => {
  const [selectedDepartment] = useQueryState('departement')

  const fetchEpcis = async () => {
    try {
      const departmentsDetails = await getDepartementDetails(selectedDepartment as string)
      const response = await fetch(`http://localhost:3000/api/geojson/zo_R${departmentsDetails[0].codeRegion}`)
      if (!response.ok) {
        throw new Error('Failed to fetch epci data')
      }
      const data: TDepartementGeoJSON = await response.json()
      return data
    } catch (error) {
      console.error('Error fetching epci:', error)
    }
  }

  const { data, isLoading } = useQuery({
    enabled: !!selectedDepartment,
    queryFn: fetchEpcis,
    queryKey: ['epci', selectedDepartment],
  })

  return { data, isLoading }
}
