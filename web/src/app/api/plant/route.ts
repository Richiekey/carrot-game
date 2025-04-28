import { recordPlant } from '@/lib/plantingLogic'
import { NextResponse } from 'next/server'

export const runtime = 'edge'

export async function POST(req: Request) {
  const { userId, plotId } = await req.json()
  try {
    await recordPlant(userId, plotId)
    return NextResponse.json({ success: true })
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 400 })
  }
}
