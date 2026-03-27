'use client'

import { usePathname } from 'next/navigation'
import { useState } from 'react'
import {
  useDesignSystemTheme,
  NotebookIcon,
  ClockIcon,
  CatalogIcon,
  WorkflowsIcon,
  CloudIcon,
  QueryEditorIcon,
  QueryIcon,
  DashboardIcon,
  NotificationIcon,
  HistoryIcon,
  CloudDatabaseIcon,
  ChecklistIcon,
  IngestionIcon,
  PipelineIcon,
  RobotIcon,
  BeakerIcon,
  LayerIcon,
  ModelsIcon,
  CloudModelIcon,
  StorefrontIcon,
  PlusIcon,
} from '@databricks/design-system'
import { GenieCodeIcon } from '@/lib/icons/GenieCodeIcon'
import { NavItemComponent, type NavItem } from './NavItemComponent'

interface SidebarProps {
  isOpen: boolean
  onToggle: () => void
}

// Navigation structure based on Figma design
const navStructure: NavItem[] = [
  // Core navigation
  { path: '/workspace', label: 'Workspace', icon: NotebookIcon },
  { path: '/recents', label: 'Recents', icon: ClockIcon },
  { path: '/data', label: 'Catalog', icon: CatalogIcon },
  { path: '/jobs', label: 'Jobs & Pipelines', icon: WorkflowsIcon },
  { path: '/compute', label: 'Compute', icon: CloudIcon },
  { path: '/marketplace', label: 'Marketplace', icon: StorefrontIcon },
  
  // SQL section
  { path: '/sql-editor', label: 'SQL Editor', icon: QueryEditorIcon, section: 'SQL' },
  { path: '/queries', label: 'Queries', icon: QueryIcon, section: 'SQL' },
  { path: '/dashboards', label: 'Dashboards', icon: DashboardIcon, section: 'SQL' },
  { path: '/genie', label: 'Genie', icon: GenieCodeIcon, section: 'SQL' },
  { path: '/alerts', label: 'Alerts', icon: NotificationIcon, section: 'SQL' },
  { path: '/query-history', label: 'Query History', icon: HistoryIcon, section: 'SQL' },
  { path: '/sql-warehouses', label: 'SQL Warehouses', icon: CloudDatabaseIcon, section: 'SQL' },
  
  // Data Engineering section
  { path: '/job-runs', label: 'Job Runs', icon: ChecklistIcon, section: 'Data Engineering' },
  { path: '/data-ingestion', label: 'Data Ingestion', icon: IngestionIcon, section: 'Data Engineering' },
  { path: '/pipelines', label: 'Pipelines', icon: PipelineIcon, section: 'Data Engineering' },
  
  // Machine Learning section
  { path: '/playground', label: 'Playground', icon: RobotIcon, section: 'AI/ML' },
  { path: '/experiments', label: 'Experiments', icon: BeakerIcon, section: 'AI/ML' },
  { path: '/features', label: 'Features', icon: LayerIcon, section: 'AI/ML' },
  { path: '/models', label: 'Models', icon: ModelsIcon, section: 'AI/ML' },
  { path: '/serving', label: 'Serving', icon: CloudModelIcon, section: 'AI/ML' },
  
  // // Bottom utility links
  // { path: '/marketplace', label: 'Marketplace', icon: StorefrontIcon },
  // { path: '/partner-connect', label: 'Partner Connect', icon: ConnectIcon },
]


export function Sidebar({ isOpen, onToggle }: SidebarProps) {
  const pathname = usePathname()
  const { theme } = useDesignSystemTheme()
  const [newButtonState, setNewButtonState] = useState<'Default' | 'Hover' | 'Press'>('Default')
  
  // Group navigation items by section
  const groupedNav: { [key: string]: NavItem[] } = {}
  let currentSection = 'main'
  
  navStructure.forEach((item) => {
    if (item.section) {
      if (!groupedNav[item.section]) {
        groupedNav[item.section] = []
      }
      groupedNav[item.section].push(item)
    } else {
      if (!groupedNav[currentSection]) {
        groupedNav[currentSection] = []
      }
      groupedNav[currentSection].push(item)
    }
  })

  // Get New Button styles based on state
  const getNewButtonStyles = () => {
    const baseColor = 'rgba(255, 73, 73, '
    switch (newButtonState) {
      case 'Press':
        return {
          backgroundColor: `${baseColor}0.24)`,
          borderColor: `${baseColor}0.24)`,
        }
      case 'Hover':
        return {
          backgroundColor: `${baseColor}0.16)`,
          borderColor: `${baseColor}0.16)`,
        }
      default: // Default
        return {
          backgroundColor: `${baseColor}0.08)`,
          borderColor: `${baseColor}0.08)`,
        }
    }
  }
  
  const newButtonStyles = getNewButtonStyles()

  return (
    <aside
      style={{
        width: isOpen ? '204px' : '0px',
        minWidth: isOpen ? '204px' : '0px',
        backgroundColor: theme.colors.backgroundSecondary || '#f7f7f7',
        color: theme.colors.textPrimary || '#11171c',
        transition: 'width 0.3s ease',
        display: 'flex',
        flexDirection: 'column',
        height: 'calc(100vh - 48px)',
        overflowY: isOpen ? 'auto' : 'hidden',
        overflowX: 'hidden',
        gap: '16px',
        paddingLeft: isOpen ? '12px' : '0px',
        paddingRight: isOpen ? '12px' : '0px',
        paddingBottom: '8px',
        borderRadius: '0 0 0 8px',
      }}
    >
      {/* New Button */}
      <div
        style={{
          display: 'flex',
          // flexDirection: 'column',
          alignItems: 'flex-start',
          padding: '0',
          width: '100%',
        }}
      >
        <button
          onClick={() => {/* Handle new action */}}
          style={{
            width: '100%',
            height: '36px',
            borderRadius: theme.borders?.borderRadiusMd || theme.spacing.md || '8px',
            backgroundColor: newButtonStyles.backgroundColor,
            border: `1px solid ${newButtonStyles.borderColor}`,
            color: theme.colors.textPrimary || '#161616',
            display: 'flex',
            gap: theme.spacing.sm,
            alignItems: 'center',
            padding: '0 12px',
            fontSize: theme.typography.fontSizeBase,
            lineHeight: theme.typography.lineHeightBase,
            fontWeight: theme.typography.typographyBoldFontWeight,
            cursor: 'pointer',
            transition: 'all 0.2s',
          }}
          onMouseEnter={() => setNewButtonState('Hover')}
          onMouseLeave={() => setNewButtonState('Default')}
          onMouseDown={() => setNewButtonState('Press')}
          onMouseUp={() => setNewButtonState('Hover')}
        >
          <div style={{ color: '#FF4949',width: '16px', height: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <PlusIcon {...({} as any)} />
          </div>
          {isOpen && <span>New</span>}
        </button>
      </div>

      {/* Main Navigation */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          width: '100%',
          gap: '16px',
        }}
      >
        {/* Core Navigation Items */}
        {groupedNav.main && (
          <div style={{ width: '100%', display: 'flex',  gap: '2px', flexDirection: 'column' }}>
            {groupedNav.main.map((item) => (
              <NavItemComponent
                key={item.path}
                item={item}
                isActive={pathname === item.path || pathname?.startsWith(item.path + '/')}
                isOpen={isOpen}
              />
            ))}
          </div>
        )}

        {/* SQL Section */}
        {groupedNav['SQL'] && (
          <div style={{ width: '100%', gap: '2px', display: 'flex', flexDirection: 'column' }}>
            <div
              style={{
                display: 'flex',
                gap: '0px',
                height: '24px',
                alignItems: 'center',
                paddingLeft: '12px',
                paddingRight: '12px',
                paddingTop: theme.spacing.sm,
                paddingBottom: theme.spacing.sm,
                borderRadius: theme.spacing.xs || '4px',
                width: isOpen ? '176px' : 'auto',
                backgroundColor: 'rgba(34, 114, 180, 0)',
              }}
            >
              {isOpen && (
                <span
                  style={{
                    fontSize: theme.typography.fontSizeSm,
                    lineHeight: theme.typography.lineHeightXs,
                    color: theme.colors.textSecondary,
                  }}
                >
                  SQL
                </span>
              )}
            </div>
            {groupedNav['SQL'].map((item) => (
              <NavItemComponent
                key={item.path}
                item={item}
                isActive={pathname === item.path || pathname?.startsWith(item.path + '/')}
                isOpen={isOpen}
              />
            ))}
          </div>
        )}

        {/* Data Engineering Section */}
        {groupedNav['Data Engineering'] && (
          <div style={{ width: '100%', gap: '2px', display: 'flex', flexDirection: 'column' }}>
            <div
              style={{
                display: 'flex',
                gap: '0px',
                height: '24px',
                alignItems: 'center',
                paddingLeft: '12px',
                paddingRight: '12px',
                paddingTop: theme.spacing.sm,
                paddingBottom: theme.spacing.sm,
                borderRadius: theme.spacing.xs || '4px',
                width: isOpen ? '176px' : 'auto',
                backgroundColor: 'rgba(34, 114, 180, 0)',
              }}
            >
              {isOpen && (
                <span
                  style={{
                    fontSize: theme.typography.fontSizeSm,
                    lineHeight: theme.typography.lineHeightXs,
                    color: theme.colors.textSecondary,
                  }}
                >
                  Data Engineering
                </span>
              )}
            </div>
            {groupedNav['Data Engineering'].map((item) => (
              <NavItemComponent
                key={item.path}
                item={item}
                isActive={pathname === item.path || pathname?.startsWith(item.path + '/')}
                isOpen={isOpen}
              />
            ))}
          </div>
        )}

        {/* Machine Learning Section */}
        {groupedNav['AI/ML'] && (
          <div style={{ width: '100%', gap: '2px', display: 'flex', flexDirection: 'column' }}>
            <div
              style={{
                display: 'flex',
                gap: '0px',
                height: '24px',
                alignItems: 'center',
                paddingLeft: '12px',
                paddingRight: '12px',
                paddingTop: theme.spacing.sm,
                paddingBottom: theme.spacing.sm,
                borderRadius: theme.spacing.xs || '4px',
                width: isOpen ? '176px' : 'auto',
                backgroundColor: 'rgba(34, 114, 180, 0)',
              }}
            >
              {isOpen && (
                <span
                  style={{
                    fontSize: theme.typography.fontSizeSm,
                    lineHeight: theme.typography.lineHeightXs,
                    color: theme.colors.textSecondary,
                  }}
                >
                 AI/ML
                </span>
              )}
            </div>
            {groupedNav['AI/ML'].map((item) => (
              <NavItemComponent
                key={item.path}
                item={item}
                isActive={pathname === item.path || pathname?.startsWith(item.path + '/')}
                isOpen={isOpen}
              />
            ))}
          </div>
        )}
      </div>

    </aside>
  )
}
