'use client'

import React from 'react'
import {
    useDesignSystemTheme,
    HomeIcon,
} from '@databricks/design-system'

interface LeftHeaderProps {
    collapsed: boolean
    onCollapse: () => void
}

export function LeftHeader({ collapsed, onCollapse }: LeftHeaderProps) {
    const { theme } = useDesignSystemTheme()

    return (
        <div
            style={{
                padding: `${theme.spacing.sm}px ${theme.spacing.mid}px`,
                borderBottom: `1px solid ${theme.colors.border}`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: collapsed ? 'center' : 'flex-start',
                gap: theme.spacing.sm,
                height: '36px',
                backgroundColor: theme.colors.backgroundPrimary,
                flexShrink: 0,
                overflow: 'hidden',
                whiteSpace: 'nowrap',
            }}
        >
            {collapsed ? (
                <HomeIcon {...({} as any)} style={{ color: theme.colors.blue400, width: '16px', height: '16px' }} />

            ) : (
                <>
                    <HomeIcon {...({} as any)} style={{ color: theme.colors.blue400, width: '16px', height: '16px' }} />
                    <span
                        style={{
                            fontSize: theme.typography.fontSizeBase,
                            fontWeight: theme.typography.typographyBoldFontWeight,
                            color: theme.colors.textPrimary,
                        }}
                    >
                        Workspace
                    </span>
                </>
            )}
        </div>
    )
}
