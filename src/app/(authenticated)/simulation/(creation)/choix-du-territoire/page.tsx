import { fr } from '@codegouvfr/react-dsfr'
import { AutocompleteInput } from '~/components/simulations/autocomplete/autocomplete-input'
import { NextStepLink } from '~/components/simulations/settings/next-step-link'
import classes from './choix-du-territoire.module.css'

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
      </div>
      <div className={fr.cx('fr-ml-auto', 'fr-my-1w')}>
        <NextStepLink href={href} query="q" />
      </div>
    </div>
  )
}
