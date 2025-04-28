// web/app/api/water/route.ts
import { recordWater, canWaterToday } from '@/lib/wateringLogic'
import { NextResponse } from 'next/server'

export const runtime = 'edge'

export async function POST(req: Request) {
  const { userId, plotId } = await req.json()

  // guard: only once per UTC day
  const allowed = await canWaterToday(userId, plotId)
  if (!allowed) {
    return NextResponse.json(
      { error: 'Already watered today' },
      { status: 400 }
    )
  }

  // record it
  const result = await recordWater(userId, plotId)
  if (!result.success) {
    return NextResponse.json({ error: result.error }, { status: 500 })
  }

  return NextResponse.json({ success: true })
}
