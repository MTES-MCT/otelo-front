import { fr } from '@codegouvfr/react-dsfr'
import { AutocompleteInput } from '~/components/simulations/autocomplete/autocomplete-input'
import { CallOut } from '@codegouvfr/react-dsfr/CallOut'
import { NextStepLink } from '~/components/simulations/settings/next-step-link'

export default async function TerritorialChoicePage() {
  const href = `/simulation/cadrage-temporel`
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <div
        className={fr.cx('fr-p-2w', 'fr-p-md-5w', 'fr-mb-2w')}
        style={{
          background: fr.colors.decisions.background.default.grey.default,
        }}
      >
        <AutocompleteInput hintText="Saisissez un nom de commune, un code postal ou le nom de l'EPCI du territoire concerné." />
        <CallOut className="fr-mt-2w" iconId="ri-information-line" title="Quelques informations sur votre territoire">
          Votre territoire xxxxxxx
        </CallOut>
        {/* <SelectTerritorialIssues /> */}
      </div>
      <div className={fr.cx('fr-ml-auto', 'fr-my-1w')}>
        <NextStepLink href={href} query="q" />
      </div>
    </div>
  )
}
