'use client'

import { fr } from '@codegouvfr/react-dsfr'
import Checkbox from '@codegouvfr/react-dsfr/Checkbox'
import Input from '@codegouvfr/react-dsfr/Input'
import { useBadHousingSettings } from '~/app/(authenticated)/simulation/[id]/modifier/simulation-scenario-bad-housing-modification-provider'
import { UpdateSimulationForm } from '~/components/simulations/settings/modification/update-simulation-form'
import styles from './validation-parametrage.module.css'
export default function ValidationParametragePage() {
  const { badHousingSettings } = useBadHousingSettings()
  return (
    <div className={styles.container}>
      <h3>Récapitulatif des paramètres</h3>
      <div className={styles.subContainer}>
        <div className={styles.sectionContainer}>
          <h5>Horizon de résorption</h5>
          <div className={styles.horizonSubContainer}>
            <Input
              disabled
              label=""
              hintText="Horizon de résorption"
              nativeInputProps={{ value: `${badHousingSettings.horizon} ans` }}
              style={{ flex: 1 }}
            />
          </div>
        </div>
        <div className={styles.sectionContainer}>
          <h5>Paramétrage hors logement</h5>
          <div className={styles.subContainer}>
            <Input
              disabled
              label=""
              hintText="Source"
              nativeInputProps={{ value: badHousingSettings.horsLogement.source }}
              style={{ flex: 1 }}
            />
            <Input
              disabled
              label=""
              hintText="Part"
              nativeInputProps={{ value: `${badHousingSettings.horsLogement.part}%` }}
              style={{ flex: 1 }}
            />
          </div>
        </div>
      </div>
      <div className={styles.subContainer}>
        <div style={{ backgroundColor: fr.colors.decisions.background.default.grey.default, padding: '1rem' }}>
          <div className={styles.hebergesContainer}>
            <h5>Paramétrage hébergés</h5>
            <div className={styles.hebergesSubContainer}>
              <Input disabled label="" hintText="Source" nativeInputProps={{ value: badHousingSettings.horsLogement.source }} />
              <Input disabled label="" hintText="Part" nativeInputProps={{ value: `${badHousingSettings.horsLogement.part}%` }} />
              <Checkbox
                disabled
                legend="Type d'hébergement"
                options={[
                  {
                    label: 'Logés chez un particulier',
                    nativeInputProps: {
                      checked: badHousingSettings.heberges.particular,
                      name: 'particular',
                      readOnly: true,
                    },
                  },
                  {
                    label: 'Logés à titre gratuit',
                    nativeInputProps: {
                      checked: badHousingSettings.heberges.free,
                      name: 'free',
                      readOnly: true,
                    },
                  },
                  {
                    label: 'Logés temporairement',
                    nativeInputProps: {
                      checked: badHousingSettings.heberges.temporary,
                      name: 'temporary',
                      readOnly: true,
                    },
                  },
                ]}
              />
            </div>
          </div>
        </div>
        <div style={{ backgroundColor: fr.colors.decisions.background.default.grey.default, padding: '1rem' }}>
          <h5>Paramétrage inadéquation financière</h5>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <Input
                disabled
                label=""
                hintText="Source"
                nativeInputProps={{ value: badHousingSettings.inadequationFinanciere.maxEffort }}
              />
              <Input disabled label="" hintText="Part" nativeInputProps={{ value: `${badHousingSettings.inadequationFinanciere.part}%` }} />
            </div>
            <div>
              <Checkbox
                disabled
                options={[
                  { label: 'Accédant', nativeInputProps: { checked: badHousingSettings.inadequationFinanciere.accedant, readOnly: true } },
                  {
                    label: 'Locataire du parc privé',
                    nativeInputProps: { checked: badHousingSettings.inadequationFinanciere.plp, readOnly: true },
                  },
                ]}
                orientation="horizontal"
              />
            </div>
          </div>
        </div>
      </div>
      <div style={{ display: 'flex', gap: '1rem' }}>
        <div style={{ backgroundColor: fr.colors.decisions.background.default.grey.default, flex: 1, padding: '1rem' }}>
          <h5>Paramétrage mauvaise qualité</h5>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <Input
                disabled
                label=""
                hintText="Source"
                nativeInputProps={{ value: badHousingSettings.badQuality.source }}
                style={{ flex: 1 }}
              />
              <Input
                disabled
                label=""
                hintText="Part"
                nativeInputProps={{ value: `${badHousingSettings.badQuality.part}%` }}
                style={{ flex: 1 }}
              />
            </div>
          </div>
        </div>
        <div style={{ backgroundColor: fr.colors.decisions.background.default.grey.default, flex: 1, padding: '1rem' }}>
          <h5>Paramétrage suroccupation</h5>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <Input
                disabled
                label=""
                hintText="Source"
                nativeInputProps={{ value: badHousingSettings.suroccupation.source }}
                style={{ flex: 1 }}
              />
              <Input
                disabled
                label=""
                hintText="Part"
                nativeInputProps={{ value: `${badHousingSettings.suroccupation.part}%` }}
                style={{ flex: 1 }}
              />
            </div>
          </div>
        </div>
      </div>
      <UpdateSimulationForm />
    </div>
  )
}
