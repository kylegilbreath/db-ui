/**
 * RightPanel – Notebook right-hand panel that shows different views (Comments, Experiments,
 * History, Variables, Environment, Info, Genie Code). Renders a header with view title and
 * actions (New, History, More, Close), the active view's content, and RightSidebar for
 * switching views. The "New" button resets the Genie Code assistant to its empty state.
 */
'use client'

import React from 'react'
import {
  useDesignSystemTheme,
  CloseIcon,
  PlusIcon,
  HistoryIcon,
  OverflowIcon,
} from '@databricks/design-system'
import { RightSidebar } from './RightSidebar'
import { GenieCodeChatPanel } from './GenieCodeChatPanel'

export type RightView = 'comments' | 'experiments' | 'history' | 'variables' | 'environment' | 'info' | 'assistant' | 'null'

// ─── Single place to update the entire panel ─────────────────────────────────
// Edit labels and content here to change headers and body for each view.

/** Panel header title for each view */
export const RIGHT_VIEW_LABELS: Record<RightView, string> = {
  comments: 'Comments',
  experiments: 'Experiments',
  history: 'History',
  variables: 'Variables',
  environment: 'Environment',
  info: 'Info',
  assistant: 'Genie Code',
  null: 'Hide',
}

/** Body content for each view. Replace with full JSX/components to redesign the panel. */
export function getRightPanelContent(
  view: RightView,
  theme: ReturnType<typeof useDesignSystemTheme>['theme'],
  options?: { assistantPanelKey?: number }
): React.ReactNode {
  const label = RIGHT_VIEW_LABELS[view]
  const placeholder = (
    <p style={{ color: theme.colors.textSecondary, fontSize: theme.typography.fontSizeBase }}>{label} content will appear here</p>
  )
  const placeholders: Record<RightView, React.ReactNode> = {
    comments: placeholder,
    experiments: placeholder,
    history: placeholder,
    variables: placeholder,
    environment: placeholder,
    info: placeholder,
    assistant: <GenieCodeChatPanel key={options?.assistantPanelKey ?? 0} />,
    null: null,
  }
  return placeholders[view]
}

// ─── RightPanel layout (header + body + sidebar) ─────────────────────────────

interface RightPanelProps {
  collapsed: boolean
  onCollapse: () => void
  activeView: RightView
  onViewChange: (view: RightView) => void
}

export function RightPanel({
  collapsed,
  onCollapse,
  activeView,
  onViewChange,
}: RightPanelProps) {
  const { theme } = useDesignSystemTheme()
  const [assistantPanelKey, setAssistantPanelKey] = React.useState(0)

  const handleNewClick = () => {
    if (activeView === 'assistant') {
      setAssistantPanelKey((k) => k + 1)
    }
  }

  const handleViewChange = (view: RightView) => {
    if (collapsed) {
      onCollapse()
    }
    onViewChange(view)
  }

  const panelContent = getRightPanelContent(activeView, theme, { assistantPanelKey })

  return (
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
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          flex: 1,
          overflow: 'hidden',
        }}
      >
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
            {/* Panel header – matches Figma: title left, 4 action icons right (Plus, History, More, Close) */}
            <div
              style={{
                padding: '12px 16px',
                borderBottom: `1px solid ${theme.colors.border ?? 'rgb(235, 235, 235)'}`,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexShrink: 0,
                backgroundColor: theme.colors.backgroundPrimary ?? '#ffffff',
              }}
            >
              <h3
                style={{
                  fontSize: theme.typography?.fontSizeBase ?? 13,
                  fontWeight: theme.typography?.typographyBoldFontWeight ?? 600,
                  color: theme.colors.textPrimary ?? 'rgb(22, 22, 22)',
                  margin: 0,
                }}
              >
                {RIGHT_VIEW_LABELS[activeView]}
              </h3>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <button
                  type="button"
                  onClick={handleNewClick}
                  style={{
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    padding: '4px',
                    color: theme.colors.textSecondary ?? 'rgb(111, 111, 111)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                  aria-label="New"
                >
                  <PlusIcon {...({} as any)} style={{ width: '16px', height: '16px' }} />
                </button>
                <button
                  type="button"
                  onClick={() => {}}
                  style={{
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    padding: '4px',
                    color: theme.colors.textSecondary ?? 'rgb(111, 111, 111)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                  aria-label="History"
                >
                  <HistoryIcon {...({} as any)} style={{ width: '16px', height: '16px' }} />
                </button>
                <button
                  type="button"
                  onClick={() => {}}
                  style={{
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    padding: '4px',
                    color: theme.colors.textSecondary ?? 'rgb(111, 111, 111)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                  aria-label="More options"
                >
                  <OverflowIcon {...({} as any)} style={{ width: '16px', height: '16px' }} />
                </button>
                <button
                  type="button"
                  onClick={onCollapse}
                  style={{
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    padding: '4px',
                    color: theme.colors.textSecondary ?? 'rgb(111, 111, 111)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                  aria-label="Close panel"
                >
                  <CloseIcon {...({} as any)} style={{ width: '16px', height: '16px' }} />
                </button>
              </div>
            </div>

            <div
              style={{
                flex: 1,
                overflow: 'hidden',
                padding: '16px',
                display: 'flex',
                flexDirection: 'column',
                minHeight: 0,
              }}
            >
              {activeView === 'assistant' ? (
                panelContent
              ) : (
                <div style={{ flex: 1, overflow: 'auto' }}>{panelContent}</div>
              )}
            </div>
          </div>
        )}

        <RightSidebar
          activeView={activeView}
          onViewChange={handleViewChange}
          onCollapse={onCollapse}
          collapsed={collapsed}
        />
      </div>
    </div>
  )
}
