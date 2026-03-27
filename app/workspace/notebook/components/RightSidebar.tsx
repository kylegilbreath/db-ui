'use client'

import React from 'react'
import {
    useDesignSystemTheme,
    SpeechBubbleIcon,
    HistoryIcon,
    ChevronUpIcon,
    ChevronDownIcon,
    BeakerIcon,
    BracketsXIcon,
    SlidersIcon,
    InfoIcon,
} from '@databricks/design-system'
import { SidebarIconButton } from './SidebarIconButton'
import { GenieCodeIcon } from '@/lib/icons/GenieCodeIcon'

interface RightSidebarProps {
    activeView?: 'comments' | 'experiments' | 'history' | 'variables' | 'environment' | 'info' | 'assistant' | 'null'
    onViewChange?: (view: 'comments' | 'experiments' | 'history' | 'variables' | 'environment' | 'info' | 'assistant' | 'null') => void
    onCollapse?: () => void
    collapsed?: boolean
    topNavCollapsed?: boolean
    onToggleTopNav?: () => void
}

export function RightSidebar({
    activeView = 'comments',
    onViewChange,
    onCollapse,
    collapsed = false,
    topNavCollapsed = false,
    onToggleTopNav,
}: RightSidebarProps) {
    const { theme } = useDesignSystemTheme()

    const handleClick = (view: RightSidebarProps['activeView'] & string) => {
        if (collapsed) {
            onViewChange?.(view as any)
        } else if (activeView === view) {
            onCollapse?.()
        } else {
            onViewChange?.(view as any)
        }
    }

    return (
        <div
            style={{
                width: '40px',
                backgroundColor: theme.colors.backgroundPrimary,
                borderLeft: collapsed ? 'transparent' : `1px solid ${theme.colors.border}`,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                padding: theme.spacing.xs,
                gap: theme.spacing.xs,
                flexShrink: 0,
            }}
        >
            <SidebarIconButton
                icon={topNavCollapsed ? ChevronDownIcon : ChevronUpIcon}
                componentId="hide-top-navigation"
                isActive={topNavCollapsed}
                tooltip={topNavCollapsed ? 'Show top navigation bar' : 'Hide top navigation bar'}
                onClick={() => onToggleTopNav?.()}
            />

            <SidebarIconButton
                icon={SpeechBubbleIcon}
                componentId="right-panel-comments"
                isActive={activeView === 'comments' && !collapsed}
                tooltip="Comments"
                onClick={() => handleClick('comments')}
            />

            <SidebarIconButton
                icon={BeakerIcon}
                componentId="right-panel-experiments"
                isActive={activeView === 'experiments' && !collapsed}
                tooltip="MLflow experiments"
                onClick={() => handleClick('experiments')}
            />

            <SidebarIconButton
                icon={HistoryIcon}
                componentId="right-panel-history"
                isActive={activeView === 'history' && !collapsed}
                tooltip="Version history"
                onClick={() => handleClick('history')}
            />

            <SidebarIconButton
                icon={BracketsXIcon}
                componentId="right-panel-variables"
                isActive={activeView === 'variables' && !collapsed}
                tooltip="Variables"
                onClick={() => handleClick('variables')}
            />

            <SidebarIconButton
                icon={SlidersIcon}
                componentId="right-panel-environment"
                isActive={activeView === 'environment' && !collapsed}
                tooltip="Environment"
                onClick={() => handleClick('environment')}
            />

            <SidebarIconButton
                icon={InfoIcon}
                componentId="right-panel-info"
                isActive={activeView === 'info' && !collapsed}
                tooltip="Info"
                onClick={() => handleClick('info')}
            />

            <SidebarIconButton
                icon={GenieCodeIcon}
                componentId="right-panel-assistant"
                isActive={activeView === 'assistant' && !collapsed}
                tooltip="Assistant"
                onClick={() => handleClick('assistant')}
            />
        </div>
    )
}
