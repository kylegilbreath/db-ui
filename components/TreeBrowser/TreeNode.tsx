'use client'

import { useState } from 'react'
import {
  useDesignSystemTheme,
  ChevronRightIcon,
  ChevronDownIcon,
  FolderFillIcon,
  FolderSolidPipelineIcon,
  NotebookIcon,
  FileCodeIcon,
  FileIcon,
  DashboardIcon,
  QueryIcon,
  HomeIcon,
  UserGroupIcon,
  StarIcon,
  TrashIcon,
  FolderBranchFillIcon,
  OfficeIcon,
  WorkflowsIcon,
} from '@databricks/design-system'

export type TreeNodeType =
  | 'folder'
  | 'pipeline'
  | 'notebook'
  | 'sql'
  | 'file'
  | 'dashboard'
  | 'query'
  | 'draft'
  | 'home'
  | 'shared'
  | 'favorites'
  | 'trash'
  | 'git'
  | 'shared-folder'
  | 'users'
  | 'user-home'
  | 'job'

export interface TreeNodeData {
  id: string
  label: string
  type: TreeNodeType
  children?: TreeNodeData[]
}

interface TreeNodeProps {
  node: TreeNodeData
  depth?: number
  isSelected?: boolean
  selectedId?: string | null
  foldersOnly?: boolean
  onSelect?: (id: string) => void
}

// Icon per type
const iconMap: Record<TreeNodeType, any> = {
  folder: FolderFillIcon,
  draft: FolderFillIcon,
  pipeline: FolderSolidPipelineIcon,
  notebook: NotebookIcon,
  sql: QueryIcon,
  file: FileCodeIcon,
  dashboard: DashboardIcon,
  query: QueryIcon,
  home: HomeIcon,
  shared: UserGroupIcon,
  favorites: StarIcon,
  trash: TrashIcon,
  git: FolderBranchFillIcon,
  'shared-folder': OfficeIcon,
  users: UserGroupIcon,
  'user-home': HomeIcon,
  job: WorkflowsIcon,
}

// Color per type — undefined means use textSecondary
const iconColorMap: Record<TreeNodeType, string | undefined> = {
  folder: 'blue400',
  draft: 'grey200',
  pipeline: 'blue400',
  notebook: undefined,
  sql: undefined,
  file: undefined,
  dashboard: undefined,
  query: undefined,
  home: undefined,
  shared: undefined,
  favorites: undefined,
  trash: undefined,
  git: 'blue400',
  'shared-folder': undefined,
  users: undefined,
  'user-home': undefined,
  job: undefined,
}

const EXPANDABLE_TYPES: TreeNodeType[] = ['folder', 'pipeline', 'draft', 'home', 'git', 'shared-folder', 'users', 'user-home']

export function TreeNode({ node, depth = 0, isSelected = false, selectedId, foldersOnly = false, onSelect }: TreeNodeProps) {
  const { theme } = useDesignSystemTheme()
  const [isExpanded, setIsExpanded] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  const hasChildren = node.children && node.children.length > 0
  const isExpandable = hasChildren || EXPANDABLE_TYPES.includes(node.type)

  // In foldersOnly mode, skip rendering leaf (non-expandable) nodes
  if (foldersOnly && !isExpandable) {
    return null
  }
  const Icon = iconMap[node.type] || FileIcon
  const indentPx = depth * 16

  // Resolve icon color from the map
  const colorKey = iconColorMap[node.type]
  const iconColor = colorKey
    ? (theme.colors as any)[colorKey] ?? theme.colors.textSecondary
    : theme.colors.textSecondary

  const handleClick = () => {
    if (isExpandable) {
      setIsExpanded(!isExpanded)
    }
    onSelect?.(node.id)
  }

  return (
    <>
      <div
        onClick={handleClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: theme.spacing.xs,
          height: '28px',
          paddingLeft: indentPx,
          paddingRight: theme.spacing.xs,
          cursor: 'pointer',
          backgroundColor: isSelected
            ? theme.colors.actionDefaultBackgroundHover
            : isHovered
              ? theme.colors.actionDefaultBackgroundHover
              : 'transparent',
          borderLeft: isSelected
            ? `2px solid ${theme.colors.actionDefaultBorderFocus}`
            : '2px solid transparent',
          transition: 'background-color 0.15s ease',
        }}
      >
        {/* Chevron — visible for expandable nodes, spacer for leaves */}
        <div
          style={{
            width: '16px',
            height: '16px',
            flexShrink: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: theme.colors.actionDefaultBorderDefault,
          }}
        >
          {isExpandable && (
            isExpanded
              ? <ChevronDownIcon {...({} as any)} style={{ width: '16px', height: '16px' }} />
              : <ChevronRightIcon {...({} as any)} style={{ width: '16px', height: '16px' }} />
          )}
        </div>

        {/* File/folder icon */}
        <div
          style={{
            width: '16px',
            height: '16px',
            flexShrink: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: iconColor,
          }}
        >
          <Icon {...({} as any)} style={{ width: '16px', height: '16px' }} />
        </div>

        {/* Label */}
        <span
          style={{
            fontSize: theme.typography.fontSizeBase,
            lineHeight: theme.typography.lineHeightBase,
            color: theme.colors.textPrimary,
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            flex: 1,
            minWidth: 0,
          }}
        >
          {node.label}
        </span>
      </div>

      {/* Render children when expanded */}
      {isExpandable && isExpanded && node.children?.map((child) => (
        <TreeNode
          key={child.id}
          node={child}
          depth={depth + 1}
          isSelected={selectedId === child.id}
          selectedId={selectedId}
          foldersOnly={foldersOnly}
          onSelect={onSelect}
        />
      ))}
    </>
  )
}
