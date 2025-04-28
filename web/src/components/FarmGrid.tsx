'use client'

import React from 'react'
import { useAccount } from 'wagmi'
import { useFarm } from '@/hooks/useFarm'
import { PlotCard } from '@/components/PlotCard'

/**
 * Displays the user's farm as a grid of plots and locked slots.
 */
export function FarmGrid() {
  const { address } = useAccount()
  const { data, isLoading, isError, error, refresh } = useFarm(address || '')

  if (isLoading) return <p>Loading farm...</p>
  if (isError) return <p className="text-red-500">Error: {error?.message}</p>

  const { plots, state } = data!
  const unlockSlots = Math.max(0, state.upgrade_level - plots.length)

  return (
    <div className="p-4">
      <div className="grid grid-cols-5 gap-4">
        {plots.map((plot) => (
          <PlotCard
            key={plot.plot_id}
            plot={plot}
            refresh={refresh}
          />
        ))}
        {Array.from({ length: unlockSlots }).map((_, idx) => (
          <div
            key={`locked-${idx}`}
            className="border-2 border-dashed border-gray-400 rounded p-4 flex items-center justify-center"
          >
            <p className="text-gray-500">Locked</p>
          </div>
        ))}
      </div>
    </div>
  )
}
