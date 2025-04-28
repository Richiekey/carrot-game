// web/src/lib/farmUpgradeLogic.ts
import { supabase } from './supabaseClient'
import { SEED_COSTS } from './config'

export interface UpgradeResult {
  success: boolean
  error?: string
  newLevel?: number
}

export async function upgradeFarm(userId: string): Promise<UpgradeResult> {
  // 1) load current state
  const { data: state, error: fetchErr } = await supabase
    .from('farm_state')
    .select('seed_balance, upgrade_level')
    .eq('user_id', userId)
    .single()

  if (fetchErr || !state) {
    return { success: false, error: 'Farm state not found' }
  }
  const currentLevel = state.upgrade_level ?? 0
  const nextLevel = currentLevel + 1
  // dynamic key access with proper typing
const tierCosts: Record<number, number> = SEED_COSTS.upgradeTier as Record<number, number>
const cost = tierCosts[nextLevel]

  if (!cost) {
    return { success: false, error: 'Max upgrade reached' }
  }
  if (state.seed_balance < cost) {
    return { success: false, error: 'Insufficient SEED for upgrade' }
  }

  // 2) deduct cost & bump level
  const newBalance = state.seed_balance - cost
  const { data: updated, error: updateErr } = await supabase
    .from('farm_state')
    .update({ seed_balance: newBalance, upgrade_level: nextLevel })
    .eq('user_id', userId)
    .select('upgrade_level')
    .single()

  if (updateErr || !updated) {
    return { success: false, error: updateErr?.message || 'Upgrade failed' }
  }
  return { success: true, newLevel: updated.upgrade_level }
}
