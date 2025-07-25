import { getServerSession } from 'next-auth'
import { NextRequest, NextResponse } from 'next/server'
import { authOptions } from '~/lib/auth/auth.config'

export async function GET(_: NextRequest, { params }: { params: { epci: string } }) {
  const session = await getServerSession(authOptions)

  if (!session?.accessToken) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const res = await fetch(`${process.env.NEXT_OTELO_API_URL}/epcis/${params.epci}/bassin`, {
    headers: {
      Authorization: `Bearer ${session.accessToken}`,
      'Content-Type': 'application/json',
    },
  })
  if (!res.ok) {
    return NextResponse.json({ error: 'Failed to fetch bassin epcis list' }, { status: res.status })
  }

  const data = await res.json()
  return NextResponse.json(data)
}
