'use client'

import { fr } from '@codegouvfr/react-dsfr'
import Alert from '@codegouvfr/react-dsfr/Alert'
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
  const [scenarioSelected] = useQueryState('scenario', parseAsString)
  const { data: customEpcis } = useEpcis(epcis)
  const options = customEpcis?.filter((item) => !!item)

  const [displayedEpci, setDisplayedEpci] = useQueryState('epciChart', parseAsString)
  const hint = `Sélectionnez un EPCI dans la liste pour afficher ses projections de ${scenarioSelected === 'population' ? 'population' : 'ménages'}.`
  return (
    <Select
      label=""
      hint={hint}
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
  )
}

export const DemographicSettingsHeader = ({ children, epcis }: DemographicSettingsHeaderProps) => {
  const [queryState, setQueryState] = useQueryStates({
    population: parseAsString,
    scenario: parseAsString,
  })

  const { classes } = useStyles({ population: queryState.population })
  const selectedTabId = queryState.scenario ?? 'population'

  const title =
    queryState.scenario === 'menages'
      ? "Évolution du nombre de ménages en fonction des scénarios d'évolution des modes d'habitation"
      : 'Évolution de la population annuelle par scénario de projection'

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
      <div className={classes.container}>
        <div className={classes.titleContainer}>
          <h5 className={classNames(classes.title, 'fr-mb-0')}>{title}</h5>
          <DemographicSettingsSelectEpci epcis={epcis} />
        </div>
        {queryState.scenario === 'population' && (
          <div className={fr.cx('fr-my-2w')}>
            <Alert
              description="Les projections de nombre de ménages proposées par Otelo sont établies à partir du modèle Omphale, produit par l'Insee. Il permet
            d'obtenir des projections de population sur la période 2018-2050 à partir de scénarios qui reposent sur différentes hypothèses de
            natalité, de mortalité et de migration. Ces projections de population sont ensuite transformées en projections de nombre de ménages
            à l'aide d'une méthode conçue en partenariat par la DHUP, l'Insee et le SDES selon plusieurs scénarios de décohabitation."
              severity="info"
              small
            />
          </div>
        )}
        {content}
      </div>
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
