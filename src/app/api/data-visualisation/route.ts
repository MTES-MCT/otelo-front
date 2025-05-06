import { NextResponse } from 'next/server'
import { auth } from '~/lib/auth/auth'

export async function GET(request: Request) {
  const session = await auth()

  if (!session?.accessToken) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { searchParams } = new URL(request.url)
  const epci = searchParams.get('epci')
  const type = searchParams.get('type')
  const populationType = searchParams.get('populationType')
  const source = searchParams.get('source')

  const res = await fetch(
    `${process.env.NEXT_OTELO_API_URL}/data-visualisation?epci=${epci}&type=${type}&populationType=${populationType}&source=${source}`,
    {
      headers: {
        Authorization: `Bearer ${session.accessToken}`,
        'Content-Type': 'application/json',
      },
    },
  )

  if (!res.ok) {
    return NextResponse.json({ error: 'Failed to fetch data visualisation' }, { status: res.status })
  }

  const data = await res.json()
  return NextResponse.json(data)
}
