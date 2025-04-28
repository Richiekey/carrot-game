'use client'

import { ReactNode } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { WagmiClientProvider } from '@/lib/wagmiClient'

const queryClient = new QueryClient()

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <QueryClientProvider client={queryClient}>
          <WagmiClientProvider>
            {children}
          </WagmiClientProvider>
        </QueryClientProvider>
      </body>
    </html>
  )
}
