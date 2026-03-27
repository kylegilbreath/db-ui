'use client'

import { useState } from 'react'
import {
  useDesignSystemTheme,
  SearchIcon,
  NotebookIcon,
  QueryIcon,
  WorkflowsIcon,
  LightbulbIcon,
  StarIcon,
  BarChartIcon,
  SparkleDoubleIcon,
  GiftIcon,
} from '@databricks/design-system'

const TABS = [
  { label: 'Suggested', icon: LightbulbIcon },
  { label: 'Favorites', icon: StarIcon },
  { label: 'Popular', icon: BarChartIcon },
  { label: 'Mosaic AI', icon: SparkleDoubleIcon },
  { label: "What's new", icon: GiftIcon },
]

interface RecentItem {
  name: string
  path: string
  viewed: string
  type: 'Notebook' | 'Query' | 'Job'
}

const RECENT_ITEMS: RecentItem[] = [
  { name: 'Average screen sizes', path: '/Users/erin.yoo@databricks.com', viewed: 'You viewed · 19 hours ago', type: 'Notebook' },
  { name: 'deep_research', path: '/Users/tom.alcorn@databricks.com/agents', viewed: 'You viewed · 1 day ago', type: 'Notebook' },
  { name: 'Widget Panel Edit Layout Button Usage', path: '/Users/erin.yoo@databricks.com', viewed: 'You viewed · 1 day ago', type: 'Notebook' },
  { name: '_sqldf usage', path: '/Users/erin.yoo@databricks.com', viewed: 'You viewed · 1 day ago', type: 'Notebook' },
  { name: 'job_runs_v5 INSERT OVERWRITE (staged fix)', path: '/Users/erin.yoo@databricks.com', viewed: 'You viewed · 1 day ago', type: 'Query' },
  { name: 'go_jobz_job_runs_v5_sql_job', path: '', viewed: 'You viewed · 1 day ago', type: 'Job' },
  { name: 'New Notebook 2026-03-18 00:59:46', path: '/Users/erin.yoo@databricks.com/Drafts', viewed: 'You viewed · 2 days ago', type: 'Notebook' },
  { name: 'New Query 2026-03-18 01:01:39 (2)', path: '/Users/erin.yoo@databricks.com/Drafts', viewed: 'You viewed · 2 days ago', type: 'Query' },
  { name: 'New Notebook 2026-03-11 14:29:31', path: '/Users/erin.yoo@databricks.com/Drafts', viewed: 'You viewed · 2 days ago', type: 'Notebook' },
  { name: 'Empty State AI Entrypoint', path: '/Users/erin.yoo@databricks.com', viewed: 'You viewed · 2 days ago', type: 'Notebook' },
]

function TypeIcon({ type }: { type: RecentItem['type'] }) {
  const style = { width: 16, height: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#7f8f9a' } as const
  if (type === 'Notebook') return <div style={style}><NotebookIcon {...({} as any)} /></div>
  if (type === 'Query') return <div style={style}><QueryIcon {...({} as any)} /></div>
  return <div style={style}><WorkflowsIcon {...({} as any)} /></div>
}

export default function HomePage() {
  const { theme } = useDesignSystemTheme()
  const [activeTab, setActiveTab] = useState('Suggested')
  const [hoveredRow, setHoveredRow] = useState<number | null>(null)

  return (
    <div
      style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '48px 48px 24px',
        backgroundColor: theme.colors.backgroundPrimary,
        minHeight: '100%',
        overflow: 'auto',
      }}
    >
      {/* Welcome heading */}
      <h1
        style={{
          fontSize: '24px',
          fontWeight: 600,
          color: theme.colors.textPrimary,
          marginBottom: '24px',
        }}
      >
        Welcome to Databricks
      </h1>

      {/* Search bar */}
      <div
        style={{
          width: '100%',
          maxWidth: '800px',
          backgroundColor: theme.colors.backgroundPrimary,
          border: `1px solid ${theme.colors.borderDecorative || '#d0d8e0'}`,
          borderRadius: '999px',
          display: 'flex',
          alignItems: 'center',
          padding: '16px 28px',
          gap: '10px',
          marginBottom: '32px',
        }}
      >
        <div style={{ width: 16, height: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#7f8f9a', flexShrink: 0 }}>
          <SearchIcon {...({} as any)} />
        </div>
        <input
          type="text"
          placeholder="Search data, notebooks, recents, and more..."
          style={{
            flex: 1,
            border: 'none',
            outline: 'none',
            background: 'transparent',
            fontSize: '14px',
            color: theme.colors.textPrimary,
          }}
        />
        <span style={{ fontSize: '12px', color: theme.colors.actionDisabledText, whiteSpace: 'nowrap' }}>
          ⌘ + P
        </span>
      </div>

      {/* Filter tabs */}
      <div
        style={{
          display: 'flex',
          gap: '8px',
          marginBottom: '16px',
          flexWrap: 'wrap',
          justifyContent: 'center',
        }}
      >
        {TABS.map((tab) => {
          const isActive = activeTab === tab.label
          return (
            <button
              key={tab.label}
              onClick={() => setActiveTab(tab.label)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '6px 14px',
                borderRadius: '999px',
                border: isActive
                  ? `1.5px solid ${theme.colors.textPrimary || '#1b1f23'}`
                  : `1px solid ${theme.colors.borderDecorative || '#e0e0e0'}`,
                backgroundColor: isActive
                  ? 'transparent'
                  : 'transparent',
                color: theme.colors.textPrimary,
                fontSize: '13px',
                fontWeight: isActive ? 600 : 400,
                cursor: 'pointer',
                transition: 'all 0.15s ease',
              }}
            >
              <tab.icon {...({} as any)} style={{ width: 14, height: 14 }} />
              {tab.label}
            </button>
          )
        })}
      </div>

      {/* Results list */}
      <div
        style={{
          width: '100%',
          maxWidth: '800px',
        }}
      >
        {RECENT_ITEMS.map((item, i) => (
          <div
            key={i}
            onMouseEnter={() => setHoveredRow(i)}
            onMouseLeave={() => setHoveredRow(null)}
            style={{
              display: 'flex',
              alignItems: 'center',
              padding: '10px 16px',
              gap: '12px',
              borderBottom: `1px solid ${theme.colors.borderDecorative || '#f0f0f0'}`,
              backgroundColor: hoveredRow === i
                ? (theme.colors.actionDefaultBackgroundHover || 'rgba(0,0,0,0.02)')
                : 'transparent',
              cursor: 'pointer',
              transition: 'background-color 0.1s',
            }}
          >
            {/* Icon */}
            <TypeIcon type={item.type} />

            {/* Name and path */}
            <div style={{ flex: 1, minWidth: 0 }}>
              <div
                style={{
                  fontSize: '14px',
                  fontWeight: 500,
                  color: theme.colors.textPrimary,
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                }}
              >
                {item.name}
              </div>
              {item.path && (
                <div
                  style={{
                    fontSize: '12px',
                    color: theme.colors.textSecondary,
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {item.path}
                </div>
              )}
            </div>

            {/* Viewed timestamp */}
            <div
              style={{
                fontSize: '12px',
                color: theme.colors.textSecondary,
                whiteSpace: 'nowrap',
                flexShrink: 0,
              }}
            >
              {item.viewed}
            </div>

            {/* Type badge */}
            <div
              style={{
                fontSize: '12px',
                color: theme.colors.textSecondary,
                whiteSpace: 'nowrap',
                flexShrink: 0,
                width: '70px',
              }}
            >
              {item.type}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
