'use client'

import Button from '@codegouvfr/react-dsfr/Button'
import { FC } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { TUpdateSimulationDto, ZInitSimulationDto, ZUpdateSimulationDto } from '~/schemas/simulation'
import { tss } from 'tss-react'
import { useBadHousingSettings } from '~/app/(authenticated)/simulation/[id]/modifier/simulation-scenario-bad-housing-modification-provider'
import { ESourceB11, ESourceB14, ESourceB15 } from '~/schemas/scenario'
import { useUpdateSimulation } from '~/hooks/use-update-simulation'

export const UpdateSimulationForm: FC = () => {
  const { badHousingSettings } = useBadHousingSettings()
  const { classes } = useStyles()
  const { mutateAsync, isPending } = useUpdateSimulation()

  const {
    formState: { isValid },
    getValues,
    handleSubmit,
  } = useForm<TUpdateSimulationDto>({
    resolver: zodResolver(ZUpdateSimulationDto),
    values: {
      id: badHousingSettings.simulationId,
      scenario: {
        b11_etablissement: badHousingSettings.horsLogement.accommodationTypes,
        b11_fortune: badHousingSettings.horsLogement.fortune,
        b11_hotel: badHousingSettings.horsLogement.hotel,
        b11_part_etablissement: badHousingSettings.horsLogement.part,
        b11_sa: badHousingSettings.horsLogement.sa,
        source_b11: badHousingSettings.horsLogement.source as ESourceB11,

        b12_cohab_interg_subie: badHousingSettings.heberges.part,
        b12_heberg_gratuit: badHousingSettings.heberges.free,
        b12_heberg_particulier: badHousingSettings.heberges.particular,
        b12_heberg_temporaire: badHousingSettings.heberges.temporary,
        b13_acc: badHousingSettings.inadequationFinanciere.accedant,
        b13_plp: badHousingSettings.inadequationFinanciere.plp,
        b13_taux_effort: badHousingSettings.inadequationFinanciere.maxEffort,
        b13_taux_reallocation: badHousingSettings.inadequationFinanciere.part,

        b14_confort: badHousingSettings.badQuality.confort,
        b14_occupation: badHousingSettings.badQuality.occupation,
        // todo
        b14_qualite: '',
        b14_taux_reallocation: badHousingSettings.badQuality.part,
        source_b14: badHousingSettings.badQuality.source as ESourceB14,

        b15_loc_hors_hlm: badHousingSettings.suroccupation.plp,
        b15_taux_reallocation: badHousingSettings.suroccupation.part,
        b15_proprietaire: badHousingSettings.suroccupation.proprietaire,
        b15_surocc: badHousingSettings.suroccupation.surocc,
        source_b15: badHousingSettings.suroccupation.source as ESourceB15,

        b1_horizon_resorption: badHousingSettings.horizon,
        id: badHousingSettings.id,
      },
    },
  })

  const onSubmit = async () => await mutateAsync(getValues())

  return (
    <div className={classes.container}>
      <Button onClick={handleSubmit(onSubmit)} disabled={!isValid || isPending}>
        Accéder au résultat
      </Button>
    </div>
  )
}

const useStyles = tss.create({
  container: {
    display: 'flex',
    gap: '1rem',
    justifyContent: 'flex-end',
  },
})
