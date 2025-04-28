'use client'

import React from 'react'
import { Plot } from '@/lib/types'
import { CarrotStageSprite } from '@/components/CarrotStageSprite'
import { PlantButton } from '@/components/PlantButton'
import { WaterButton } from '@/components/WaterButton'
import { HarvestButton } from '@/components/HarvestButton'
import { CARROT_GROWTH_DAYS } from '@/lib/config'

interface PlotCardProps {
  plot: Plot
  refresh: () => void
}

export function PlotCard({ plot, refresh }: PlotCardProps) {
  const msPerDay = 24 * 60 * 60 * 1000
  const plantedAtDate = plot.planted_at ? new Date(plot.planted_at) : null
  const now = new Date()
  const daysSince = plantedAtDate
    ? Math.floor((now.getTime() - plantedAtDate.getTime()) / msPerDay)
    : 0

  return (
    <div className="border rounded p-4 flex flex-col items-center bg-white">
      {/* Carrot growth sprite */}
      <CarrotStageSprite
        plantedAt={plot.planted_at}
        wateredDays={plot.watered_days}
      />

      {/* Action buttons based on plot state */}
      {!plot.planted_at && (
        <PlantButton
          plotId={plot.plot_id}
          onSuccess={refresh}
        />
      )}

      {plot.planted_at && !plot.harvested && daysSince < CARROT_GROWTH_DAYS && (
        <WaterButton
          plotId={plot.plot_id}
          onSuccess={refresh}
        />
      )}

      {plot.planted_at && !plot.harvested && daysSince >= CARROT_GROWTH_DAYS && (
        <HarvestButton
          plotId={plot.plot_id}
          onSuccess={refresh}
        />
      )}

      {plot.harvested && (
        <p className="mt-2 text-green-600 font-semibold">Harvested</p>
      )}
    </div>
  )
}
