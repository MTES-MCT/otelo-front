import { fr } from '@codegouvfr/react-dsfr'
import Input from '@codegouvfr/react-dsfr/Input'
import { SearchParams } from 'nuqs'
import { searchParamsCache } from '~/app/(authenticated)/simulation/(creation)/searchParams'
import { CreateSimulationForm } from '~/components/simulations/settings/create-simulation-form'
import styles from './validation-parametrage.module.css'
import { getOmphaleLabel } from '~/utils/omphale-label'

type PageProps = {
  searchParams: Promise<SearchParams>
}

export default async function ValidationParametragePage({ searchParams }: PageProps) {
  const { omphale, projection, q } = await searchParamsCache.parse(searchParams)

  // const accommodationRates = await getAccommodationRatesByBassin(bassin)
  return (
    <div className={styles.container}>
      <h3>Récapitulatif des paramètres</h3>
      <div style={{ backgroundColor: fr.colors.decisions.background.default.grey.default, padding: '1rem' }}>
        <h4>Territoire et horizon temporel</h4>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <Input disabled label="" hintText="Commune" nativeInputProps={{ value: q }} style={{ flex: 1 }} />
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
      <div style={{ backgroundColor: fr.colors.decisions.background.default.grey.default, padding: '1rem' }}>
        {/* TODO - transform in client component and use react context to get scenario value per epcis */}
        {/* -- Remove the query state logic from there */}
        <h4>Taux cible de résidences secondaires et logements vacants</h4>
        {/* <div style={{ display: 'flex', gap: '1rem' }}>
          <Input
            disabled
            label=""
            iconId="ri-percent-line"
            hintText="Taux cible de logements vacants"
            nativeInputProps={{ value: tauxLv ? (Number(tauxLv) * 100).toFixed(2) : Number(accommodationRates.txLv * 100).toFixed(2) }}
            style={{ flex: 1 }}
          />
          <Input
            disabled
            label=""
            iconId="ri-percent-line"
            hintText="Réduction du nombre de logements vacants longue durée"
            nativeInputProps={{ value: tauxLVLDPercent ? (Number(tauxLVLDPercent) * 100).toFixed(1) : '100' }}
            style={{ flex: 1 }}
          />
        </div> 
        <Input
          disabled
          label=""
          iconId="ri-percent-line"
          hintText="Taux cible de résidences secondaires"
          nativeInputProps={{ value: tauxRS ? (Number(tauxRS) * 100).toFixed(2) : Number(accommodationRates.txRs * 100).toFixed(2) }}
          style={{ flex: 1 }}
        />*/}
      </div>
      <CreateSimulationForm />
    </div>
  )
}
