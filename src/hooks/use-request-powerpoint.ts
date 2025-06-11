import { useMutation } from '@tanstack/react-query'
import { TRequestPowerpoint } from '~/schemas/simulation'

export const useRequestPowerpoint = () => {
  const postSimulation = async (params: TRequestPowerpoint) => {
    const response = await fetch('/api/simulations/request-powerpoint', {
      body: JSON.stringify(params),
      method: 'POST',
    })

    if (!response.ok) {
      throw new Error('Failed to request powerpoint')
    }
    return response.json()
  }

  const { mutateAsync, isPending, isSuccess, isError } = useMutation({
    mutationFn: (initSimulationDto: TRequestPowerpoint) => postSimulation(initSimulationDto),
  })

  return { mutateAsync, isPending, isSuccess, isError }
}
