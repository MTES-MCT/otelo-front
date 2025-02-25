'use client'

import { RiIconClassName } from '@codegouvfr/react-dsfr'
import Tabs from '@codegouvfr/react-dsfr/Tabs'
import { useQueryState } from 'nuqs'

export const SimulationResultsTabs = ({
  tabs,
}: {
  tabs: {
    content: JSX.Element
    iconId: RiIconClassName
    label: string
    tabId: string
  }[]
}) => {
  const [epci, setEpci] = useQueryState('epci')
  const selectedTabId = epci as string

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const tabsProps = tabs.map(({ content, ...tabProps }) => tabProps)

  return (
    <Tabs tabs={tabsProps} onTabChange={setEpci} selectedTabId={selectedTabId}>
      {tabs.find((tab) => tab.tabId === selectedTabId)?.content || tabs[0].content}
    </Tabs>
  )
}
