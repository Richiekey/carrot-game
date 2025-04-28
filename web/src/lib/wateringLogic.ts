import { supabase } from './supabaseClient'

export interface WaterResult {
  success: boolean
  error?: string
}

/**
 * Checks if the user can water this plot today (once per UTC day).
 */
export async function canWaterToday(
  userId: string,
  plotId: number
): Promise<boolean> {
  const { data, error } = await supabase
    .from('carrot_plots')
    .select('last_watered_at')
    .eq('user_id', userId)
    .eq('plot_id', plotId)
    .single()

  if (error || !data || !data.last_watered_at) {
    return true // no record or error, allow initial watering
  }
  const last = new Date(data.last_watered_at)
  const now = new Date()

  // prevent watering more than once per UTC day
  const sameDay =
    last.getUTCFullYear() === now.getUTCFullYear() &&
    last.getUTCMonth() === now.getUTCMonth() &&
    last.getUTCDate() === now.getUTCDate()

  return !sameDay
}

/**
 * Records a watering action by appending to watered_days and updating last_watered_at.
 */
export async function recordWater(
  userId: string,
  plotId: number
): Promise<WaterResult> {
  const timestamp = new Date().toISOString()

  // 1) fetch current watered_days array
  const { data: plot, error: fetchError } = await supabase
    .from('carrot_plots')
    .select('watered_days')
    .eq('user_id', userId)
    .eq('plot_id', plotId)
    .single()

  if (fetchError || !plot) {
    return { success: false, error: fetchError?.message || 'Plot not found' }
  }

  // ensure watered_days is an array
  const currentDays = Array.isArray(plot.watered_days) ? plot.watered_days : []
  const updatedDays = [...currentDays, timestamp]

  // 2) update the record with new watered_days and last_watered_at
  const { error: updateError } = await supabase
    .from('carrot_plots')
    .update({
      watered_days: updatedDays,
      last_watered_at: timestamp,
    })
    .eq('user_id', userId)
    .eq('plot_id', plotId)

  if (updateError) {
    return { success: false, error: updateError.message }
  }

  return { success: true }
}
