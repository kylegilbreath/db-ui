'use client'

import React from 'react'
import {
    useDesignSystemTheme,
    NotebookIcon,
    FileCodeIcon,
    FileIcon,
    PlusIcon,
    OverflowIcon,
    CloseSmallIcon,
    ColumnSplitIcon,
} from '@databricks/design-system'

export function WorkspaceTabs() {
    const { theme } = useDesignSystemTheme()

    return (
        <div
            style={{
                width: '100%',
                minWidth: 0,
                backgroundColor: theme.colors.backgroundSecondary,
                borderBottom: `1px solid ${theme.colors.border}`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                height: '36px',
                flexShrink: 0,
                paddingLeft: 0,
            }}
        >
            {/* Tabs Section */}
            <div
                style={{
                    display: 'flex',
                    height: '100%',
                    alignItems: 'center',
                    flexShrink: 0,
                }}
            >
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        paddingRight: '1px',
                    }}
                >
                    {/* Active Tab */}
                    <div
                        style={{
                            backgroundColor: theme.colors.backgroundPrimary,
                            display: 'flex',
                            borderBottom: `1px solid ${theme.colors.backgroundPrimary}`,
                            marginBottom: '-1px',
                            gap: theme.spacing.sm,
                            height: '36px',
                            alignItems: 'center',
                            maxWidth: '330px',
                            marginRight: '-1px',
                            padding: `${theme.spacing.xs}px ${theme.spacing.sm}px`,
                            flexShrink: 0,
                        }}
                    >
                        <div
                            style={{
                                display: 'flex',
                                gap: theme.spacing.xs,
                                alignItems: 'center',
                                flexShrink: 0,
                            }}
                        >
                            <div
                                style={{
                                    display: 'flex',
                                    height: '24px',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    overflow: 'hidden',
                                    padding: theme.spacing.xs,
                                    borderRadius: theme.borders.borderRadiusSm,
                                    flexShrink: 0,
                                }}
                            >
                                <NotebookIcon {...({} as any)} style={{ width: '16px', height: '16px', color: theme.colors.actionTertiaryTextDefault }} />
                            </div>
                            <div
                                style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'center',
                                    maxWidth: '254px',
                                    flexShrink: 0,
                                }}
                            >
                                <span
                                    style={{
                                        fontSize: theme.typography.fontSizeBase,
                                        lineHeight: theme.typography.lineHeightBase,
                                        color: theme.colors.textPrimary,
                                        whiteSpace: 'nowrap',
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis',

                                    }}
                                >
                                    New Notebook 2026-02-22 21:02:35
                                </span>
                            </div>
                        </div>
                        <button
                            style={{
                                display: 'flex',
                                height: '24px',
                                alignItems: 'center',
                                justifyContent: 'center',
                                overflow: 'hidden',
                                padding: theme.spacing.xs,
                                borderRadius: theme.borders.borderRadiusSm,
                                background: 'none',
                                border: 'none',
                                cursor: 'pointer',
                                color: theme.colors.textSecondary,
                                flexShrink: 0,
                            }}
                        >
                            <CloseSmallIcon {...({} as any)} style={{ width: '16px', height: '16px' }} />
                        </button>
                    </div>

                    {/* Inactive Tab - Query name */}
                    <div
                        style={{
                            backgroundColor: theme.colors.actionIconBackgroundDefault,
                            borderLeft: `1px solid ${theme.colors.border}`,
                            borderRight: `1px solid ${theme.colors.border}`,
                            display: 'flex',
                            gap: theme.spacing.sm,
                            height: '36px',
                            alignItems: 'center',
                            maxWidth: '330px',
                            marginRight: '-1px',
                            padding: `${theme.spacing.xs}px ${theme.spacing.sm}px`,
                            flexShrink: 0,
                        }}
                    >
                        <div
                            style={{
                                display: 'flex',
                                gap: theme.spacing.xs,
                                alignItems: 'center',
                                flexShrink: 0,
                            }}
                        >
                            <div
                                style={{
                                    display: 'flex',
                                    height: '24px',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    overflow: 'hidden',
                                    padding: theme.spacing.xs,
                                    borderRadius: theme.borders.borderRadiusSm,
                                    flexShrink: 0,
                                }}
                            >
                                <FileCodeIcon {...({} as any)} style={{ width: '16px', height: '16px', color: theme.colors.textSecondary }} />
                            </div>
                            <div
                                style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'center',
                                    maxWidth: '254px',
                                    flexShrink: 0,
                                }}
                            >
                                <span
                                    style={{
                                        fontSize: theme.typography.fontSizeBase,
                                        lineHeight: theme.typography.lineHeightBase,
                                        color: theme.colors.textSecondary,
                                        whiteSpace: 'nowrap',
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis',

                                    }}
                                >
                                    Query name
                                </span>
                            </div>
                        </div>
                        <div
                            style={{
                                display: 'flex',
                                height: '24px',
                                alignItems: 'center',
                                justifyContent: 'center',
                                overflow: 'hidden',
                                padding: theme.spacing.xs,
                                borderRadius: theme.borders.borderRadiusSm,
                                flexShrink: 0,
                            }}
                        />
                    </div>

                    {/* Inactive Tab - file_name */}
                    <div
                        style={{
                            backgroundColor: theme.colors.actionIconBackgroundDefault,
                            borderLeft: `1px solid ${theme.colors.border}`,
                            borderRight: `1px solid ${theme.colors.border}`,
                            display: 'flex',
                            gap: theme.spacing.sm,
                            height: '36px',
                            alignItems: 'center',
                            maxWidth: '330px',
                            marginRight: '-1px',
                            padding: `${theme.spacing.xs}px ${theme.spacing.sm}px`,
                            flexShrink: 0,
                        }}
                    >
                        <div
                            style={{
                                display: 'flex',
                                gap: theme.spacing.xs,
                                alignItems: 'center',
                                flexShrink: 0,
                            }}
                        >
                            <div
                                style={{
                                    display: 'flex',
                                    height: '24px',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    overflow: 'hidden',
                                    padding: theme.spacing.xs,
                                    borderRadius: theme.borders.borderRadiusSm,
                                    flexShrink: 0,
                                }}
                            >
                                <FileIcon {...({} as any)} style={{ width: '16px', height: '16px', color: theme.colors.textSecondary }} />
                            </div>
                            <div
                                style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'center',
                                    maxWidth: '254px',
                                    flexShrink: 0,
                                }}
                            >
                                <span
                                    style={{
                                        fontSize: theme.typography.fontSizeBase,
                                        lineHeight: theme.typography.lineHeightBase,
                                        color: theme.colors.textSecondary,
                                        whiteSpace: 'nowrap',
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis',

                                    }}
                                >
                                    file_name
                                </span>
                            </div>
                        </div>
                        <div
                            style={{
                                display: 'flex',
                                height: '24px',
                                alignItems: 'center',
                                justifyContent: 'center',
                                overflow: 'hidden',
                                padding: theme.spacing.xs,
                                borderRadius: theme.borders.borderRadiusSm,
                                flexShrink: 0,
                            }}
                        />
                    </div>
                </div>

                {/* Add Tab Button */}
                <div
                    style={{
                        display: 'flex',
                        height: '100%',
                        alignItems: 'center',
                        padding: `0 ${theme.spacing.xs}px`,
                        flexShrink: 0,
                    }}
                >
                    <button
                        style={{
                            display: 'flex',
                            height: '24px',
                            alignItems: 'center',
                            justifyContent: 'center',
                            overflow: 'hidden',
                            padding: theme.spacing.xs,
                            borderRadius: theme.borders.borderRadiusSm,
                            background: 'none',
                            border: 'none',
                            cursor: 'pointer',
                            color: theme.colors.textSecondary,
                            flexShrink: 0,
                        }}
                    >
                        <PlusIcon {...({} as any)} style={{ width: '16px', height: '16px' }} />
                    </button>
                </div>
            </div>

            {/* Right Actions */}
            <div
                style={{
                    backgroundColor: theme.colors.backgroundSecondary,
                    borderBottom: `1px solid ${theme.colors.border}`,
                    display: 'flex',
                    gap: theme.spacing.sm,
                    height: '100%',
                    alignItems: 'center',
                    padding: `0 ${theme.spacing.sm}px`,
                    flexShrink: 0,
                }}
            >
                <button
                    style={{
                        display: 'flex',
                        height: '24px',
                        alignItems: 'center',
                        justifyContent: 'center',
                        overflow: 'hidden',
                        padding: theme.spacing.xs,
                        borderRadius: theme.borders.borderRadiusSm,
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        color: theme.colors.textSecondary,
                        flexShrink: 0,
                    }}
                >
                    <ColumnSplitIcon {...({} as any)} style={{ width: '16px', height: '16px' }} />
                </button>
                <button
                    style={{
                        display: 'flex',
                        height: '24px',
                        alignItems: 'center',
                        justifyContent: 'center',
                        overflow: 'hidden',
                        padding: theme.spacing.xs,
                        borderRadius: theme.borders.borderRadiusSm,
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        color: theme.colors.textSecondary,
                        flexShrink: 0,
                    }}
                >
                    <OverflowIcon {...({} as any)} style={{ width: '16px', height: '16px' }} />
                </button>
            </div>
        </div>
    )
}
