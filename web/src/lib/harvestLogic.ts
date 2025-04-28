// web/src/lib/harvestLogic.ts
import { supabase } from './supabaseClient'
import {
  CARROT_GROWTH_DAYS,
  HARVEST_WINDOW_DAYS,
  PROBABILITY_TABLE,
} from './config'

export interface HarvestResult {
  success: boolean
  error?: string
  outcome?: 'GOLDEN' | 'PERFECT' | 'NORMAL' | 'DRIED' | 'DEAD'
}

export async function harvestPlot(
  userId: string,
  plotId: number
): Promise<HarvestResult> {
  // 1) load the plot
  const { data: plot, error: fetchErr } = await supabase
    .from('carrot_plots')
    .select('planted_at, watered_days, harvested')
    .eq('user_id', userId)
    .eq('plot_id', plotId)
    .single()
  if (fetchErr || !plot) {
    return { success: false, error: fetchErr?.message || 'Plot not found' }
  }
  if (plot.harvested) {
    return { success: false, error: 'Already harvested' }
  }

  // 2) check timing
  const planted = new Date(plot.planted_at)
  const now = new Date()
  const daysSince = Math.floor(
    (now.getTime() - planted.getTime()) / (24 * 60 * 60 * 1000)
  )
  if (daysSince < CARROT_GROWTH_DAYS) {
    return { success: false, error: 'Not yet ripe' }
  }
  if (daysSince > CARROT_GROWTH_DAYS + HARVEST_WINDOW_DAYS) {
    return { success: false, error: 'Harvest window expired' }
  }

  // 3) compute missed days
  const wateredCount = Array.isArray(plot.watered_days)
    ? plot.watered_days.length
    : 0
  const daysMissed = Math.min(
    CARROT_GROWTH_DAYS - wateredCount,
    CARROT_GROWTH_DAYS
  )

  // 4) pick probability row
  const row = PROBABILITY_TABLE.find((r) => r.daysMissed === daysMissed)!
  const thresholds: [keyof typeof row, number][] = [
    ['golden', row.golden],
    ['perfect', row.perfect],
    ['normal', row.normal],
    ['dried', row.dried],
    ['dead', row.dead],
  ]
  const rnd = Math.random()
  let cumulative = 0
  let chosen: keyof typeof row = 'dead'
  for (const [key, prob] of thresholds) {
    cumulative += prob
    if (rnd < cumulative) {
      chosen = key
      break
    }
  }
  const outcome = chosen.toUpperCase() as HarvestResult['outcome']

  // 5) mark harvested
  const { error: updateErr } = await supabase
    .from('carrot_plots')
    .update({ harvested: true })
    .eq('user_id', userId)
    .eq('plot_id', plotId)
  if (updateErr) {
    return { success: false, error: updateErr.message }
  }

  return { success: true, outcome }
}
