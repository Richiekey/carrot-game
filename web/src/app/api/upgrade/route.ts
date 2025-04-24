// example: app/api/plant/route.ts
import { supabase } from '@/lib/supabaseClient'
import { NextResponse } from 'next/server'

export const runtime = 'edge'  // ultra-fast, serverless

export async function POST(req: Request) {
  const { userId, plotId } = await req.json()

  // insert a new plot record
  const { data, error } = await supabase
    .from('carrot_plots')
    .insert([{ user_id: userId, plot_id: plotId }])

  if (error) return NextResponse.json({ error }, { status: 400 })
  return NextResponse.json({ data })
}
