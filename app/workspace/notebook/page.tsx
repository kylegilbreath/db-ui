'use client'

import React, { useState, useRef, useCallback, useEffect } from 'react'
import { useDesignSystemTheme } from '@databricks/design-system'
import { useTopNav } from '@/components/Providers/TopNavContext'
import { LeftPanel } from './components/LeftPanel'
import { LeftHeader } from './components/LeftHeader'
import { RightPanel, type RightView } from './components/RightPanel'
import { Cell } from './components/Cell'
import { NotebookNav } from './components/NotebookNav'
import { WorkspaceTabs } from './components/WorkspaceTabs'
import { useRegisterAssistantPanel, useRegisterCloseAssistantPanel, useSetAssistantPanelOpen } from './context/AssistantPanelContext'

export default function NotebookPage() {
  const { theme } = useDesignSystemTheme()
  const [leftPanelWidth, setLeftPanelWidth] = useState(240)
  // Default to max width (400px); use a large value so CSS maxWidth applies
  const [rightPanelWidth, setRightPanelWidth] = useState(9999)
  const [leftPanelCollapsed, setLeftPanelCollapsed] = useState(false)
  const [rightPanelCollapsed, setRightPanelCollapsed] = useState(true)
  const { topNavCollapsed, toggleTopNav } = useTopNav()
  const [rightPanelView, setRightPanelView] = useState<RightView>('variables')
  const [focusedCellId, setFocusedCellId] = useState<string | null>(null)

  const openAssistantPanel = useCallback(() => {
    setRightPanelCollapsed(false)
    setRightPanelView('assistant')
  }, [])
  const closeAssistantPanel = useCallback(() => {
    setRightPanelCollapsed(true)
  }, [])
  useRegisterAssistantPanel(openAssistantPanel)
  useRegisterCloseAssistantPanel(closeAssistantPanel)

  const setAssistantPanelOpen = useSetAssistantPanelOpen()
  useEffect(() => {
    setAssistantPanelOpen(!rightPanelCollapsed && rightPanelView === 'assistant')
  }, [rightPanelCollapsed, rightPanelView, setAssistantPanelOpen])

  const [isResizingLeft, setIsResizingLeft] = useState(false)
  const [isResizingRight, setIsResizingRight] = useState(false)

  const containerRef = useRef<HTMLDivElement>(null)
  const mainContentRef = useRef<HTMLDivElement>(null)
  const leftResizeRef = useRef<HTMLDivElement>(null)
  const rightResizeRef = useRef<HTMLDivElement>(null)

  const handleMouseDownLeft = useCallback((e: React.MouseEvent) => {
    e.preventDefault()
    setIsResizingLeft(true)
  }, [])

  const handleMouseDownRight = useCallback((e: React.MouseEvent) => {
    e.preventDefault()
    setIsResizingRight(true)
  }, [])

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!containerRef.current) return

    const containerRect = containerRef.current.getBoundingClientRect()

    if (isResizingLeft) {
      // Calculate width from the left edge of the container
      const newWidth = e.clientX - containerRect.left
      const minWidth = 200
      const maxWidth = containerRect.width * 0.4
      if (newWidth >= minWidth && newWidth <= maxWidth) {
        setLeftPanelWidth(newWidth)
      } else if (newWidth < minWidth) {
        setLeftPanelWidth(minWidth)
      } else if (newWidth > maxWidth) {
        setLeftPanelWidth(maxWidth)
      }
    }

    if (isResizingRight) {
      // Calculate width from the right edge of the container
      const newWidth = containerRect.right - e.clientX
      const minWidth = 200
      const maxWidth = 400
      if (newWidth >= minWidth && newWidth <= maxWidth) {
        setRightPanelWidth(newWidth)
      } else if (newWidth < minWidth) {
        setRightPanelWidth(minWidth)
      } else if (newWidth > maxWidth) {
        setRightPanelWidth(maxWidth)
      }
    }
  }, [isResizingLeft, isResizingRight])

  const handleMouseUp = useCallback(() => {
    setIsResizingLeft(false)
    setIsResizingRight(false)
  }, [])

  // Add event listeners for mouse move and up
  useEffect(() => {
    if (isResizingLeft || isResizingRight) {
      document.addEventListener('mousemove', handleMouseMove)
      document.addEventListener('mouseup', handleMouseUp)
      return () => {
        document.removeEventListener('mousemove', handleMouseMove)
        document.removeEventListener('mouseup', handleMouseUp)
      }
    }
  }, [isResizingLeft, isResizingRight, handleMouseMove, handleMouseUp])

  return (
    <div
      ref={containerRef}
      style={{
        display: 'flex',
        height: '100%',
        width: '100%',
        overflow: 'hidden',
        backgroundColor: theme.colors.backgroundPrimary || '#ffffff',
      }}
    >
      {/* Left Section - Header + Panel */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          width: leftPanelCollapsed ? '40px' : leftPanelWidth,
          minWidth: leftPanelCollapsed ? '40px' : '298px',
          maxWidth: leftPanelCollapsed ? '40px' : '40%',
          transition: isResizingLeft ? 'none' : 'width 0.3s ease',
          borderRight: `1px solid ${theme.colors.border}`,
          flexShrink: 0,
        }}
      >
        <LeftHeader
          collapsed={leftPanelCollapsed}
          onCollapse={() => setLeftPanelCollapsed(!leftPanelCollapsed)}
        />
        <LeftPanel
          collapsed={leftPanelCollapsed}
          onCollapse={() => setLeftPanelCollapsed(!leftPanelCollapsed)}
        />
      </div>

      {/* Left Resize Handle */}
      {!leftPanelCollapsed && (
        <div
          ref={leftResizeRef}
          onMouseDown={handleMouseDownLeft}
          style={{
            width: '4px',
            minWidth: '4px',
            cursor: 'col-resize',
            backgroundColor: isResizingLeft ? theme.colors.actionDefaultBorderFocus : 'transparent',
            transition: 'background-color 0.2s',
            flexShrink: 0,
            position: 'relative',
            zIndex: 10,
          }}
          onMouseEnter={(e) => {
            if (!isResizingLeft) {
              e.currentTarget.style.backgroundColor = theme.colors.actionDefaultBackgroundHover ?? 'rgba(0,0,0,0.06)'
            }
          }}
          onMouseLeave={(e) => {
            if (!isResizingLeft) {
              e.currentTarget.style.backgroundColor = 'transparent'
            }
          }}
        />
      )}

      {/* Main Content */}
      <div
        ref={mainContentRef}
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          minWidth: 0,
        }}
      >
        {/* Workspace Tabs */}
        <WorkspaceTabs />

        {/* Notebook Navigation */}
        <NotebookNav containerRef={mainContentRef} />

        {/* Notebook Cells */}
        <div
          style={{
            flex: 1,
            overflow: 'auto',
            paddingTop: theme.spacing.md,
            paddingLeft: theme.spacing.xs,
            paddingRight: theme.spacing.xl,
            backgroundColor: theme.colors.backgroundPrimary || '#ffffff',
          }}
        >
          <Cell
            id="cell-1"
            isFocused={focusedCellId === 'cell-1'}
            onFocus={() => setFocusedCellId('cell-1')}
            cellType="Python"
          />
          <Cell
            id="cell-2"
            isFocused={focusedCellId === 'cell-2'}
            onFocus={() => setFocusedCellId('cell-2')}
            cellType="Python"
          />
        </div>
      </div>

      {/* Right Resize Handle - same pattern as left for resizable right panel */}
      {!rightPanelCollapsed && (
        <div
          ref={rightResizeRef}
          onMouseDown={handleMouseDownRight}
          style={{
            width: '4px',
            minWidth: '4px',
            cursor: 'col-resize',
            backgroundColor: isResizingRight ? theme.colors.actionDefaultBorderFocus : 'transparent',
            transition: 'background-color 0.2s',
            flexShrink: 0,
            position: 'relative',
            zIndex: 10,
          }}
          onMouseEnter={(e) => {
            if (!isResizingRight) {
              e.currentTarget.style.backgroundColor = theme.colors.actionDefaultBackgroundHover ?? 'rgba(0,0,0,0.06)'
            }
          }}
          onMouseLeave={(e) => {
            if (!isResizingRight) {
              e.currentTarget.style.backgroundColor = 'transparent'
            }
          }}
        />
      )}

      {/* Right Section - resizable like left panel via rightPanelWidth */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          width: rightPanelCollapsed ? '40px' : rightPanelWidth,
          minWidth: rightPanelCollapsed ? '40px' : '200px',
          maxWidth: rightPanelCollapsed ? '40px' : '400px',
          transition: isResizingRight ? 'none' : 'width 0.3s ease',
          borderLeft: `1px solid ${theme.colors.border}`,
          flexShrink: 0,
        }}
      >
        <RightPanel
          collapsed={rightPanelCollapsed}
          onCollapse={() => setRightPanelCollapsed(!rightPanelCollapsed)}
          activeView={rightPanelView}
          onViewChange={setRightPanelView}
        />
      </div>
    </div>
  )
}
