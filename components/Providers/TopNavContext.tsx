'use client'

import { createContext, useContext, useState } from 'react'

interface TopNavContextValue {
  topNavCollapsed: boolean
  toggleTopNav: () => void
}

const TopNavContext = createContext<TopNavContextValue>({
  topNavCollapsed: false,
  toggleTopNav: () => {},
})

export function TopNavProvider({ children }: { children: React.ReactNode }) {
  const [topNavCollapsed, setTopNavCollapsed] = useState(false)

  return (
    <TopNavContext.Provider value={{ topNavCollapsed, toggleTopNav: () => setTopNavCollapsed((v) => !v) }}>
      {children}
    </TopNavContext.Provider>
  )
}

export function useTopNav() {
  return useContext(TopNavContext)
}
