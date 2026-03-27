'use client'

import { useState, useRef, useEffect } from 'react'
import { useDesignSystemTheme, Button, ChevronDownIcon, PlayIcon, CircleIcon } from '@databricks/design-system'

interface NotebookNavProps {
  containerRef: React.RefObject<HTMLDivElement>
}

export function NotebookNav({ containerRef: mainContentRef }: NotebookNavProps) {
  const { theme } = useDesignSystemTheme()
  const [language, setLanguage] = useState<'Python' | 'SQL'>('Python')
  const [langDropdownOpen, setLangDropdownOpen] = useState(false)
  const langRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setLangDropdownOpen(false)
      }
    }
    if (langDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      return () => document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [langDropdownOpen])

  const menuItems = ['File', 'Edit', 'View', 'Run', 'Help']

  return (
    <div
      style={{
        width: '100%',
        minWidth: 0,
        backgroundColor: theme.colors.backgroundPrimary,
        display: 'flex',
        flexDirection: 'column',
        padding: theme.spacing.sm,
        minHeight: '40px',
        flexShrink: 0,
      }}
    >
      <div
        style={{
          display: 'flex',
          gap: theme.spacing.sm,
          alignItems: 'center',
          flexWrap: 'wrap',
        }}
      >
        {/* File Menu Buttons */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0px', flexShrink: 0 }}>
          {menuItems.map((menuItem) => (
            <Button
              key={menuItem}
              type="tertiary"
              size="small"
              onClick={() => {
                // Handle menu click
              }}
              componentId={`notebook-nav-${menuItem.toLowerCase()}`}
              dangerouslyAppendWrapperCss={{
                flexShrink: 0,
                color: theme.colors.textPrimary,
              }}
            >
              {menuItem}
            </Button>
          ))}
        </div>

        {/* Language Dropdown */}
        <div ref={langRef} style={{ position: 'relative', flexShrink: 0 }}>
          <div
            onClick={() => setLangDropdownOpen(!langDropdownOpen)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 2,
              fontSize: theme.typography.fontSizeBase,
              lineHeight: theme.typography.lineHeightBase,
              color: theme.colors.textPrimary,
              cursor: 'pointer',
              padding: '2px 4px',
              backgroundColor: theme.colors.backgroundSecondary,
              borderRadius: theme.borders.borderRadiusSm,
              transition: 'background-color 0.15s ease',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#e2e2e2' }}
            onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = theme.colors.backgroundSecondary }}
          >
            {language}
            <ChevronDownIcon {...({} as any)} css={{ svg: { width: 12, height: 12, color: theme.colors.textSecondary } }} />
          </div>
          {langDropdownOpen && (
            <div
              style={{
                position: 'absolute',
                top: '100%',
                left: 0,
                marginTop: 4,
                backgroundColor: theme.colors.backgroundPrimary,
                borderRadius: theme.borders.borderRadiusSm,
                boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                border: `1px solid ${theme.colors.border}`,
                minWidth: 100,
                zIndex: 20,
                overflow: 'hidden',
              }}
            >
              {(['Python', 'SQL'] as const).map((lang) => (
                <div
                  key={lang}
                  onClick={() => { setLanguage(lang); setLangDropdownOpen(false) }}
                  style={{
                    padding: '6px 12px',
                    fontSize: theme.typography.fontSizeBase,
                    lineHeight: theme.typography.lineHeightBase,
                    color: theme.colors.textPrimary,
                    cursor: 'pointer',
                    backgroundColor: lang === language ? theme.colors.backgroundSecondary : 'transparent',
                    transition: 'background-color 0.1s ease',
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = theme.colors.backgroundSecondary }}
                  onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = lang === language ? theme.colors.backgroundSecondary : 'transparent' }}
                >
                  {lang}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Last Edit Text */}
        <span
          style={{
            fontSize: theme.typography.fontSizeBase,
            lineHeight: theme.typography.lineHeightBase,
            color: theme.colors.textSecondary,
            whiteSpace: 'nowrap',
            flexShrink: 0,
          }}
        >
          Last edit 20 min ago
        </span>

        {/* Right Section - Spacer to push items to the right when there's space */}
        <div style={{ flex: 1, minWidth: theme.spacing.sm }} />

        {/* Run All Button */}
        <Button
          size="small"
          icon={<PlayIcon {...({} as any)} />}
          onClick={() => {
            // Handle run all
          }}
          componentId="notebook-nav-run-all"
          dangerouslyAppendWrapperCss={{
            flexShrink: 0,
            whiteSpace: 'nowrap',
          }}
        >
          Run all
        </Button>

        {/* Serverless Compute Button */}
        <Button
          size="small"
          icon={
            <CircleIcon {...({} as any)} />
          }
          onClick={() => {
            // Handle serverless click
          }}
          componentId="notebook-nav-serverless"
          dangerouslyAppendWrapperCss={{
            flexShrink: 0,
            whiteSpace: 'nowrap',
            display: 'flex',
            alignItems: 'center',
            gap: theme.spacing.xs,
          }}
        >
          <span style={{ display: 'flex', alignItems: 'center', gap: theme.spacing.xs }}>
            Serverless
            <div
              style={{
                width: '16px',
                height: '16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: theme.colors.textPrimary,
                flexShrink: 0,
              }}
            >
              <ChevronDownIcon {...({} as any)} />
            </div>
          </span>
        </Button>

        {/* Schedule Button */}
        <Button
          size="small"
          onClick={() => {
            // Handle schedule
          }}
          componentId="notebook-nav-schedule"
          dangerouslyAppendWrapperCss={{
            flexShrink: 0,
            whiteSpace: 'nowrap',
          }}
        >
          Schedule
        </Button>

        {/* Share Button */}
        <Button
          size="small"
          onClick={() => {
            // Handle share
          }}
          componentId="notebook-nav-share"
          dangerouslyAppendWrapperCss={{
            flexShrink: 0,
            whiteSpace: 'nowrap',
          }}
        >
          Share
        </Button>
      </div>
    </div>
  )
}
