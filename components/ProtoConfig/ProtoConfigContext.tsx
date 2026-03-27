'use client'

import React, { createContext, useContext, useState, useCallback } from 'react'

interface ProtoConfigState {
  selectedFlow: string
  selectedSub: string
  /** Path to navigate to on "Start over". When undefined, the button is disabled. */
  startPath?: string
}

interface ProtoConfigContextValue extends ProtoConfigState {
  setSelectedFlow: (flow: string) => void
  setSelectedSub: (sub: string) => void
  setStartPath: (path: string | undefined) => void
  /** Resets all config to defaults. If startPath is set, navigates there. */
  resetConfig: () => void
}

const DEFAULTS: ProtoConfigState = {
  selectedFlow: 'flow-a',
  selectedSub: 'sub-1',
  startPath: undefined,
}

const ProtoConfigContext = createContext<ProtoConfigContextValue | null>(null)

export function ProtoConfigProvider({ children, startPath }: { children: React.ReactNode; startPath?: string }) {
  const [selectedFlow, setSelectedFlow] = useState(DEFAULTS.selectedFlow)
  const [selectedSub, setSelectedSub] = useState(DEFAULTS.selectedSub)
  const [currentStartPath, setStartPath] = useState(startPath)

  const resetConfig = useCallback(() => {
    setSelectedFlow(DEFAULTS.selectedFlow)
    setSelectedSub(DEFAULTS.selectedSub)
    if (currentStartPath) {
      window.location.href = currentStartPath
    }
  }, [currentStartPath])

  return (
    <ProtoConfigContext.Provider
      value={{
        selectedFlow,
        selectedSub,
        startPath: currentStartPath,
        setSelectedFlow,
        setSelectedSub,
        setStartPath,
        resetConfig,
      }}
    >
      {children}
    </ProtoConfigContext.Provider>
  )
}

export function useProtoConfig() {
  const ctx = useContext(ProtoConfigContext)
  if (!ctx) throw new Error('useProtoConfig must be used within ProtoConfigProvider')
  return ctx
}
