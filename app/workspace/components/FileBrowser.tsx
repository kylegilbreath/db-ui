'use client'

import { useRouter } from 'next/navigation'
import {
  useDesignSystemTheme,
  SearchIcon,
  FolderFillIcon,
  FolderBranchFillIcon,
  NotebookIcon,
  FileCodeIcon,
  DashboardIcon,
  QueryIcon,
  OfficeIcon,
  UserGroupIcon,
  StarIcon,
  OverflowIcon,
  Button,
  SpeechBubbleIcon,
  ChevronDownIcon,
  Breadcrumb,
  Input,
} from '@databricks/design-system'

interface FileEntry {
  name: string
  type: string
  icon: any
  iconColor?: string
  href?: string
  owner: string
  createdAt: string
  lastUpdatedAt: string
}

interface FileBrowserProps {
  breadcrumbs: string[]
  title: string
  entries: FileEntry[]
}

// Mock data per selected node
const workspaceEntries: FileEntry[] = [
  { name: 'Projects', type: 'Folder', icon: FolderFillIcon, iconColor: 'blue400', owner: 'Unknown', createdAt: '-', lastUpdatedAt: '-' },
  { name: 'Repos', type: 'Folder', icon: FolderBranchFillIcon, iconColor: 'blue400', owner: 'Unknown', createdAt: '-', lastUpdatedAt: '-' },
  { name: 'Shared', type: 'Folder', icon: OfficeIcon, owner: 'Unknown', createdAt: '-', lastUpdatedAt: '-' },
  { name: 'Users', type: 'Folder', icon: UserGroupIcon, owner: 'Unknown', createdAt: '-', lastUpdatedAt: '-' },
]

const usersEntries: FileEntry[] = [
  { name: 'erin.yoo@databricks.com', type: 'Folder', icon: FolderFillIcon, iconColor: 'blue400', owner: 'Erin Yoo', createdAt: '-', lastUpdatedAt: '-' },
  { name: 'a.guo@databricks.com', type: 'Folder', icon: FolderFillIcon, iconColor: 'blue400', owner: 'a.guo@dat...', createdAt: '-', lastUpdatedAt: '-' },
  { name: 'a.zhang@databricks.com', type: 'Folder', icon: FolderFillIcon, iconColor: 'blue400', owner: 'a.zhang@dat...', createdAt: '-', lastUpdatedAt: '-' },
  { name: '016bb42e-a3e0-4a9a-...', type: 'Folder', icon: FolderFillIcon, iconColor: 'blue400', owner: 'Unknown', createdAt: '-', lastUpdatedAt: '-' },
]

const erinEntries: FileEntry[] = [
  { name: 'Drafts', type: 'Folder', icon: FolderFillIcon, iconColor: 'grey200', owner: 'Erin Yoo', createdAt: 'Dec 11, 2025, 1...', lastUpdatedAt: 'Dec 11, 2025, 11:57 AM' },
  { name: '.assistant', type: 'Folder', icon: FolderFillIcon, iconColor: 'blue400', owner: 'Erin Yoo', createdAt: 'Jan 29, 2026, 1...', lastUpdatedAt: 'Jan 29, 2026, 11:07 AM' },
  { name: 'Avocado_Flow', type: 'Folder', icon: FolderBranchFillIcon, iconColor: 'blue400', owner: 'Erin Yoo', createdAt: 'Mar 16, 2026, 0...', lastUpdatedAt: 'Mar 16, 2026, 03:59 PM' },
  { name: 'Avocado Sales Analysis', type: 'Notebook', icon: NotebookIcon, href: '/workspace/notebook', owner: 'Erin Yoo', createdAt: 'Jan 20, 2026, 0...', lastUpdatedAt: 'Mar 16, 2026, 05:22 PM' },
  { name: 'sales_query.sql', type: 'Query', icon: QueryIcon, owner: 'Erin Yoo', createdAt: 'Feb 26, 2026, 0...', lastUpdatedAt: 'Mar 02, 2026, 10:40 AM' },
  { name: 'rules.md', type: 'File', icon: FileCodeIcon, owner: 'Erin Yoo', createdAt: 'Jan 29, 2026, 1...', lastUpdatedAt: 'Feb 22, 2026, 02:35 PM' },
  { name: 'Avocado Dashboard', type: 'Dashboard', icon: DashboardIcon, owner: 'Erin Yoo', createdAt: 'Jan 05, 2026, 0...', lastUpdatedAt: 'Feb 25, 2026, 05:06 PM' },
]

export const fileBrowserData: Record<string, { breadcrumbs: string[]; title: string; entries: FileEntry[] }> = {
  'workspace-folder': { breadcrumbs: [], title: 'Workspace', entries: workspaceEntries },
  'home': { breadcrumbs: ['Workspace', 'Users'], title: 'erin.yoo@databricks.com', entries: erinEntries },
  'users': { breadcrumbs: ['Workspace', 'Users'], title: 'Users', entries: usersEntries },
  'user-erin': { breadcrumbs: ['Workspace', 'Users'], title: 'erin.yoo@databricks.com', entries: erinEntries },
}

export function FileBrowser({ breadcrumbs, title, entries }: FileBrowserProps) {
  const { theme } = useDesignSystemTheme()
  const router = useRouter()

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      {/* Header */}
      <div
        style={{
          padding: `${theme.spacing.sm}px ${theme.spacing.md}px`,
          display: 'flex',
          flexDirection: 'column',
          gap: theme.spacing.md,
          flexShrink: 0,
        }}
      >
        {/* Breadcrumbs + Actions row */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: theme.spacing.xs }}>
            {/* Breadcrumbs */}
            {breadcrumbs.length > 0 && (
              <Breadcrumb includeTrailingCaret>
                {breadcrumbs.map((crumb, i) => (
                  <Breadcrumb.Item key={i}>
                    <a href="#">{crumb}</a>
                  </Breadcrumb.Item>
                ))}
              </Breadcrumb>
            )}

            {/* Title */}
            <div style={{ display: 'flex', alignItems: 'center', gap: theme.spacing.sm }}>
              <h1
                style={{
                  fontSize: theme.typography.fontSizeXl,
                  lineHeight: theme.typography.lineHeightXl,
                  letterSpacing: theme.typography.letterSpacingMd,
                  fontWeight: theme.typography.fontWeightExtraBold,
                  color: theme.colors.textPrimary,
                  margin: 0,
                }}
              >
                {title}
              </h1>
              <StarIcon {...({} as any)} style={{ width: '16px', height: '16px', color: theme.colors.textSecondary, cursor: 'pointer' }} />
            </div>
          </div>

          {/* Action buttons */}
          <div style={{ display: 'flex', gap: theme.spacing.sm, alignItems: 'center' }}>
            <Button type="link" componentId="fb-feedback" icon={<SpeechBubbleIcon {...({} as any)} />}>
              Send feedback
            </Button>
            <Button type="tertiary" componentId="fb-overflow" icon={<OverflowIcon {...({} as any)} />} />
            <Button type="secondary" componentId="fb-share">Share</Button>
            <Button type="primary" componentId="fb-create" endIcon={<ChevronDownIcon {...({} as any)} />}>Create</Button>
          </div>
        </div>

        {/* Filter bar */}
        <div style={{ display: 'flex', gap: theme.spacing.sm, alignItems: 'center', flexWrap: 'wrap' }}>
          <div style={{ flex: 1, maxWidth: '300px' }}>
            <Input
              prefix={<SearchIcon {...({} as any)} />}
              placeholder="Search"
              componentId="fb-search"
            />
          </div>
          {['Type', 'Owner', 'Last modified'].map((filter) => (
            <Button key={filter} type="secondary" componentId={`fb-filter-${filter}`}>
              {filter} <ChevronDownIcon {...({} as any)} />
            </Button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div style={{ flex: 1, overflow: 'auto', padding: `0 ${theme.spacing.lg}px` }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr
              style={{
                borderBottom: `1px solid ${theme.colors.border}`,
                position: 'sticky',
                top: 0,
                backgroundColor: theme.colors.backgroundPrimary,
              }}
            >
              {['Name', 'Type', 'Owner', 'Created at', 'Last updated at'].map((col) => (
                <th
                  key={col}
                  style={{
                    textAlign: 'left',
                    padding: `${theme.spacing.sm}px ${theme.spacing.sm}px`,
                    fontSize: theme.typography.fontSizeBase,
                    fontWeight: theme.typography.typographyBoldFontWeight,
                    color: theme.colors.textPrimary,
                    whiteSpace: 'nowrap',
                  }}
                >
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {entries.map((entry, i) => {
              const iconColor = entry.iconColor
                ? (theme.colors as any)[entry.iconColor] ?? theme.colors.textSecondary
                : theme.colors.textSecondary
              const Icon = entry.icon

              return (
                <tr
                  key={i}
                  style={{
                    borderBottom: `1px solid ${theme.colors.border}`,
                    cursor: 'pointer',
                  }}
                  onClick={() => entry.href && router.push(entry.href)}
                  onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = theme.colors.actionDefaultBackgroundHover }}
                  onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent' }}
                >
                  <td style={{ padding: `${theme.spacing.sm}px`, display: 'flex', alignItems: 'center', gap: theme.spacing.sm }}>
                    <Icon {...({} as any)} style={{ width: '16px', height: '16px', color: iconColor, flexShrink: 0 }} />
                    <span style={{ color: theme.colors.actionTertiaryTextDefault, fontSize: theme.typography.fontSizeBase }}>
                      {entry.name}
                    </span>
                  </td>
                  <td style={{ padding: `${theme.spacing.sm}px`, fontSize: theme.typography.fontSizeBase, color: theme.colors.textPrimary }}>
                    {entry.type}
                  </td>
                  <td style={{ padding: `${theme.spacing.sm}px`, fontSize: theme.typography.fontSizeBase, color: theme.colors.textPrimary }}>
                    {entry.owner}
                  </td>
                  <td style={{ padding: `${theme.spacing.sm}px`, fontSize: theme.typography.fontSizeBase, color: theme.colors.textPrimary }}>
                    {entry.createdAt}
                  </td>
                  <td style={{ padding: `${theme.spacing.sm}px`, fontSize: theme.typography.fontSizeBase, color: theme.colors.textPrimary }}>
                    {entry.lastUpdatedAt}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
