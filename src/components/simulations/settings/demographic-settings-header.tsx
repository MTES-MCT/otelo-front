'use client'

import { Select } from '@codegouvfr/react-dsfr/Select'
import Tabs from '@codegouvfr/react-dsfr/Tabs'
import classNames from 'classnames'
import { parseAsString, useQueryState, useQueryStates } from 'nuqs'
import { tss } from 'tss-react'
import { useEpcis } from '~/hooks/use-epcis'

type DemographicSettingsHeaderProps = {
  children: React.ReactNode[]
  epcis?: string[]
}

export const DemographicSettingsSelectEpci = ({ epcis }: { epcis?: string[] }) => {
  const { data: customEpcis } = useEpcis(epcis)
  const options = customEpcis?.filter((item) => !!item)

  const [displayedEpci, setDisplayedEpci] = useQueryState('epciChart', parseAsString)
  return (
    <div className="fr-flex fr-justify-content-end fr-align-items-end fr-flex-gap-2v">
      <span className="fr-text--sm fr-mb-0">EPCI affiché :</span>
      <Select
        label={undefined}
        nativeSelectProps={{
          value: (displayedEpci as string) || epcis?.[0],
          onChange: (event) => setDisplayedEpci(event.target.value),
        }}
      >
        {(options || []).map((option) => (
          <option key={option?.code} value={option?.code}>
            {option?.name}
          </option>
        ))}
      </Select>
    </div>
  )
}

export const DemographicSettingsHeader = ({ children }: DemographicSettingsHeaderProps) => {
  const [queryState, setQueryState] = useQueryStates({
    population: parseAsString,
    scenario: parseAsString.withDefault('population'),
  })

  const { classes } = useStyles({ population: queryState.population })
  const selectedTabId = queryState.scenario ?? 'population'

  const content = selectedTabId === 'population' ? children[0] : children[1]

  return (
    <Tabs
      label="Scénario de projection démographique"
      classes={{ tab: classes.tab, panel: 'fr-background-default--grey' }}
      selectedTabId={selectedTabId}
      onTabChange={(tabId: string) => setQueryState({ scenario: tabId === 'population' ? 'population' : 'menages' })}
      tabs={[
        {
          label: 'Projection de population',
          tabId: 'population',
        },
        {
          label: 'Projection de ménages',
          tabId: 'menages',
        },
      ]}
    >
      <div className={classNames(classes.container, 'fr-background-default--grey')}>{content}</div>
    </Tabs>
  )
}

const useStyles = tss.withParams<{ population: string | null }>().create(({ population }) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
  title: {
    width: '75%',
  },
  titleContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  tab: {
    '&[class*="ri-home-2-line"]': {
      cursor: !population ? 'not-allowed' : 'pointer',
      opacity: !population ? 0.5 : 1,
      pointerEvents: !population ? 'none' : 'auto',
    },
  },
}))
