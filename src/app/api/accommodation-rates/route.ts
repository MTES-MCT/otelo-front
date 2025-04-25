import { NextRequest, NextResponse } from 'next/server'
import { auth } from '~/lib/auth/auth'

export async function GET(request: NextRequest) {
  const session = await auth()

  if (!session?.accessToken) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const url = new URL(request.url)
  const epcis = url.searchParams.get('epcis')

  const res = await fetch(`${process.env.NEXT_OTELO_API_URL}/accommodation-rates?epcis=${epcis}`, {
    headers: {
      Authorization: `Bearer ${session.accessToken}`,
      'Content-Type': 'application/json',
    },
  })
  if (!res.ok) {
    return NextResponse.json({ error: 'Failed to fetch accommodation rates by epci' }, { status: res.status })
  }

  const data = await res.json()
  return NextResponse.json(data)
}
