import { getServerSession } from 'next-auth'
import { NextResponse } from 'next/server'
import { authOptions } from '~/lib/auth/auth.config'

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions)
  if (!session?.accessToken) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const res = await fetch(`${process.env.NEXT_OTELO_API_URL}/users/${params.id}`, {
    headers: {
      Authorization: `Bearer ${session.accessToken}`,
      'Content-Type': 'application/json',
    },
    method: 'DELETE',
  })

  console.log('res', res)
  if (!res.ok) {
    return NextResponse.json({ error: 'Failed to delete user' }, { status: res.status })
  }

  return NextResponse.json({ success: true })
}
