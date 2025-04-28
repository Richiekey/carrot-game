'use client'

import React, { useState } from 'react'
import { useAccount, useWriteContract } from 'wagmi'
import CarrotGameArtifact from '@/abis/CarrotGame.json'
import type { Abi } from 'viem'
import { megaEthChain } from '@/lib/wagmiClient'

interface HarvestButtonProps {
  plotId: number
  onSuccess?: () => void
}

export function HarvestButton({ plotId, onSuccess }: HarvestButtonProps) {
  const { address } = useAccount()
  const [outcome, setOutcome] = useState<string>()
  const [errorMsg, setErrorMsg] = useState<string>()
  const { writeContractAsync, isLoading, isSuccess, error } = useWriteContract()

  const handleHarvest = async () => {
    if (!address) return
    try {
      // 1) on-chain
      await writeContractAsync({
        abi: CarrotGameArtifact.abi as Abi,
        address: '0x3375e4faB224361DD8278c83BBe7138F4AC4Cee2',
        functionName: 'harvestCarrot',
        args: [plotId],
        chainId: megaEthChain.id,
      })
      // 2) server record + RNG
      const res = await fetch('/api/harvest', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: address, plotId }),
      })
      const json = await res.json()
      if (json.error) throw new Error(json.error)
      setOutcome(json.outcome)
      onSuccess?.()
    } catch (e: any) {
      setErrorMsg(e.message)
    }
  }

  return (
    <div className="space-y-2">
      <button
        onClick={handleHarvest}
        disabled={isLoading || isSuccess}
        className="px-4 py-2 bg-orange-600 text-white rounded"
      >
        {isLoading
          ? 'Harvesting…'
          : isSuccess
          ? 'Harvested!'
          : 'Harvest Carrot'}
      </button>
      {outcome && <p>You got: <strong>{outcome}</strong></p>}
      {(error || errorMsg) && (
        <p className="text-red-500">{(error || { message: errorMsg }).message}</p>
      )}
    </div>
  )
}
