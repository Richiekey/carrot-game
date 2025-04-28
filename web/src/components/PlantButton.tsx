'use client'

import React from 'react'
import { useAccount, useWriteContract } from 'wagmi'
import CarrotGameArtifact from '@/abis/CarrotGame.json'
import type { Abi } from 'viem'
import { megaEthChain } from '@/lib/wagmiClient'

interface PlantButtonProps {
  plotId: number
  onSuccess?: () => void
}

export function PlantButton({ plotId, onSuccess }: PlantButtonProps) {
  const { address } = useAccount()

  const {
    writeContractAsync,
    isPending,
    isSuccess,
    error,
  } = useWriteContract()

  const handlePlant = async () => {
    if (!address) return
    try {
      // 1) send the on-chain tx and await confirmation
      await writeContractAsync({
        abi: CarrotGameArtifact.abi as Abi,
        address: '0x3375e4faB224361DD8278c83BBe7138F4AC4Cee2',
        functionName: 'plantCarrot',
        args: [plotId],
        chainId: megaEthChain.id,
      })
      // 2) record in Supabase
      const res = await fetch('/api/plant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: address, plotId }),
      })
      const result = await res.json()
      if (result.error) throw new Error(result.error)
      // 3) invoke callback to refresh the farm
      onSuccess?.()
    } catch (e: any) {
      console.error('Planting error:', e)
    }
  }

  return (
    <button
      onClick={handlePlant}
      disabled={isPending || isSuccess}
      className="px-4 py-2 bg-green-600 text-white rounded"
    >
      {isPending
        ? 'Planting…'
        : isSuccess
        ? 'Planted!'
        : 'Plant Carrot'}
      {error && <span className="ml-2 text-red-300">{error.message}</span>}
    </button>
  )
}
