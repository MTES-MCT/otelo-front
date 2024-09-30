import { NextResponse } from 'next/server'
import { auth } from '~/lib/auth/auth'

export async function GET(_: Request, { params }: { params: { id: string } }) {
  const session = await auth()
  if (!session?.accessToken) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const res = await fetch(`${process.env.NEXT_OTELO_API_URL}/simulations/${params.id}/results`, {
    headers: {
      Authorization: `Bearer ${session.accessToken}`,
      'Content-Type': 'application/json',
    },
  })

  if (!res.ok) {
    return NextResponse.json({ error: 'Failed to fetch simulation results' }, { status: res.status })
  }

  const data = await res.json()
  return NextResponse.json(data)
}
