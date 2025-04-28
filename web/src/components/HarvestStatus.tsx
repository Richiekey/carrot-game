'use client'

import React from 'react'
import CarrotGameArtifact from '@/abis/CarrotGame.json'
import { useAccount, useContractRead } from 'wagmi'
import type { Abi } from 'viem'
import { megaEthChain } from '@/lib/wagmiClient'

export function HarvestStatus() {
  const { address } = useAccount()

  const { data: count, isLoading } = useContractRead({
    address: '0x3375e4faB224361DD8278c83BBe7138F4AC4Cee2' ,
    abi: CarrotGameArtifact.abi as Abi,
    functionName: 'getCarrotCount',
    args: address ? [address] : undefined,
    chainId: megaEthChain.id,
    query: { 
      enabled: Boolean(address),   // ← put enabled here
    },
  })

  if (!address) return <p>Please connect your wallet.</p>
  if (isLoading) return <p>Loading carrots…</p>
  return <p>You’ve harvested {count?.toString() ?? '0'} carrots!</p>
}