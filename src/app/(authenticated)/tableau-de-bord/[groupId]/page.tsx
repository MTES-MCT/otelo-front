import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { TableauDeBord } from '~/components/tableau-de-bord/tableau-de-bord'
import { authOptions } from '~/lib/auth/auth.config'
import { getDashboardList } from '~/server-only/simulation/get-dashboard-list'

interface PageProps {
  params: { groupId: string }
}

export default async function TableauDeBordPage({ params }: PageProps) {
  const { groupId } = params

  // Redirect if no groupId is provided
  if (!groupId) {
    redirect('/tableaux-de-bord')
  }

  const session = await getServerSession(authOptions)

  // Fetch simulations for the given group
  const dashboardGroups = await getDashboardList()

  const group = dashboardGroups.find((g) => g.id === groupId)

  if (!group) {
    redirect('/tableaux-de-bord')
  }

  return <TableauDeBord simulations={group.simulations} groupName={group.name} userEmail={session?.user?.email as string} />
}
