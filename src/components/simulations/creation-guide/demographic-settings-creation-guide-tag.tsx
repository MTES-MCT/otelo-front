'use client'

import { RiIconClassName, fr } from '@codegouvfr/react-dsfr'
import { Tag } from '@codegouvfr/react-dsfr/Tag'
import { usePathname, useSearchParams } from 'next/navigation'
import { useQueryState } from 'nuqs'
import { FC, useState } from 'react'
import { tss } from 'tss-react'
import { useEpcisRates } from '~/app/(authenticated)/simulation/(creation)/(rates-provider)/rates-provider'
import { useEpcis } from '~/hooks/use-epcis'

interface CreationGuideTagProps {
  step: {
    data?: string | Array<string>
    disabled?: boolean
    iconId?: string
    path: string
    queryKeys: Array<string>
  }
}

const STEP_ORDER = {
  modifier: {
    'cadrage-temporel': 1,
    'parametrages-demographique': 2,
    'taux-cibles-logements-vacants': 3,
    'taux-cibles-residences-secondaires': 4,
    'taux-restructuration-disparition': 5,
  },
  creation: {
    'choix-du-territoire': 1,
    'cadrage-temporel': 2,
    'parametrages-demographique': 3,
    'taux-cibles-logements-vacants': 4,
    'taux-cibles-residences-secondaires': 5,
    'taux-restructuration-disparition': 6,
  },
}

export const DemographicSettingsGuideTag: FC<CreationGuideTagProps> = ({ step }) => {
  const { data, disabled = false, path, queryKeys, iconId = 'fr-icon-checkbox-circle-line' } = step
  const [value] = useQueryState(queryKeys[0])
  const { rates } = useEpcisRates()
  const { data: epcis } = useEpcis(Object.keys(rates))

  const { classes } = useStyles({ disabled, value, queryKeys })
  const searchParams = useSearchParams()
  const currentPathname = usePathname()
  const [showAllVacancy, setShowAllVacancy] = useState(false)
  const [showAllSecondary, setShowAllSecondary] = useState(false)
  const [showAllRestructuration, setShowAllRestructuration] = useState(false)
  const newSearchParams = new URLSearchParams(searchParams.toString())
  const href = `${path}${newSearchParams.toString() ? `?${newSearchParams.toString()}` : ''}`

  // Determine if we're in creation or modification mode and current step
  const isModifierPath = currentPathname.includes('modifier')
  const currentStepName = currentPathname.split('/').pop()
  const configKey = isModifierPath ? 'modifier' : 'creation'
  const currentStepOrder = STEP_ORDER[configKey][currentStepName as keyof (typeof STEP_ORDER)[typeof configKey]] || 0

  // Helper function to check if current step is after the given step
  const isAfterStep = (stepPath: string) => {
    const stepName = stepPath.split('/').pop()
    const stepOrder = STEP_ORDER[configKey][stepName as keyof (typeof STEP_ORDER)[typeof configKey]] || 0
    return currentStepOrder > stepOrder
  }

  // Handle horizon de temps display
  if (path === '/simulation/cadrage-temporel' && value) {
    return (
      <Tag className={classes.tag} iconId="ri-time-line" linkProps={{ href }}>
        2021 - {value}
      </Tag>
    )
  }

  if (queryKeys.includes('omphale')) {
    if (value) {
      const scenario = value.split('_')[0]
      const decohabitation = value.split('_')[1]

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
            Population : {formattedScenario}
          </Tag>
          <Tag className={classes.tag} iconId="ri-home-4-line" linkProps={{ href }}>
            Ménages : {formattedDecohabitation}
          </Tag>
        </>
      )
    }
  }

  if (path === '/simulation/taux-cibles-logements-vacants') {
    if (isAfterStep(path) && rates && Object.keys(rates).length > 0) {
      const epciCodes = Object.keys(rates)

      const displayedCodes = showAllVacancy ? epciCodes : epciCodes.slice(0, 4)
      const hasMoreThanFour = epciCodes.length > 4

      return (
        <>
          {displayedCodes.map((epciCode) => {
            const epciRates = rates[epciCode]
            const epciName = epcis?.find((epci) => epci.code === epciCode)?.name
            if (epciRates) {
              const longTermVacancyPercent = (epciRates.longTermVacancyRate * 100).toFixed(2)
              return (
                <Tag key={epciCode} className={classes.tag} iconId="ri-checkbox-circle-line" linkProps={{ href }}>
                  <span className="fr-ml-1w">
                    {epciName} <br /> Taux cible : {longTermVacancyPercent} %{' '}
                  </span>
                </Tag>
              )
            }
            return null
          })}
          {hasMoreThanFour && (
            <Tag
              key="voir-plus-vacancy"
              className={classes.tag}
              iconId={showAllVacancy ? 'ri-arrow-up-line' : 'ri-arrow-down-line'}
              onClick={() => setShowAllVacancy(!showAllVacancy)}
            >
              {showAllVacancy ? 'Voir moins' : 'Voir plus'}
            </Tag>
          )}
        </>
      )
    }
  }

  if (path === '/simulation/taux-cibles-residences-secondaires') {
    if (isAfterStep(path) && rates && Object.keys(rates).length > 0) {
      const epciCodes = Object.keys(rates)

      const displayedCodes = showAllSecondary ? epciCodes : epciCodes.slice(0, 4)
      const hasMoreThanFour = epciCodes.length > 4

      return (
        <>
          {displayedCodes.map((epciCode) => {
            const epciRates = rates[epciCode]
            const epciName = epcis?.find((epci) => epci.code === epciCode)?.name
            if (epciRates) {
              const secondaryResidencePercent = (epciRates.txRS * 100).toFixed(2)
              return (
                <Tag key={epciCode} className={classes.tag} iconId="ri-checkbox-circle-line" linkProps={{ href }}>
                  <span className="fr-ml-1w">
                    {epciName}
                    <br />
                    Taux cible : {secondaryResidencePercent} %
                  </span>
                </Tag>
              )
            }
            return null
          })}
          {hasMoreThanFour && (
            <Tag
              key="voir-plus-secondary"
              className={classes.tag}
              iconId={showAllSecondary ? 'ri-arrow-up-line' : 'ri-arrow-down-line'}
              onClick={() => setShowAllSecondary(!showAllSecondary)}
            >
              {showAllSecondary ? 'Voir moins' : 'Voir plus'}
            </Tag>
          )}
        </>
      )
    }
  }

  // Handle rates display for taux-restructuration-disparition step
  if (path === '/simulation/taux-restructuration-disparition' && currentPathname === '/simulation/taux-restructuration-disparition') {
    if (rates && Object.keys(rates).length > 0) {
      const epciCodes = Object.keys(rates)
      const displayedCodes = showAllRestructuration ? epciCodes : epciCodes.slice(0, 4)
      const hasMoreThanTwo = epciCodes.length > 2

      return (
        <>
          {displayedCodes.map((epciCode) => {
            const epciRates = rates[epciCode]
            const epciName = epcis?.find((epci) => epci.code === epciCode)?.name

            if (epciRates) {
              const restructuringPercent = (epciRates.restructuringRate * 100).toFixed(2)
              const disappearancePercent = (epciRates.disappearanceRate * 100).toFixed(2)

              return (
                <div className="fr-flex fr-direction-column fr-flex-gap-2v" key={epciCode}>
                  <Tag className={classes.tag} iconId="ri-link" linkProps={{ href }}>
                    <span className="fr-ml-1w">
                      {epciName}
                      <br />
                      Restructuration: {restructuringPercent}%
                    </span>
                  </Tag>
                  <Tag className={classes.tag} iconId="ri-link-unlink" linkProps={{ href }}>
                    <span className="fr-ml-1w">
                      {epciName}
                      <br />
                      Disparition: {disappearancePercent}%
                    </span>
                  </Tag>
                </div>
              )
            }
            return null
          })}
          {hasMoreThanTwo && (
            <Tag
              key="voir-plus-restructuration"
              className={classes.tag}
              iconId={showAllRestructuration ? 'ri-arrow-up-line' : 'ri-arrow-down-line'}
              onClick={() => setShowAllRestructuration(!showAllRestructuration)}
            >
              {showAllRestructuration ? 'Voir moins' : 'Voir plus'}
            </Tag>
          )}
        </>
      )
    }
  }

  let formattedValue = value && Number(value) < 1 ? (Number(value) * 100).toFixed(2) : value
  if (data && typeof data === 'string') {
    formattedValue = data
  }

  const defaultTagProps = {
    value: formattedValue,
  }

  const tagProps = {
    iconId: iconId as RiIconClassName,
    ...defaultTagProps,
    linkProps: {
      href,
    },
  }

  // EPCIS
  if (data && Array.isArray(data)) {
    return data.map((item) => (
      <Tag key={item} iconId="ri-map-pin-2-line" className={classes.tag} linkProps={{ href }}>
        {item}
      </Tag>
    ))
  }
  if (!data && !!formattedValue) {
    return (
      <Tag className={classes.tag} {...tagProps}>
        {formattedValue}
      </Tag>
    )
  }
}

const useStyles = tss
  .withParams<{ disabled: boolean; value: string | null; queryKeys: string[] }>()
  .create(({ disabled, value, queryKeys }) => {
    let backgroundColor = undefined
    let hoverBackgroundColor = undefined
    let color = undefined

    if (!value && queryKeys.length === 1) {
      backgroundColor = `${fr.colors.decisions.background.contrast.grey.default} !important`
      hoverBackgroundColor = `${fr.colors.decisions.background.contrast.grey.hover} !important`
      color = `${fr.colors.decisions.text.default.grey.default} !important`
    }

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
