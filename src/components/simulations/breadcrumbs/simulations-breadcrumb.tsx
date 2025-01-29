'use client'

import { Breadcrumb } from '@codegouvfr/react-dsfr/Breadcrumb'
import dayjs from 'dayjs'
import { usePathname } from 'next/navigation'
import { useSimulation } from '~/hooks/use-simulation'

export const SimulationsBreadcrumb = () => {
  const pathname = usePathname()
  const { data: simulation } = useSimulation()
  return (
    <Breadcrumb
      currentPageLabel="Résultats"
      homeLinkProps={{
        href: '/',
      }}
      segments={[
        {
          // todo: add epci name
          label: `Simulation - ${dayjs(simulation?.createdAt).format('DD/MM/YYYY')}`,
          linkProps: { href: pathname },
        },
      ]}
    />
  )
}
