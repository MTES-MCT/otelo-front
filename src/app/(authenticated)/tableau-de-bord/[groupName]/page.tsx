import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { TableauDeBord } from '~/components/tableau-de-bord/tableau-de-bord'
import { authOptions } from '~/lib/auth/auth.config'
import { getDashboardList } from '~/server-only/simulation/get-dashboard-list'

interface PageProps {
  params: { groupName: string }
}

export default async function TableauDeBordVisualisationPage({ params }: PageProps) {
  const { groupName } = params

  // Redirect if no EPCIs are provided
  if (!groupName) {
    redirect('/tableaux-de-bord')
  }

  const session = await getServerSession(authOptions)

  // Fetch simulations for the given EPCIs
  const dashboard = await getDashboardList()

  const simulations = dashboard[groupName]

  if (!simulations) {
    redirect('/tableaux-de-bord')
  }

  return <TableauDeBord simulations={simulations} groupName={groupName} userEmail={session?.user?.email as string} />
}
