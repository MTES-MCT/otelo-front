import { NextResponse } from 'next/server'
import { auth } from '~/lib/auth/auth'

export async function GET(_: Request, { params }: { params: { id: string } }) {
  const session = await auth()
  if (!session?.accessToken) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const res = await fetch(`${process.env.NEXT_OTELO_API_URL}/simulations/${params.id}/scenario/export`, {
    headers: {
      Authorization: `Bearer ${session.accessToken}`,
    },
  })

  if (!res.ok) {
    return NextResponse.json({ error: 'Failed to get simulation scenario export' }, { status: res.status })
  }

  return new NextResponse(res.body, {
    headers: Object.fromEntries(res.headers.entries()),
  })
}
