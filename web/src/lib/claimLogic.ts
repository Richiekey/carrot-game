// web/src/lib/claimLogic.ts
import { supabase } from './supabaseClient'

// how many SEED per daily claim
const DAILY_SEED = 100

export interface ClaimResult {
  success: boolean
  error?: string
  newBalance?: number
}

export async function claimDaily(userId: string): Promise<ClaimResult> {
  // 1) load current state
  const { data: state, error: fetchErr } = await supabase
    .from('farm_state')
    .select('seed_balance, last_claimed')
    .eq('user_id', userId)
    .single()

  if (fetchErr) {
    // first claim ever? insert initial row
    const { data: insertData, error: insertErr } = await supabase
      .from('farm_state')
      .insert([{ user_id: userId, seed_balance: DAILY_SEED, last_claimed: new Date().toISOString() }])
      .select('seed_balance')
      .single()
    if (insertErr || !insertData) {
      return { success: false, error: insertErr?.message || 'Failed to initialize state' }
    }
    return { success: true, newBalance: insertData.seed_balance }
  }

  // 2) guard: 24h cooldown
  const last = state.last_claimed ? new Date(state.last_claimed) : new Date(0)
  const now = new Date()
  const hoursSince = (now.getTime() - last.getTime()) / (1000 * 60 * 60)
  if (hoursSince < 24) {
    return { success: false, error: 'Claim is available every 24 hours' }
  }

  // 3) update balance & timestamp
  const newBalance = state.seed_balance + DAILY_SEED
  const { data: updated, error: updateErr } = await supabase
    .from('farm_state')
    .update({ seed_balance: newBalance, last_claimed: now.toISOString() })
    .eq('user_id', userId)
    .select('seed_balance')
    .single()

  if (updateErr || !updated) {
    return { success: false, error: updateErr?.message || 'Failed to update balance' }
  }
  return { success: true, newBalance: updated.seed_balance }
}
