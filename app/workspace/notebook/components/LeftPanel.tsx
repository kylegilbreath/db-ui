'use client'

import React, { useState } from 'react'
import {
  useDesignSystemTheme,
  HomeIcon,
  RefreshIcon,
  SortAscendingIcon,
  OverflowIcon,
  CloseIcon,
  SlidersIcon,
} from '@databricks/design-system'
import { LeftSidebar } from './LeftSidebar'
import { TreeBrowser, type TreeNodeData } from '@/components/TreeBrowser'

const notebookTree: TreeNodeData[] = [
  { id: 'drafts', label: 'Drafts', type: 'draft', children: [] },
  { id: 'assistant', label: '.assistant', type: 'folder', children: [] },
  { id: 'avocado-flow', label: 'Avocado_Flow', type: 'pipeline', children: [] },
  { id: 'notebook-1', label: 'New Notebook 2026-02-22 21:02:35', type: 'notebook' },
  { id: 'sales-query', label: 'sales_query.sql', type: 'sql' },
  { id: 'rules-md', label: 'rules.md', type: 'file' },
  { id: 'avocado-dashboard', label: 'Avocado Dashboard', type: 'dashboard' },
]

interface LeftPanelProps {
  collapsed: boolean
  onCollapse: () => void
}

export function LeftPanel({
  collapsed,
  onCollapse,
}: LeftPanelProps) {
  const { theme } = useDesignSystemTheme()
  const [activeView, setActiveView] = useState<'files' | 'catalog' | 'outline'>('files')
  const [selectedNodeId, setSelectedNodeId] = useState('notebook-1')

  const handleViewChange = (view: 'files' | 'catalog' | 'outline') => {
    if (collapsed) {
      onCollapse()
    }
    setActiveView(view)
  }

  return (
    <>
      {/* Left Panel */}
      <div
        style={{
          flex: 1,
          backgroundColor: theme.colors.backgroundPrimary,
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        {/* Content Area - Row Layout */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            flex: 1,
            overflow: 'hidden',
          }}
        >
          {/* Left Sidebar Icons - Always Visible */}
          <LeftSidebar
            activeView={activeView}
            onViewChange={handleViewChange}
            onCollapse={onCollapse}
            collapsed={collapsed}
          />

          {/* Main Panel Content */}
          {!collapsed && (
            <div
              style={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                overflow: 'hidden',
                minWidth: 0,
              }}
            >
              {/* Content Area */}
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  flex: 1,
                  overflow: 'hidden',
                  padding: theme.spacing.sm,
                  gap: theme.spacing.xs,
                }}
              >
                {/* RootPath Section */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: theme.spacing.sm,
                    borderRadius: theme.borders.borderRadiusSm,
                    width: '100%',
                    flexShrink: 0,
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      flex: 1,
                      gap: theme.spacing.xs,
                      alignItems: 'center',
                      borderRadius: theme.borders.borderRadiusSm,
                      minWidth: 0,
                      overflow: 'hidden',
                    }}
                  >
                    <span
                      style={{
                        fontSize: theme.typography.fontSizeBase,
                        lineHeight: theme.typography.lineHeightBase,
                        color: theme.colors.textPrimary,
                        whiteSpace: 'nowrap',
                        flexShrink: 0,
                      }}
                    >
                      .../
                    </span>
                    <HomeIcon {...({} as any)} style={{ width: '16px', height: '16px', color: theme.colors.textSecondary, flexShrink: 0 }} />
                    <span
                      style={{
                        fontSize: theme.typography.fontSizeBase,
                        lineHeight: theme.typography.lineHeightBase,
                        color: theme.colors.textPrimary,
                        flex: 1,
                        minWidth: 0,
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                      }}
                    >
                      erin.yoo@databricks.com
                    </span>
                  </div>
                  <div
                    style={{
                      display: 'flex',
                      gap: theme.spacing.xs,
                      alignItems: 'center',
                      flexShrink: 0,
                    }}
                  >
                    <button
                      style={{
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        padding: theme.spacing.xs,
                        height: '24px',
                        width: '24px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: theme.borders.borderRadiusSm,
                        color: theme.colors.textSecondary,
                      }}
                    >
                      <RefreshIcon {...({} as any)} style={{ width: '16px', height: '16px' }} />
                    </button>
                    <button
                      style={{
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        padding: theme.spacing.xs,
                        height: '24px',
                        width: '24px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: theme.borders.borderRadiusSm,
                        color: theme.colors.textSecondary,
                      }}
                    >
                      <SortAscendingIcon {...({} as any)} style={{ width: '16px', height: '16px' }} />
                    </button>
                    <button
                      style={{
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        padding: theme.spacing.xs,
                        height: '24px',
                        width: '24px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: theme.borders.borderRadiusSm,
                        color: theme.colors.textSecondary,
                      }}
                    >
                      <OverflowIcon {...({} as any)} style={{ width: '16px', height: '16px' }} />
                    </button>
                    <button
                      style={{
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        padding: theme.spacing.xs,
                        height: '24px',
                        width: '24px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: theme.borders.borderRadiusSm,
                        color: theme.colors.textSecondary,
                      }}
                    >
                      <CloseIcon {...({} as any)} style={{ width: '16px', height: '16px' }} />
                    </button>
                  </div>
                </div>

                {/* Search Bar */}
                <div
                  style={{
                    display: 'flex',
                    height: '32px',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    backgroundColor: theme.colors.backgroundPrimary,
                    border: `1px solid ${theme.colors.border}`,
                    borderRadius: theme.borders.borderRadiusSm,
                    paddingLeft: theme.spacing.mid,
                    paddingRight: '0',
                    flexShrink: 0,
                    width: '100%',
                  }}
                >
                  <input
                    type="text"
                    placeholder="Search"
                    style={{
                      flex: 1,
                      border: 'none',
                      outline: 'none',
                      background: 'transparent',
                      fontSize: theme.typography.fontSizeBase,
                      lineHeight: theme.typography.lineHeightBase,
                      color: theme.colors.textPlaceholder,
                    }}
                  />
                  <button
                    style={{
                      borderLeft: `1px solid ${theme.colors.border}`,
                      background: 'none',
                      borderTop: 'none',
                      borderRight: 'none',
                      borderBottom: 'none',
                      cursor: 'pointer',
                      padding: theme.spacing.sm,
                      height: '32px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderTopRightRadius: theme.borders.borderRadiusSm,
                      borderBottomRightRadius: theme.borders.borderRadiusSm,
                      borderTopLeftRadius: 0,
                      borderBottomLeftRadius: 0,
                      color: theme.colors.textSecondary,
                    }}
                  >
                    <SlidersIcon {...({} as any)} style={{ width: '16px', height: '16px' }} />
                  </button>
                </div>

                {/* Tree Content */}
                <div
                  style={{
                    flex: 1,
                    overflow: 'auto',
                    width: '100%',
                  }}
                >
                  <TreeBrowser
                    nodes={notebookTree}
                    selectedId={selectedNodeId}
                    onSelect={setSelectedNodeId}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
