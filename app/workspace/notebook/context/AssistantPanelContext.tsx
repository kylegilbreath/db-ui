'use client'

import React, { createContext, useCallback, useRef, useContext, useState } from 'react'

type AssistantPanelHandler = () => void

interface AssistantPanelContextValue {
  openAssistantPanel: AssistantPanelHandler
  registerOpenAssistantPanel: (handler: AssistantPanelHandler | null) => void
  closeAssistantPanel: AssistantPanelHandler
  registerCloseAssistantPanel: (handler: AssistantPanelHandler | null) => void
  isAssistantPanelOpen: boolean
  setAssistantPanelOpen: (open: boolean) => void
}

const AssistantPanelContext = createContext<AssistantPanelContextValue | null>(null)

export function AssistantPanelProvider({ children }: { children: React.ReactNode }) {
  const openHandlerRef = useRef<AssistantPanelHandler | null>(null)
  const closeHandlerRef = useRef<AssistantPanelHandler | null>(null)
  const [isAssistantPanelOpen, setAssistantPanelOpen] = useState(false)

  const registerOpenAssistantPanel = useCallback((handler: AssistantPanelHandler | null) => {
    openHandlerRef.current = handler
  }, [])

  const registerCloseAssistantPanel = useCallback((handler: AssistantPanelHandler | null) => {
    closeHandlerRef.current = handler
  }, [])

  const openAssistantPanel = useCallback(() => {
    openHandlerRef.current?.()
  }, [])

  const closeAssistantPanel = useCallback(() => {
    closeHandlerRef.current?.()
  }, [])

  return (
    <AssistantPanelContext.Provider
      value={{
        openAssistantPanel,
        registerOpenAssistantPanel,
        closeAssistantPanel,
        registerCloseAssistantPanel,
        isAssistantPanelOpen,
        setAssistantPanelOpen,
      }}
    >
      {children}
    </AssistantPanelContext.Provider>
  )
}

export function useOpenAssistantPanel() {
  const ctx = useContext(AssistantPanelContext)
  return ctx?.openAssistantPanel ?? null
}

export function useIsAssistantPanelOpen() {
  const ctx = useContext(AssistantPanelContext)
  return ctx?.isAssistantPanelOpen ?? false
}

export function useRegisterAssistantPanel(openHandler: AssistantPanelHandler | null) {
  const ctx = useContext(AssistantPanelContext)
  React.useEffect(() => {
    ctx?.registerOpenAssistantPanel(openHandler)
    return () => ctx?.registerOpenAssistantPanel(null)
  }, [ctx, openHandler])
}

export function useCloseAssistantPanel() {
  const ctx = useContext(AssistantPanelContext)
  return ctx?.closeAssistantPanel ?? null
}

export function useRegisterCloseAssistantPanel(closeHandler: AssistantPanelHandler | null) {
  const ctx = useContext(AssistantPanelContext)
  React.useEffect(() => {
    ctx?.registerCloseAssistantPanel(closeHandler)
    return () => ctx?.registerCloseAssistantPanel(null)
  }, [ctx, closeHandler])
}

export function useSetAssistantPanelOpen() {
  const ctx = useContext(AssistantPanelContext)
  return ctx?.setAssistantPanelOpen ?? (() => {})
}
