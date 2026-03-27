'use client'

import { useDesignSystemTheme } from '@databricks/design-system'
import { useState, useEffect } from 'react'
import { TreeBrowser, type TreeNodeData } from '@/components/TreeBrowser'
import { FileBrowser, fileBrowserData } from './components/FileBrowser'

const BREAKPOINT = 994

const sidebarTree: TreeNodeData[] = [
  {
    id: 'home',
    label: 'Home',
    type: 'home',
    children: [
      { id: 'home-drafts', label: 'Drafts', type: 'draft', children: [] },
      { id: 'home-assistant', label: '.assistant', type: 'folder', children: [] },
      { id: 'home-avocado-flow', label: 'Avocado_Flow', type: 'pipeline', children: [] },
      { id: 'home-avocado-sales', label: 'Avocado Sales Analysis', type: 'notebook' },
      { id: 'home-sales-query', label: 'sales_query.sql', type: 'sql' },
      { id: 'home-rules-md', label: 'rules.md', type: 'file' },
      { id: 'home-avocado-dashboard', label: 'Avocado Dashboard', type: 'dashboard' },
    ],
  },
  {
    id: 'shared',
    label: 'Shared with me',
    type: 'shared',
  },
  {
    id: 'workspace-folder',
    label: 'Workspace',
    type: 'folder',
    children: [
      {
        id: 'projects',
        label: 'Projects',
        type: 'folder',
        children: [
          { id: 'proj-analytics', label: 'analytics-pipeline', type: 'folder', children: [] },
          { id: 'proj-ml', label: 'ml-experiments', type: 'folder', children: [] },
          { id: 'proj-etl', label: 'etl-jobs', type: 'folder', children: [] },
        ],
      },
      {
        id: 'repos',
        label: 'Repos',
        type: 'git',
        children: [
          { id: 'repo-main', label: 'databricks-main', type: 'git', children: [] },
          { id: 'repo-utils', label: 'shared-utils', type: 'git', children: [] },
          { id: 'repo-notebooks', label: 'notebook-templates', type: 'git', children: [] },
        ],
      },
      {
        id: 'shared-content',
        label: 'Shared',
        type: 'shared-folder',
        children: [
          { id: 'shared-reports', label: 'Quarterly Reports', type: 'folder', children: [] },
          { id: 'shared-dashboards', label: 'Team Dashboards', type: 'folder', children: [] },
          { id: 'shared-templates', label: 'Templates', type: 'folder', children: [] },
        ],
      },
      {
        id: 'users',
        label: 'Users',
        type: 'users',
        children: [
          {
            id: 'user-erin',
            label: 'erin.yoo@databricks.com',
            type: 'user-home',
            children: [
              { id: 'drafts', label: 'Drafts', type: 'draft', children: [] },
              { id: 'assistant', label: '.assistant', type: 'folder', children: [] },
              { id: 'avocado-flow', label: 'Avocado_Flow', type: 'pipeline', children: [] },
              { id: 'avocado-sales', label: 'Avocado Sales Analysis', type: 'notebook' },
              { id: 'sales-query', label: 'sales_query.sql', type: 'sql' },
              { id: 'rules-md', label: 'rules.md', type: 'file' },
              { id: 'avocado-dashboard', label: 'Avocado Dashboard', type: 'dashboard' },
            ],
          },
          { id: 'user-aguo', label: 'a.guo@databricks.com', type: 'folder', children: [] },
          { id: 'user-azhang', label: 'a.zhang@databricks.com', type: 'folder', children: [] },
          { id: 'user-016bb', label: '016bb42e-a3e0-4a9a-...', type: 'folder', children: [] },
        ],
      },
    ],
  },
  {
    id: 'favorites',
    label: 'Favorites',
    type: 'favorites',
  },
  {
    id: 'trash',
    label: 'Trash',
    type: 'trash',
  },
]

export default function WorkspacePage() {
  const { theme } = useDesignSystemTheme()
  const [isNarrow, setIsNarrow] = useState(false)
  const [selectedId, setSelectedId] = useState('workspace-folder')

  useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${BREAKPOINT}px)`)
    setIsNarrow(mq.matches)
    const handler = (e: MediaQueryListEvent) => setIsNarrow(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  const browserData = fileBrowserData[selectedId]

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: isNarrow ? 'column' : 'row',
        height: '100%',
        overflow: 'hidden',
      }}
    >
      {/* Workspace Sidebar */}
      <div
        style={{
          width: isNarrow ? '100%' : '250px',
          minWidth: isNarrow ? undefined : '250px',
          flexShrink: 0,
          borderRight: isNarrow ? 'none' : `1px solid ${theme.colors.border}`,
          borderBottom: isNarrow ? `1px solid ${theme.colors.border}` : 'none',
          padding: theme.spacing.sm,
          display: 'flex',
          flexDirection: 'column',
          overflow: 'auto',
        }}
      >
        <h2
          style={{
            fontSize: theme.typography.fontSizeMd,
            fontWeight: theme.typography.typographyBoldFontWeight,
            color: theme.colors.textPrimary,
            margin: 0,
            marginBottom: theme.spacing.sm,
          }}
        >
          Workspace
        </h2>

        <TreeBrowser
          nodes={sidebarTree}
          selectedId={selectedId}
          foldersOnly
          onSelect={setSelectedId}
        />
      </div>

      {/* File Browser */}
      <div
        style={{
          flex: 1,
          minWidth: 0,
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
        }}
      >
        {browserData ? (
          <FileBrowser
            breadcrumbs={browserData.breadcrumbs}
            title={browserData.title}
            entries={browserData.entries}
          />
        ) : (
          <div
            style={{
              flex: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: theme.colors.textSecondary,
              fontSize: theme.typography.fontSizeBase,
            }}
          >
            Select a folder to view its contents
          </div>
        )}
      </div>
    </div>
  )
}
