'use client'

import Tabs from '@codegouvfr/react-dsfr/Tabs'
import { parseAsString, useQueryStates } from 'nuqs'
import { tss } from 'tss-react'

type DemographicSettingsHeaderProps = {
  children: React.ReactNode[]
}

export const DemographicSettingsHeader = ({ children }: DemographicSettingsHeaderProps) => {
  const [queryState, setQueryState] = useQueryStates({
    population: parseAsString,
    scenario: parseAsString,
  })
  const { classes } = useStyles({ population: queryState.population })
  const selectedTabId = queryState.scenario ?? 'population'

  const title =
    queryState.scenario === 'menages'
      ? 'Évolution du nombre de ménages annuel par projections Omphale'
      : 'Évolution de la population annuelle par projections à la population'

  const content = selectedTabId === 'population' ? children[0] : children[1]

  return (
    <Tabs
      label="Scénario de projection démographique"
      classes={{ tab: classes.tab }}
      selectedTabId={selectedTabId}
      onTabChange={(tabId: string) => setQueryState({ scenario: tabId === 'population' ? 'population' : 'menages' })}
      tabs={[
        {
          iconId: 'ri-group-3-line',
          label: 'Étape 1 : Projection par population',
          tabId: 'population',
        },
        {
          iconId: 'ri-home-2-line',
          label: 'Étape 2 : Scénarios de décohabitation - Projection par ménages',
          tabId: 'menages',
        },
      ]}
    >
      <h5>{title}</h5>
      {content}
    </Tabs>
  )
}

const useStyles = tss.withParams<{ population: string | null }>().create(({ population }) => ({
  tab: {
    '&[class*="ri-home-2-line"]': {
      cursor: !population ? 'not-allowed' : 'pointer',
      opacity: !population ? 0.5 : 1,
      pointerEvents: !population ? 'none' : 'auto',
    },
  },
}))
