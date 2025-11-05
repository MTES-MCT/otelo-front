import { useMutation } from '@tanstack/react-query'
import { TRequestPowerpoint } from '~/schemas/export'

export const useRequestPowerpoint = () => {
  const postSimulation = async (params: TRequestPowerpoint) => {
    try {
      const response = await fetch(`/api/simulations/request-powerpoint`, {
        body: JSON.stringify(params),
        method: 'POST',
      })

      if (!response.ok) {
        throw new Error('Failed to request powerpoint')
      }
      const contentDisposition = response.headers.get('content-disposition')
      const filename = contentDisposition
        ? contentDisposition.split('filename=')[1].replace(/"/g, '')
        : `scenario-${new Date().toISOString()}.xlsx`

      const blob = await response.blob()

      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = filename
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
      document.body.removeChild(a)
    } catch (error) {
      console.error('Failed to export simulation settings:', error)
      throw error
    }
  }

  const { mutateAsync, isPending, isSuccess, isError } = useMutation({
    mutationFn: (initSimulationDto: TRequestPowerpoint) => postSimulation(initSimulationDto),
  })

  return { mutateAsync, isPending, isSuccess, isError }
}
