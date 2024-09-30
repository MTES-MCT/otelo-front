import { NextResponse } from 'next/server'
import { auth } from '~/lib/auth/auth'

export async function GET() {
  const session = await auth()

  if (!session?.accessToken) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const res = await fetch(`${process.env.NEXT_OTELO_API_URL}/simulations`, {
    headers: {
      Authorization: `Bearer ${session.accessToken}`,
      'Content-Type': 'application/json',
    },
  })

  if (!res.ok) {
    return NextResponse.json({ error: 'Failed to fetch simulations' }, { status: res.status })
  }

  const data = await res.json()
  return NextResponse.json(data)
}

export async function POST(request: Request) {
  const session = await auth()

  if (!session?.accessToken) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const body = await request.json()

  const response = await fetch(`${process.env.NEXT_OTELO_API_URL}/simulations`, {
    body: JSON.stringify(body),
    headers: {
      Authorization: `Bearer ${session.accessToken}`,
      'Content-Type': 'application/json',
    },
    method: 'POST',
  })
  if (!response.ok) {
    return NextResponse.json({ error: 'Failed to create simulation' }, { status: response.status })
  }
  const data = await response.json()
  return NextResponse.json(data)
}
