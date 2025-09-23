'use client'

import { fr } from '@codegouvfr/react-dsfr'
import Button from '@codegouvfr/react-dsfr/Button'
import Link from 'next/link'
import { parseAsArrayOf, parseAsString, useQueryStates } from 'nuqs'
import { useRef, useState } from 'react'
import { toast } from 'sonner'

interface UploadDemographicEvolutionProps {
  epciCode: string
  scenarioId?: string
}

export const UploadDemographicEvolutionCustom = ({ epciCode, scenarioId }: UploadDemographicEvolutionProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [isProcessing, setIsProcessing] = useState(false)

  const [queryStates, setQueryStates] = useQueryStates({
    demographicEvolutionOmphaleCustomIds: parseAsArrayOf(parseAsString).withDefault([]),
  })

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    // Validate file extension, support xls and xlsx in the future
    const validExtensions = ['.csv']
    const fileExtension = file.name.toLowerCase().substring(file.name.lastIndexOf('.'))

    if (!validExtensions.includes(fileExtension)) {
      toast.error('Format de fichier non supporté', {
        description: 'Veuillez utiliser un fichier Excel (.xlsx, .xls) ou CSV (.csv)',
      })
      return
    }

    setIsProcessing(true)

    try {
      // Create FormData to upload the file
      const formData = new FormData()
      formData.append('file', file)
      formData.append('epciCode', epciCode)
      if (scenarioId) formData.append('scenarioId', scenarioId)

      const response = await fetch('/api/demographic-evolution-custom/upload', {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message || 'Erreur lors du téléchargement du fichier')
      }

      const result = await response.json()

      // Add the new custom data ID to the query parameters
      setQueryStates({
        demographicEvolutionOmphaleCustomIds: [...queryStates.demographicEvolutionOmphaleCustomIds, result.id],
      })

      // Success notification
      toast.success('Données démographiques personnalisées créées avec succès')

      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }
    } catch (error) {
      console.error('Error processing file:', error)
      toast.error('Erreur lors de la création des données démographiques personnalisées', {
        description: error instanceof Error ? error.message : 'Une erreur est survenue',
      })
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <div className={fr.cx('fr-mb-3w')}>
      <input
        ref={fileInputRef}
        type="file"
        accept=".csv"
        onChange={handleFileUpload}
        style={{ display: 'none' }}
        disabled={isProcessing}
        aria-label="Importer des données démographiques personnalisées"
        id="demographic-upload-input"
      />
      <Button
        iconId="fr-icon-upload-line"
        onClick={() => fileInputRef.current?.click()}
        disabled={isProcessing}
        priority="secondary"
        size="small"
        aria-describedby="upload-format-hint"
        title="Importer des données démographiques personnalisées au format CSV, Excel"
      >
        {isProcessing ? 'Traitement en cours...' : 'Importer des données personnalisées'}
      </Button>
      <p id="upload-format-hint" className={fr.cx('fr-text--xs', 'fr-mt-1w', 'fr-mb-0')}>
        Formats acceptés : Excel (.xlsx, .xls) ou CSV.
      </p>
      <p className="fr-text--xs">
        <Link className="fr-link fr-text--xs" href="/assets/pdf/guide_projection_facon.pdf" target="_blank">
          Guide explicatif de la fonctionnalité
        </Link>
        <span className="fr-mx-1w">•</span>
        <Link className="fr-link fr-text--xs" href="/assets/csv/template_import_a_facon.csv" download>
          Template de données (CSV)
        </Link>
      </p>
    </div>
  )
}
