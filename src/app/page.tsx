import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { authOptions } from '~/lib/auth/auth.config'

export default async function Home() {
  const session = await getServerSession(authOptions)
  if (!session) {
    redirect('/accueil')
  } else {
    redirect('/tableaux-de-bord')
  }
}
