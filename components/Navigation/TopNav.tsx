'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  useDesignSystemTheme,
  SearchIcon,
  ChevronDownIcon,
  GridDashIcon,
  Button,
} from '@databricks/design-system'
import { AnimatedSidebarIcon } from '@/components/animations/AnimatedSidebarIcon'
import { useOpenAssistantPanel, useCloseAssistantPanel, useIsAssistantPanelOpen } from '@/app/workspace/notebook/context/AssistantPanelContext'
import { GenieCodeIcon } from '@/lib/icons/GenieCodeIcon'

interface TopNavProps {
  sidebarOpen: boolean
  onMenuClick: () => void
}

export function TopNav({ sidebarOpen, onMenuClick }: TopNavProps) {
  const { theme } = useDesignSystemTheme()
  const [workspaceName] = useState('Production')
  const [sidebarBtnHovered, setSidebarBtnHovered] = useState(false)
  const openAssistantPanel = useOpenAssistantPanel()
  const closeAssistantPanel = useCloseAssistantPanel()
  const isAssistantPanelOpen = useIsAssistantPanelOpen()

  return (
    <header
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        height: '48px',
        backgroundColor: theme.colors.backgroundSecondary || '#f7f7f7',
        display: 'flex',
        alignItems: 'center',
        padding: '0 16px',
        gap: '16px',
        width: '100%',
      }}
    >
      {/* Left Section: Menu and Logo */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          flexShrink: 0,
        }}
      >
        <div
          onMouseEnter={() => setSidebarBtnHovered(true)}
          onMouseLeave={() => setSidebarBtnHovered(false)}
        >
          <Button
            type="tertiary"
            icon={
              <AnimatedSidebarIcon isOpen={sidebarOpen} isHovered={sidebarBtnHovered} />
            }
            onClick={onMenuClick}
            componentId="top-nav-menu-button"
            dangerouslyAppendWrapperCss={{
              padding: theme.spacing.sm,
              width: '32px',
              height: '32px',
            }}
          />
        </div>

        {/* Logo */}
        <Link
          href="/home"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0px',
            height: '32px',
            padding: '0 8px',
            color: theme.colors.textDisabled,
            textDecoration: 'none',
          }}
        >
          <div
            style={{
              padding: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: theme.colors.textDisabled,
            }}
          >
            <GridDashIcon {...({} as any)} />
          </div>
          <span
            style={{
              fontSize: theme.typography.fontSizeMd,
              lineHeight: theme.typography.lineHeightSm,
              color: theme.colors.textDisabled,
              marginLeft: '4px',
            }}
          >
            Acme Inc.
          </span>
        </Link>
      </div>

      {/* Center Section: Search */}
      <div
        style={{
          flex: 1,
          display: 'flex',
          justifyContent: 'center',
          maxWidth: '500px',
          margin: '0 auto',
        }}
      >
        <div
          style={{
            width: '100%',
            height: '32px',
            backgroundColor: theme.colors.backgroundPrimary || '#ffffff',
            border: `1px solid ${theme.colors.borderDecorative || '#ebebeb'}`,
            borderRadius: theme.borders?.borderRadiusSm || '4px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '6px 12px',
          }}
        >
          <div
            style={{
              width: '16px',
              height: '16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#7f8f9a',
              flexShrink: 0,
            }}
          >
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
              fontSize: theme.typography.fontSizeBase,
              lineHeight: theme.typography.lineHeightBase,
              color: theme.colors.textPrimary,
            }}
          />
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              fontSize: theme.typography.fontSizeSm,
              lineHeight: theme.typography.lineHeightXs,
              color: theme.colors.actionDisabledText,
              whiteSpace: 'nowrap',
              flexShrink: 0,
            }}
          >
            ⌘ + P
          </div>
        </div>
      </div>

      {/* Right Section: Workspace Switcher, Icons, User Menu */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          flexShrink: 0,
        }}
      >
        {/* Workspace Switcher */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            height: '32px',
            padding: '0 8px',
            borderRadius: theme.borders?.borderRadiusSm || '4px',
            cursor: 'pointer',
            transition: 'background-color 0.2s',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = theme.colors.actionDefaultBackgroundHover || 'rgba(34, 114, 180, 0.08)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'transparent'
          }}
        >
          <span
            style={{
              fontSize: theme.typography.fontSizeBase,
              lineHeight: theme.typography.lineHeightBase,
              color: theme.colors.textPrimary,
            }}
          >
            {workspaceName}
          </span>
          <div
            style={{
              width: '16px',
              height: '16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#7f8f9a',
            }}
          >
            <ChevronDownIcon {...({} as any)} />
          </div>
        </div>

        {/* Genie Code icon – active when Genie Code panel is open (matches right panel) */}
        <div
          style={{
            borderRadius: theme.borders?.borderRadiusSm ?? 4,
            backgroundColor: isAssistantPanelOpen ? (theme.colors.actionTertiaryBackgroundHover ?? 'rgba(0,0,0,0.06)') : undefined,
          }}
        >
          <Button
            type="tertiary"
            onClick={() => (isAssistantPanelOpen ? closeAssistantPanel?.() : openAssistantPanel?.())}
            icon={
              <div
                style={{
                  width: '16px',
                  height: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: isAssistantPanelOpen ? (theme.colors.actionDefaultIconHover ?? theme.colors.textPrimary ?? '#161616') : '#7f8f9a',
                }}
              >
                <GenieCodeIcon width={16} height={16} />
              </div>
            }
            componentId="top-nav-assistant-button"
            dangerouslyAppendWrapperCss={{
              width: '32px',
              height: '32px',
              padding: '4px',
            }}
          />
        </div>

        {/* App Switcher (Grid Icon) */}
        <Button
          type="tertiary"
          icon={
            <div style={{ color: '#7f8f9a', width: '16px', height: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2.75 1C1.7835 1 1 1.7835 1 2.75C1 3.7165 1.7835 4.5 2.75 4.5C3.7165 4.5 4.5 3.7165 4.5 2.75C4.5 1.7835 3.7165 1 2.75 1Z" fill="currentColor" />
                <path d="M8 1C7.0335 1 6.25 1.7835 6.25 2.75C6.25 3.7165 7.0335 4.5 8 4.5C8.9665 4.5 9.75 3.7165 9.75 2.75C9.75 1.7835 8.9665 1 8 1Z" fill="currentColor" />
                <path d="M13.25 1C12.2835 1 11.5 1.7835 11.5 2.75C11.5 3.7165 12.2835 4.5 13.25 4.5C14.2165 4.5 15 3.7165 15 2.75C15 1.7835 14.2165 1 13.25 1Z" fill="currentColor" />
                <path d="M2.75 6.25C1.7835 6.25 1 7.0335 1 8C1 8.9665 1.7835 9.75 2.75 9.75C3.7165 9.75 4.5 8.9665 4.5 8C4.5 7.0335 3.7165 6.25 2.75 6.25Z" fill="currentColor" />
                <path d="M8 6.25C7.0335 6.25 6.25 7.0335 6.25 8C6.25 8.9665 7.0335 9.75 8 9.75C8.9665 9.75 9.75 8.9665 9.75 8C9.75 7.0335 8.9665 6.25 8 6.25Z" fill="currentColor" />
                <path d="M13.25 6.25C12.2835 6.25 11.5 7.0335 11.5 8C11.5 8.9665 12.2835 9.75 13.25 9.75C14.2165 9.75 15 8.9665 15 8C15 7.0335 14.2165 6.25 13.25 6.25Z" fill="currentColor" />
                <path d="M2.75 11.5C1.7835 11.5 1 12.2835 1 13.25C1 14.2165 1.7835 15 2.75 15C3.7165 15 4.5 14.2165 4.5 13.25C4.5 12.2835 3.7165 11.5 2.75 11.5Z" fill="currentColor" />
                <path d="M8 11.5C7.0335 11.5 6.25 12.2835 6.25 13.25C6.25 14.2165 7.0335 15 8 15C8.9665 15 9.75 14.2165 9.75 13.25C9.75 12.2835 8.9665 11.5 8 11.5Z" fill="currentColor" />
                <path d="M13.25 11.5C12.2835 11.5 11.5 12.2835 11.5 13.25C11.5 14.2165 12.2835 15 13.25 15C14.2165 15 15 14.2165 15 13.25C15 12.2835 14.2165 11.5 13.25 11.5Z" fill="currentColor" />
              </svg>
            </div>
          }
          componentId="top-nav-app-switcher-button"
          dangerouslyAppendWrapperCss={{
            width: '32px',
            height: '32px',
            padding: '8px',
          }}
        />

        {/* User Menu */}
        <Button
          type="tertiary"
          icon={
            <div
              style={{
                width: '24px',
                height: '24px',
                borderRadius: '999px',
                backgroundColor: '#434a93',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#ffffff',
                fontSize: theme.typography.fontSizeSm,
                lineHeight: 'normal',
                fontWeight: theme.typography.typographyBoldFontWeight,
              }}
            >
              W
            </div>
          }
          componentId="top-nav-user-menu-button"
          dangerouslyAppendWrapperCss={{
            width: '32px',
            height: '32px',
            padding: '4px',
            borderRadius: theme.borders?.borderRadiusFull || '999px',
          }}
        />
      </div>
    </header>
  )
}
