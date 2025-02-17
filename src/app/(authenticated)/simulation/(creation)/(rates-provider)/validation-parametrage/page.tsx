import { fr } from '@codegouvfr/react-dsfr'
import Input from '@codegouvfr/react-dsfr/Input'
import { SearchParams } from 'nuqs'
import { searchParamsCache } from '~/app/(authenticated)/simulation/(creation)/searchParams'
import styles from './validation-parametrage.module.css'
import { getOmphaleLabel } from '~/utils/omphale-label'
import { CreateSimulationForm } from '~/components/simulations/settings/create-simulation-form'
import { ValidationSettingsInputEpci } from '~/components/simulations/validation-settings/validation-settings-input-epci'
import { ValidationSettingsRates } from '~/components/simulations/validation-settings/validation-settings-rates'

type PageProps = {
  searchParams: Promise<SearchParams>
}

export default async function ValidationParametragePage({ searchParams }: PageProps) {
  const { omphale, projection } = await searchParamsCache.parse(searchParams)

  return (
    <div className={styles.container}>
      <h3>Récapitulatif des paramètres</h3>
      <div style={{ backgroundColor: fr.colors.decisions.background.default.grey.default, padding: '1rem' }}>
        <h4>Territoire et horizon temporel</h4>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <ValidationSettingsInputEpci />
          <Input
            disabled
            label=""
            iconId="ri-calendar-line"
            hintText="Année de projection"
            style={{ flex: 1 }}
            nativeInputProps={{ value: projection }}
          />
        </div>
      </div>
      <div style={{ backgroundColor: fr.colors.decisions.background.default.grey.default, padding: '1rem' }}>
        <h4>Projection d&apos;évolution démographique</h4>
        <Input disabled label="" hintText="Scénario Omphale" nativeInputProps={{ value: getOmphaleLabel(omphale) as string }} />
      </div>
      <ValidationSettingsRates />
      <CreateSimulationForm />
    </div>
  )
}
