'use client'

import { RiIconClassName, fr } from '@codegouvfr/react-dsfr'
import { Tag } from '@codegouvfr/react-dsfr/Tag'
import { useSearchParams } from 'next/navigation'
import { FC } from 'react'
import { tss } from 'tss-react'
import { useSimulationSettings } from '~/app/(authenticated)/simulation/[id]/modifier/(demographic-modification)/simulation-scenario-modification-provider'

interface UpdateGuideTagProps {
  step: {
    data?: string | Array<string>
    disabled?: boolean
    iconId?: string
    path: string
    queryKeys: Array<string>
    titleText: string
  }
}

export const UpdateDemographicSettingsGuideTag: FC<UpdateGuideTagProps> = ({ step }) => {
  const { data, disabled = false, path, queryKeys, iconId = 'fr-icon-checkbox-circle-line' } = step
  const { simulationSettings } = useSimulationSettings()
  const { classes } = useStyles({ disabled, queryKeys })
  const searchParams = useSearchParams()
  const newSearchParams = new URLSearchParams(searchParams.toString())
  const href = `${path}${newSearchParams.toString() ? `?${newSearchParams.toString()}` : ''}`

  // Handle Omphale case with two separate tags
  if (queryKeys.includes('omphale') && simulationSettings.b2_scenario) {
    const scenario = simulationSettings.b2_scenario.split('_')[0]
    const decohabitation = simulationSettings.b2_scenario.split('_')[1]

    let formattedScenario = ''
    let formattedDecohabitation = ''

    if (scenario === 'Central') {
      formattedScenario = 'centrale'
    }
    if (scenario === 'PB') {
      formattedScenario = 'basse'
    }
    if (scenario === 'PH') {
      formattedScenario = 'haute'
    }
    if (decohabitation === 'H') {
      formattedDecohabitation = 'haute'
    }
    if (decohabitation === 'B') {
      formattedDecohabitation = 'basse'
    }
    if (decohabitation === 'C') {
      formattedDecohabitation = 'tendanciel'
    }

    return (
      <>
        <Tag className={classes.tag} iconId="ri-group-line" linkProps={{ href }}>
          Population: {formattedScenario}
        </Tag>
        <Tag className={classes.tag} iconId="ri-home-4-line" linkProps={{ href }}>
          Ménages: {formattedDecohabitation}
        </Tag>
      </>
    )
  }

  // Handle rates display for taux-cibles-logements-vacants step
  if (path.includes('taux-cibles-logements-vacants')) {
    const firstEpciId = Object.keys(simulationSettings.epciScenarios)[0]
    const epciRates = simulationSettings.epciScenarios[firstEpciId]

    if (epciRates) {
      const longTermVacancyPercent = (epciRates.longTermVacancyRate * 100).toFixed(2)

      return (
        <Tag className={classes.tag} iconId="ri-home-4-line" linkProps={{ href }}>
          Taux cible : {longTermVacancyPercent}%
        </Tag>
      )
    }
  }

  if (path.includes('taux-cibles-residences-secondaires')) {
    const firstEpciId = Object.keys(simulationSettings.epciScenarios)[0]
    const epciRates = simulationSettings.epciScenarios[firstEpciId]

    if (epciRates) {
      const secondaryResidencePercent = (epciRates.txRs * 100).toFixed(2)

      return (
        <Tag className={classes.tag} iconId="ri-home-line" linkProps={{ href }}>
          Taux cible : {secondaryResidencePercent}%
        </Tag>
      )
    }
  }

  // Handle rates display for taux-restructuration-disparition step
  if (path.includes('taux-restructuration-disparition')) {
    const firstEpciId = Object.keys(simulationSettings.epciScenarios)[0]
    const epciRates = simulationSettings.epciScenarios[firstEpciId]

    if (epciRates) {
      const restructuringPercent = (epciRates.restructuringRate * 100).toFixed(2)
      const disappearancePercent = (epciRates.disappearanceRate * 100).toFixed(2)

      return (
        <>
          <Tag className={classes.tag} iconId="ri-link" linkProps={{ href }}>
            Restructuration: {restructuringPercent}%
          </Tag>
          <Tag className={classes.tag} iconId="ri-link-unlink" linkProps={{ href }}>
            Disparition: {disappearancePercent}%
          </Tag>
        </>
      )
    }
  }

  // Handle projection data
  if (queryKeys.includes('projection') && data) {
    return (
      <Tag className={classes.tag} iconId={iconId as RiIconClassName} linkProps={{ href }}>
        {data}
      </Tag>
    )
  }

  // Default fallback - no tag displayed
  return null
}

const useStyles = tss.withParams<{ disabled: boolean; queryKeys: string[] }>().create(({ disabled }) => {
  let backgroundColor = undefined
  let hoverBackgroundColor = undefined
  let color = undefined

  if (disabled) {
    backgroundColor = `${fr.colors.decisions.background.disabled.grey.default} !important`
    hoverBackgroundColor = undefined
    color = `${fr.colors.decisions.text.disabled.grey.default} !important`
  }

  return {
    tag: {
      '&:hover': {
        backgroundColor: hoverBackgroundColor,
      },
      backgroundColor,
      color,
      cursor: disabled ? 'not-allowed' : undefined,
    },
  }
})
