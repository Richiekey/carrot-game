import { claimDaily } from '@/lib/claimLogic'
import { NextResponse } from 'next/server'

export const runtime = 'edge'

export async function POST(req: Request) {
  const { userId } = await req.json()
  const result = await claimDaily(userId)
  if (!result.success) {
    return NextResponse.json({ error: result.error }, { status: 400 })
  }
  return NextResponse.json({ newBalance: result.newBalance })
}
