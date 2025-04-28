'use client'

import React from 'react'
import ClientOnly from '@/components/ClientOnly'
import ConnectWallet from '@/components/ConnectWallet'
import { HarvestStatus } from '@/components/HarvestStatus'
import { PlantButton } from '@/components/PlantButton'
import { WaterButton } from '@/components/WaterButton'
import { HarvestButton } from '@/components/HarvestButton'
import { ClaimButton } from '@/components/ClaimButton'
import { UpgradeButton } from '@/components/UpgradeButton'


export default function HomePage() {
  return (
    <main className="p-8 space-y-6">
      <ClientOnly>
        <ConnectWallet />
        <HarvestStatus />
        <PlantButton plotId={1} />
        <WaterButton plotId={1} />
        <HarvestButton plotId={1} />
        <ClaimButton />
        <UpgradeButton />
      </ClientOnly>

      <h1 className="text-3xl font-bold">🌱 Carrot Farm</h1>
    </main>
  )
}
