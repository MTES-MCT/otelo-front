import { getServerSession } from 'next-auth'
import { NextResponse } from 'next/server'
import { authOptions } from '~/lib/auth/auth.config'

export async function POST(request: Request, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions)
  if (!session?.accessToken) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const body = await request.json()

  const res = await fetch(`${process.env.NEXT_OTELO_API_URL}/simulations/${params.id}/clone`, {
    body: JSON.stringify(body),
    headers: {
      Authorization: `Bearer ${session.accessToken}`,
      'Content-Type': 'application/json',
    },
    method: 'POST',
  })

  if (!res.ok) {
    return NextResponse.json({ error: 'Failed to clone simulation' }, { status: res.status })
  }

  const data = await res.json()
  return NextResponse.json(data)
}
