import { getServerSession } from 'next-auth'
import { NextResponse } from 'next/server'
import { authOptions } from '~/lib/auth/auth.config'

export async function GET() {
  const session = await getServerSession(authOptions)
  if (!session?.accessToken) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const res = await fetch(`${process.env.NEXT_OTELO_API_URL}/cron/synchro`, {
    headers: {
      Authorization: `Bearer ${session.accessToken}`,
      'Content-Type': 'application/json',
    },
  })
  if (!res.ok) {
    return NextResponse.json({ error: 'Failed to synchro ds' }, { status: res.status })
  }
  return NextResponse.json({ message: 'Synchro ds' })
}
