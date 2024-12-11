import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { TInitSimulationDto } from '~/schemas/simulation'

export const useCreateSimulation = () => {
  const router = useRouter()
  const postSimulation = async (initSimulationDto: TInitSimulationDto) => {
    try {
      const response = await fetch('/api/simulations', {
        body: JSON.stringify(initSimulationDto),
        method: 'POST',
      })

      if (!response.ok) {
        throw new Error('Failed to create simulation')
      }
      const data = await response.json()
      return data
    } catch (error) {
      console.error('Failed to create simulation with error:', error)
    }
  }

  const { isPending, mutateAsync } = useMutation({
    mutationFn: (initSimulationDto: TInitSimulationDto) => postSimulation(initSimulationDto),
    onSuccess: (data) => {
      toast.success('Simulation créée avec succès.', {
        description: 'Redirection en cours vers votre résultat.',
      })
      router.push(`/simulation/${data.id}/resultats`)
    },
  })

  return { isPending, mutateAsync }
}
