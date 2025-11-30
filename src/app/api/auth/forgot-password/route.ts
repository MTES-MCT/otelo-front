import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const body = await request.json()
  const res = await fetch(`${process.env.NEXT_OTELO_API_URL}/auth/forgot-password`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })

  if (!res.ok) {
    return NextResponse.json({ error: 'Failed to send forgot password email' }, { status: res.status })
  }

  return NextResponse.json({ success: true })
}
