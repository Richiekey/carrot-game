'use client'

import { useQuery, useQueryClient } from '@tanstack/react-query'
import { FarmData } from '@/lib/types'

/**
 * Hook to fetch and manage the user's entire farm (plots + state)
 */
export function useFarm(userId: string) {
  const queryClient = useQueryClient()

  const query = useQuery({
    queryKey: ['farm', userId],
    queryFn: async (): Promise<FarmData> => {
      const res = await fetch('/api/farm', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId }),
      })
      const json = await res.json()
      if (!res.ok) {
        throw new Error(json.error || 'Failed to fetch farm data')
      }
      return json as FarmData
    },
    enabled: Boolean(userId),
    staleTime: 30_000,
    refetchOnWindowFocus: true,
  })

  /**
   * Invalidate the farm query to refresh data
   */
  const refresh = () => {
    queryClient.invalidateQueries({ queryKey: ['farm', userId] })
  }

  return {
    ...query,
    refresh,
  }
}
