'use client'
import { fr } from '@codegouvfr/react-dsfr'
import { useSearchParams } from 'next/navigation'
import { useEffect } from 'react'

export const EtapesParcoursBassins = () => {
  const searchParams = useSearchParams()

  useEffect(() => {
    const etape = searchParams.get('etape')
    if (etape) {
      const element = document.getElementById(`etape-${etape}`)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
      }
    }
  }, [searchParams])

  return (
    <div className={fr.cx('fr-mt-10v')}>
      <h3>Comment établir le besoin en logement à l&apos;échelle du Bassin d&apos;Habitat ?</h3>
      <p>Le parcours EPCI repose sur un travail en 3 étapes successives :</p>
      <h4 id="etape-1">Étape 1 - Sélection du territoire</h4>
      <p>TODO</p>

      <h4 id="etape-2">Étape 2 - Paramétrage du Bassin d&apos;Habitat</h4>
      <p>TODO</p>

      <h4 id="etape-3">Étape 2 - Paramétrage du Bassin d&apos;Habitat</h4>
      <p>TODO</p>
    </div>
  )
}
