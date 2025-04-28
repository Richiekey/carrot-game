'use client'

import React from 'react'
import {
  useConnect,
  useAccount,
  type Connector,
  type CreateConnectorFn,
} from 'wagmi'

// Narrow the union to real Connector objects
function isConnector(x: CreateConnectorFn | Connector): x is Connector {
  return typeof (x as Connector).id === 'string'
}

export default function ConnectWallet() {
  const { connect, connectors, error, isPending, variables } = useConnect()
  const { address, isConnected } = useAccount()

  if (isConnected) {
    return <p className="px-4 py-2">Connected: {address}</p>
  }

  const validConnectors = connectors.filter(isConnector)

  return (
    <div className="flex flex-col space-y-2">
      {validConnectors.map((connector) => {
        // Only disable while this connector is connecting
        const pendingThis =
          isPending &&
          variables?.connector &&
          isConnector(variables.connector) &&
          variables.connector.id === connector.id

        return (
          <button
            key={connector.id}
            onClick={() => connect({ connector })}
            disabled={pendingThis}
            className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50"
          >
            {pendingThis
              ? 'Connecting…'
              : `Connect with ${connector.name}`}
          </button>
        )
      })}

      {error && <p className="text-red-500">{error.message}</p>}
    </div>
  )
}
