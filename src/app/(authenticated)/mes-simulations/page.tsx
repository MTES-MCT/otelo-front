import { fr } from '@codegouvfr/react-dsfr'
import Link from 'next/link'
import { getSimulations } from '~/server-only/simulation/get-simulations'

export default async function MesSimulations() {
  const results = await getSimulations()

  return (
    <div className={fr.cx('fr-container')}>
      <h1>Mes Simulations</h1>
      <div>
        {results.map((result) => (
          <div key={result.id}>
            <Link href={`/simulation/${result.id}/resultats`}>{result.name}</Link>
          </div>
        ))}
      </div>
    </div>
  )
}
