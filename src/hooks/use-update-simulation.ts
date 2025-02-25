import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { TUpdateSimulationDto } from '~/schemas/simulation'

export const useUpdateSimulation = () => {
  const router = useRouter()
  const queryClient = useQueryClient()

  const putSimulation = async (updateSimulationDto: TUpdateSimulationDto) => {
    try {
      const response = await fetch(`/api/simulations/${updateSimulationDto.id}/scenario`, {
        body: JSON.stringify(updateSimulationDto.scenario),
        method: 'PUT',
      })
      if (!response.ok) {
        throw new Error('Failed to update simulation')
      }
      const data = await response.json()
      return data
    } catch (error) {
      console.error('Failed to update simulation with error:', error)
    }
  }

  const { isPending, mutateAsync } = useMutation({
    mutationFn: (updateSimulationDto: TUpdateSimulationDto) => putSimulation(updateSimulationDto),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['simulations'] })
      toast.success('Simulation créée avec succès.', {
        description: 'Redirection en cours vers votre résultat.',
      })

      router.push(`/simulation/${data.id}/resultats`)
    },
  })

  return { isPending, mutateAsync }
}
