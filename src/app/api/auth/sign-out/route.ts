import { NextResponse } from 'next/server'

export async function GET() {
  const response = await fetch(`${process.env.NEXT_OTELO_API_URL}/auth/logout`, {
    headers: {
      'Content-Type': 'application/json',
    },
  })

  if (!response.ok) {
    return NextResponse.json({ error: 'Failed to logout user' }, { status: response.status })
  }
}
