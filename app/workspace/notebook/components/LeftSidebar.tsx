'use client'

import React from 'react'
import {
  useDesignSystemTheme,
  FolderIcon,
  ListBorderIcon,
  DataIcon,
} from '@databricks/design-system'
import { SidebarIconButton } from './SidebarIconButton'

interface LeftSidebarProps {
  activeView?: 'files' | 'catalog' | 'outline'
  onViewChange?: (view: 'files' | 'catalog' | 'outline') => void
  onCollapse?: () => void
  collapsed?: boolean
}

export function LeftSidebar({ activeView = 'files', onViewChange, onCollapse, collapsed = false }: LeftSidebarProps) {
  const { theme } = useDesignSystemTheme()

  return (
    <div
      style={{
        width: '40px',
        backgroundColor: theme.colors.backgroundPrimary,
        borderRight: `1px solid ${theme.colors.border}`,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: theme.spacing.xs,
        gap: theme.spacing.xs,
        flexShrink: 0,
      }}
    >
      {/* Outline */}
      <SidebarIconButton
        icon={ListBorderIcon}
        componentId="workspace-outline-view"
        isActive={activeView === 'outline' && !collapsed}
        tooltip="Outline"
        onClick={() => {
          if (collapsed) {
            // If collapsed, expand and set view
            onViewChange?.('outline')
          } else if (activeView === 'outline') {
            // If already active, collapse
            onCollapse?.()
          } else {
            // Switch to this view
            onViewChange?.('outline')
          }
        }}
      />

      {/* Files */}
      <SidebarIconButton
        icon={FolderIcon}
        componentId="workspace-files-view"
        isActive={activeView === 'files' && !collapsed}
        tooltip="Files"
        onClick={() => {
          if (collapsed) {
            // If collapsed, expand and set view
            onViewChange?.('files')
          } else if (activeView === 'files') {
            // If already active, collapse
            onCollapse?.()
          } else {
            // Switch to this view
            onViewChange?.('files')
          }
        }}
      />

      {/* Catalog */}
      <SidebarIconButton
        icon={DataIcon}
        componentId="workspace-catalog-view"
        isActive={activeView === 'catalog' && !collapsed}
        tooltip="Catalog"
        onClick={() => {
          if (collapsed) {
            // If collapsed, expand and set view
            onViewChange?.('catalog')
          } else if (activeView === 'catalog') {
            // If already active, collapse
            onCollapse?.()
          } else {
            // Switch to this view
            onViewChange?.('catalog')
          }
        }}
      />
    </div>
  )
}
