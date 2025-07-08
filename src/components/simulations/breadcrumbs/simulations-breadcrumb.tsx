import { Breadcrumb } from '@codegouvfr/react-dsfr/Breadcrumb'
import dayjs from 'dayjs'
import { TSimulationWithResults } from '~/schemas/simulation'

type SimulationsBreadcrumbProps = {
  simulation: TSimulationWithResults
}

export const SimulationsBreadcrumb = ({ simulation }: SimulationsBreadcrumbProps) => {
  return (
    <Breadcrumb
      currentPageLabel="Résultats"
      homeLinkProps={{
        href: '/',
      }}
      segments={[
        {
          label: `${simulation.name} - ${dayjs(simulation.createdAt).format('DD/MM/YYYY')}`,
          linkProps: { href: `/simulation/${simulation.id}` },
        },
      ]}
    />
  )
}
