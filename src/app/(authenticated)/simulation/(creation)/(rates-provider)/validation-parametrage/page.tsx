import Input from '@codegouvfr/react-dsfr/Input'
import { SearchParams } from 'nuqs'
import { searchParamsCache } from '~/app/(authenticated)/simulation/(creation)/searchParams'
import { CreateSimulationForm } from '~/components/simulations/settings/create-simulation-form'
import { ValidationSettingsInputEpci } from '~/components/simulations/validation-settings/validation-settings-input-epci'
import { ValidationSettingsRates } from '~/components/simulations/validation-settings/validation-settings-rates'
import { getOmphaleLabel } from '~/utils/omphale-label'
import styles from './validation-parametrage.module.css'

type PageProps = {
  searchParams: Promise<SearchParams>
}

export default async function ValidationParametragePage({ searchParams }: PageProps) {
  const { omphale, projection } = await searchParamsCache.parse(searchParams)

  return (
    <div className={styles.container}>
      <h3>Récapitulatif des paramètres</h3>
      <div className={styles.subContainer}>
        <h4>Territoire et horizon temporel</h4>
        <div className={styles.settingsContainer}>
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
      <div className={styles.subContainer}>
        <h4>Projection d&apos;évolution démographique</h4>
        <Input disabled label="" hintText="Scénario Omphale" nativeInputProps={{ value: getOmphaleLabel(omphale) as string }} />
      </div>
      <ValidationSettingsRates />
      <CreateSimulationForm />
    </div>
  )
}
