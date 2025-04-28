// web/src/lib/plantingLogic.ts
import { supabase } from './supabaseClient'

export async function recordPlant(userId: string, plotId: number) {
  const { error } = await supabase
    .from('carrot_plots')
    .insert([{ user_id: userId, plot_id: plotId }])
  if (error) throw error
}
