'use client'

import React, { useState } from 'react'
import { useAccount, useWriteContract } from 'wagmi'
import CarrotGameArtifact from '@/abis/CarrotGame.json'
import type { Abi } from 'viem'
import { megaEthChain } from '@/lib/wagmiClient'

interface WaterButtonProps {
  plotId: number
  onSuccess?: () => void
}

export function WaterButton({ plotId, onSuccess }: WaterButtonProps) {
  const { address } = useAccount()
  const [errorMsg, setErrorMsg] = useState<string>()
  const { writeContractAsync, isLoading, isSuccess, error } = useWriteContract()

  const handleWater = async () => {
    if (!address) return
    try {
      // 1) on-chain transaction
      await writeContractAsync({
        abi: CarrotGameArtifact.abi as Abi,
        address: '0x3375e4faB224361DD8278c83BBe7138F4AC4Cee2',
        functionName: 'waterCarrot',
        args: [plotId],
        chainId: megaEthChain.id,
      })
      // 2) server record
      const res = await fetch('/api/water', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: address, plotId }),
      })
      const json = await res.json()
      if (json.error) throw new Error(json.error)
      // invoke callback
      onSuccess?.()
    } catch (e: any) {
      setErrorMsg(e.message)
    }
  }

  return (
    <button
      onClick={handleWater}
      disabled={isLoading || isSuccess}
      className="px-4 py-2 bg-blue-600 text-white rounded"
    >
      {isLoading ? 'Watering…' : isSuccess ? 'Watered!' : 'Water Plant'}
      {(error || errorMsg) && (
        <span className="ml-2 text-red-300">
          {(error || { message: errorMsg }).message}
        </span>
      )}
    </button>
  )
}
