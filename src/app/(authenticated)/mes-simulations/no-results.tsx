import { fr } from '@codegouvfr/react-dsfr'
import Button from '@codegouvfr/react-dsfr/Button'

export function NoResults() {
  return (
    <div className={fr.cx('fr-container', 'fr-my-12w')} style={{ textAlign: 'center' }}>
      <h1>Aucune simulation créé</h1>
      <p>Vous n'avez pas encore enregistré de simulations.</p>
      <div>
        <Button priority="secondary" linkProps={{ href: '/accueil' }} style={{ marginRight: '1rem' }}>
          Accueil
        </Button>
        <Button iconId="fr-icon-arrow-right-line" linkProps={{ href: '/simulation/choix-du-territoire' }}>
          Démarrer une simulation
        </Button>
      </div>
    </div>
  )
}
