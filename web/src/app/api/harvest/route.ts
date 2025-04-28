// web/app/api/harvest/route.ts
import { harvestPlot } from '@/lib/harvestLogic'
import { NextResponse } from 'next/server'

export const runtime = 'edge'

export async function POST(req: Request) {
  const { userId, plotId } = await req.json()
  const result = await harvestPlot(userId, plotId)
  if (!result.success) {
    return NextResponse.json({ error: result.error }, { status: 400 })
  }
  return NextResponse.json({ outcome: result.outcome })
}
