// web/app/api/farm/route.ts
import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabaseClient'

export const runtime = 'edge'

export async function POST(req: Request) {
  const { userId } = await req.json()
  if (!userId) {
    return NextResponse.json({ error: 'Missing userId' }, { status: 400 })
  }

  // Fetch all plots for this user
  const { data: plots, error: plotsErr } = await supabase
    .from('carrot_plots')
    .select('plot_id, planted_at, watered_days, last_watered_at, harvested')
    .eq('user_id', userId)

  if (plotsErr) {
    return NextResponse.json({ error: plotsErr.message }, { status: 500 })
  }

  // Fetch the farm state for this user
  const { data: state, error: stateErr } = await supabase
    .from('farm_state')
    .select('seed_balance, last_claimed, upgrade_level')
    .eq('user_id', userId)
    .single()

  if (stateErr && stateErr.code !== 'PGRST116') {
    // PGRST116 is “no rows returned” – OK (we’ll treat as defaults)
    return NextResponse.json({ error: stateErr.message }, { status: 500 })
  }

  // If no farm_state row yet, initialize default values
  const farmState = state ?? {
    seed_balance: 0,
    last_claimed: null,
    upgrade_level: 0,
  }

  return NextResponse.json({ plots, state: farmState })
}
