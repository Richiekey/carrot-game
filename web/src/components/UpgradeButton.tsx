'use client'

import React, { useState } from 'react'
import { useAccount } from 'wagmi'

export function UpgradeButton() {
  const { address } = useAccount()
  const [level, setLevel] = useState<number>()
  const [error, setError] = useState<string>()
  const [isLoading, setIsLoading] = useState(false)

  const handleUpgrade = async () => {
    if (!address) return
    setIsLoading(true)
    setError(undefined)

    const res = await fetch('/api/upgrade', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId: address }),
    })
    const json = await res.json()
    setIsLoading(false)

    if (json.error) {
      setError(json.error)
    } else {
      setLevel(json.newLevel)
    }
  }

  return (
    <div className="space-y-2">
      <button
        onClick={handleUpgrade}
        disabled={isLoading}
        className="px-4 py-2 bg-yellow-600 text-white rounded"
      >
        {isLoading ? 'Upgrading…' : 'Upgrade Farm'}
      </button>
      {level != null && <p>Your farm is now level {level}</p>}
      {error && <p className="text-red-500">{error}</p>}
    </div>
  )
}
