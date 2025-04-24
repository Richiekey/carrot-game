// web/src/lib/plantingLogic.ts
import { supabase } from './supabaseClient'

export interface PlantResult {
  success: boolean
  error?: string
}

/**
 * Burns SEED on-chain (via Wagmi) and then records the plot
 * in Supabase. Returns success/error.
 */
export async function plantPlot(
  userId: string,
  plotId: number
): Promise<PlantResult> {
  // TODO: call your Wagmi write to plantCarrot() on-chain first

  // then record in Supabase:
  const { data, error } = await supabase
    .from('carrot_plots')
    .insert([{ user_id: userId, plot_id: plotId }])

  if (error) {
    return { success: false, error: error.message }
  }
  return { success: true }
}
