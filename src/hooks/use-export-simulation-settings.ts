import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'

export const useExportSimulationSettings = () => {
  const exportSettings = async (id: string) => {
    try {
      const response = await fetch(`/api/simulations/${id}/export/scenario`, {
        method: 'GET',
      })

      if (!response.ok) {
        throw new Error('Failed to export simulation settings')
      }

      const contentDisposition = response.headers.get('content-disposition')
      const filename = contentDisposition
        ? contentDisposition.split('filename=')[1].replace(/"/g, '')
        : `scenario-${new Date().toISOString()}.csv`

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

  const { isPending, mutateAsync } = useMutation({
    mutationFn: exportSettings,
    onError: () => {
      toast.error("Une erreur est survenue lors de l'exportation des paramètres de la simulation")
    },
  })

  return { isPending, mutateAsync }
}
