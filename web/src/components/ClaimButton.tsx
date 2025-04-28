'use client'

import React, { useState } from 'react'
import { useAccount } from 'wagmi'

export function ClaimButton() {
  const { address } = useAccount()
  const [balance, setBalance] = useState<number>()
  const [error, setError] = useState<string>()
  const [isLoading, setIsLoading] = useState(false)

  const handleClaim = async () => {
    if (!address) return
    setIsLoading(true)
    setError(undefined)

    const res = await fetch('/api/claim', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId: address }),
    })
    const json = await res.json()
    setIsLoading(false)

    if (json.error) {
      setError(json.error)
    } else {
      setBalance(json.newBalance)
    }
  }

  return (
    <div className="space-y-2">
      <button
        onClick={handleClaim}
        disabled={isLoading}
        className="px-4 py-2 bg-purple-600 text-white rounded"
      >
        {isLoading ? 'Claiming…' : 'Claim Daily SEED'}
      </button>
      {balance != null && <p>Your new SEED balance: {balance}</p>}
      {error && <p className="text-red-500">{error}</p>}
    </div>
  )
}
