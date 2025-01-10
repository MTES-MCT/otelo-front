import { fr } from '@codegouvfr/react-dsfr'
import Input from '@codegouvfr/react-dsfr/Input'
import { SearchParams } from 'nuqs'
import { searchParamsCache } from '~/app/(authenticated)/simulation/(creation)/searchParams'
import { CreateSimulationForm } from '~/components/simulations/settings/create-simulation-form'
import styles from './validation-parametrage.module.css'
import { getAccommodationRatesByEpci } from '~/server-only/accomodation-rates/get-accommodation-rate-by-epci'

type PageProps = {
  searchParams: Promise<SearchParams>
}

export default async function ValidationParametragePage({ searchParams }: PageProps) {
  const { epci, omphale, projection, q, tauxLv, tauxLVLDPercent, tauxRS } = await searchParamsCache.parse(searchParams)

  const accommodationRates = await getAccommodationRatesByEpci(epci)
  return (
    <div className={styles.container}>
      <h3>Récapitulatif des paramètres</h3>
      <div style={{ backgroundColor: fr.colors.decisions.background.default.grey.default, padding: '1rem' }}>
        <h4>Territoire</h4>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <Input disabled label="" hintText="Commune" nativeInputProps={{ value: q }} style={{ flex: 1 }} />
          <Input disabled label="" hintText="EPCI" nativeInputProps={{ value: epci }} style={{ flex: 1 }} />
        </div>
      </div>
      <div style={{ backgroundColor: fr.colors.decisions.background.default.grey.default, padding: '1rem' }}>
        <h4>Projection d&apos;évolution démographique</h4>
        <Input disabled label="" hintText="Scénario Omphale" nativeInputProps={{ value: omphale }} />
      </div>
      <div style={{ backgroundColor: fr.colors.decisions.background.default.grey.default, padding: '1rem' }}>
        <h4>Horizon temporel de la simulation</h4>
        <Input disabled label="" iconId="ri-calendar-line" hintText="Année de projection" nativeInputProps={{ value: projection }} />
      </div>
      <div style={{ backgroundColor: fr.colors.decisions.background.default.grey.default, padding: '1rem' }}>
        <h4>Taux cible de résidences secondaires et logements vacants</h4>
        <div style={{ display: 'flex', gap: '1rem' }}>
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
            hintText="Taux cible de logements vacants longue durée"
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
        />
      </div>
      <CreateSimulationForm />
    </div>
  )
}
