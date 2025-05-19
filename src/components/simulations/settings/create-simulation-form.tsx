'use client'

import Button from '@codegouvfr/react-dsfr/Button'
import Input from '@codegouvfr/react-dsfr/Input'
import { zodResolver } from '@hookform/resolvers/zod'
import { parseAsInteger, parseAsString, useQueryStates } from 'nuqs'
import { FC } from 'react'
import { useForm } from 'react-hook-form'
import { tss } from 'tss-react'
import { useEpcisRates } from '~/app/(authenticated)/simulation/(creation)/(rates-provider)/taux-cibles-logements/rates-provider'
import { ValidationSettingsInputEpci } from '~/components/simulations/validation-settings/validation-settings-input-epci'
import { ValidationSettingsRates } from '~/components/simulations/validation-settings/validation-settings-rates'
import { useCreateSimulation } from '~/hooks/use-create-simulation'
import { TInitSimulationDto, TInitSimulationForm, ZInitSimulationForm } from '~/schemas/simulation'
import { getOmphaleLabel } from '~/utils/omphale-label'

export const CreateSimulationForm: FC = () => {
  const { classes } = useStyles()
  const createSimulationForResults = useCreateSimulation()
  const createSimulationForBadHousing = useCreateSimulation({
    redirectUri: '/simulation/{{id}}/modifier/mal-logement/horizon-de-resorption',
  })
  const { rates } = useEpcisRates()

  const [queryStates] = useQueryStates({
    epci: parseAsString,
    omphale: parseAsString,
    projection: parseAsInteger,
    region: parseAsString,
  })

  const {
    register,
    formState: { isValid },
    getValues,
    handleSubmit,
  } = useForm<TInitSimulationForm>({
    resolver: zodResolver(ZInitSimulationForm),
  })

  const simulationValues = {
    epci: Object.entries(rates).map(([epci]) => ({ code: epci })),
    scenario: {
      b2_scenario: queryStates.omphale as string,
      epcis: Object.entries(rates).reduce(
        (acc, [epci, rates]) => {
          acc[epci] = {
            b2_tx_rs: rates.txRS ?? undefined,
            b2_tx_vacance: rates.txLV ?? undefined,
          }
          return acc
        },
        {} as Record<string, TInitSimulationDto['scenario']['epcis'][string]>,
      ),
      projection: (queryStates.projection as number) ?? 2030,
    },
  }

  const payload = { ...getValues(), ...simulationValues }
  const onSubmitForResults = async () => createSimulationForResults.mutateAsync(payload)
  const onSubmitForBadHousing = async () => createSimulationForBadHousing.mutateAsync(payload)

  return (
    <>
      <div className={classes.subContainer}>
        <h4>Général</h4>
        <Input label="" hintText="Nom de la simulation" nativeInputProps={{ ...register('name', { required: true }) }} />
      </div>
      <div className={classes.subContainer}>
        <h4>Territoire et horizon temporel</h4>
        <div className={classes.settingsContainer}>
          <ValidationSettingsInputEpci />
          <Input
            disabled
            label=""
            iconId="ri-calendar-line"
            hintText="Année de projection"
            style={{ flex: 1 }}
            nativeInputProps={{ value: queryStates.projection as number }}
          />
        </div>
      </div>
      <div className={classes.subContainer}>
        <h4>Projection d&apos;évolution démographique</h4>
        <Input
          disabled
          label=""
          hintText="Scénario Omphale"
          nativeInputProps={{ value: getOmphaleLabel(queryStates.omphale as string) as string }}
        />
      </div>
      <ValidationSettingsRates />
      <div className={classes.buttonContainer}>
        <Button
          priority="secondary"
          onClick={handleSubmit(onSubmitForBadHousing)}
          disabled={!isValid || createSimulationForBadHousing.isPending}
        >
          Paramétrer le mal-logement
        </Button>
        <Button onClick={handleSubmit(onSubmitForResults)} disabled={!isValid || createSimulationForResults.isPending}>
          Accéder au résultat
        </Button>
      </div>
    </>
  )
}

const useStyles = tss.create({
  subContainer: {
    backgroundColor: 'var(--background-default-grey)',
    padding: '1rem',
  },
  settingsContainer: {
    display: 'flex',
    gap: '1rem',
  },
  buttonContainer: {
    display: 'flex',
    gap: '1rem',
    justifyContent: 'flex-end',
  },
})
