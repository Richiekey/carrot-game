'use client'

// web/src/lib/wagmiClient.tsx
import React from 'react'
import { createConfig, http, WagmiProvider } from 'wagmi'
import { injected }    from 'wagmi/connectors'
import { defineChain } from 'viem'

// 1️⃣ Your custom chain definition
export const megaEthChain = defineChain({
  id: 6342,
  name: 'MegaETH',
  network: 'megaeth',
  nativeCurrency: { name: 'MegaETH', symbol: 'ETH', decimals: 18 },
  rpcUrls: { default: { http: ['https://carrot.megaeth.com/rpc'] } },
} as const)

// 2️⃣ Build the Wagmi config
export const wagmiConfig = createConfig({
  // v2 has built-in multichain support—no configureChains needed :contentReference[oaicite:0]{index=0}
  chains: [megaEthChain],
  transports: {
    [megaEthChain.id]: http('https://carrot.megaeth.com/rpc'),
  },
  connectors: [
    // shimDisconnect goes straight in here :contentReference[oaicite:1]{index=1}
    injected({ shimDisconnect: true }),
  ],
  // autoConnect / reconnectOnMount belongs on the provider, not here
})

// 3️⃣ Wrap your app in WagmiProvider
export function WagmiClientProvider({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    // reconnectOnMount here controls whether to re‑connect on mount
    <WagmiProvider config={wagmiConfig} reconnectOnMount>
      {children}
    </WagmiProvider>
  )
}