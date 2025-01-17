import { fr } from '@codegouvfr/react-dsfr'
import { AutocompleteInput } from '~/components/simulations/autocomplete/autocomplete-input'
import { NextStepLink } from '~/components/simulations/settings/next-step-link'
import classes from './choix-du-territoire.module.css'
import Alert from '@codegouvfr/react-dsfr/Alert'

export default async function TerritorialChoicePage() {
  const href = `/simulation/cadrage-temporel`
  return (
    <div className={classes.container}>
      <div
        className={fr.cx('fr-p-2w', 'fr-p-md-5w', 'fr-mb-2w')}
        style={{
          background: fr.colors.decisions.background.default.grey.default,
        }}
      >
        <AutocompleteInput hintText="Saisissez le nom de l'EPCI du territoire concerné, ou par défaut, vous pouvez saisir le nom de la commune ou son code postal." />
        <div className={fr.cx('fr-mt-2w')}>
          <Alert description="Les résultats de votre simulation seront donnés à l'échelle de l'EPCI sélectionné." severity="info" small />
        </div>
      </div>
      <div className={fr.cx('fr-ml-auto', 'fr-my-1w')}>
        <NextStepLink href={href} query="epci" />
      </div>
    </div>
  )
}
