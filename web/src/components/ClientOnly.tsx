'use client'

import { ReactNode, useState, useEffect } from 'react'

export default function ClientOnly({ children }: { children: ReactNode }) {
  const [mounted, setMounted] = useState(false)
  useEffect(() => {
    setMounted(true)
  }, [])
  return mounted ? <>{children}</> : null
}
