'use client'

import React from 'react'
import {
  useDesignSystemTheme,
  Button,
  ChevronUpIcon,
  SpeechBubbleIcon,
  FilterIcon,
  HistoryIcon,
  BracketsXIcon,
  SlidersIcon,
  InfoSmallIcon,
  GenieCodeIcon,
  CommandPaletteIcon,
  TerminalIcon,
  CheckCircleIcon,
} from '@databricks/design-system'

const RIGHT_BAR_WIDTH = 40

interface RightBarIconsProps {
  contentPanelCollapsed: boolean
  onToggleContentPanel: () => void
}

/**
 * Right bar icon strip — matches Figma selection "RightBar_Icons".
 * 40px vertical icon bar for the notebook right panel.
 */
export function RightBarIcons({
  contentPanelCollapsed,
  onToggleContentPanel,
}: RightBarIconsProps) {
  const { theme } = useDesignSystemTheme()

  const textSecondary = theme.colors.textSecondary
  const actionLinkBlue = theme.colors.actionTertiaryTextHover
  const actionHoverBg = theme.colors.actionTertiaryBackgroundHover
  const iconSize = { width: 16, height: 16 }
  const inactiveIconStyle = { color: textSecondary, ...iconSize }
  const activeIconStyle = { color: actionLinkBlue, ...iconSize }
  const activeWrapper = {
    width: '32px',
    height: '32px',
    padding: theme.spacing.sm,
    backgroundColor: actionHoverBg,
  }
  const inactiveWrapper = { width: '32px', height: '32px', padding: theme.spacing.sm }

  return (
    <div
      data-figma-component="RightBar_Icons"
      style={{
        width: `${RIGHT_BAR_WIDTH}px`,
        maxWidth: `${RIGHT_BAR_WIDTH}px`,
        flexShrink: 0,
        backgroundColor: theme.colors.backgroundPrimary,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        paddingTop: theme.spacing.sm,
        gap: theme.spacing.sm,
        borderLeft: `1px solid ${theme.colors.border}`,
        height: '100%',
      }}
    >
      {/* Top section: caret up, chat, filter, history, brackets-x, sliders, info, star */}
      <Button
        type="tertiary"
        icon={<ChevronUpIcon {...({} as any)} style={inactiveIconStyle} />}
        componentId="right-bar-chevron-up"
        dangerouslyAppendWrapperCss={inactiveWrapper}
      />
      <Button
        type="tertiary"
        icon={<SpeechBubbleIcon {...({} as any)} style={inactiveIconStyle} />}
        componentId="right-bar-variables"
        dangerouslyAppendWrapperCss={inactiveWrapper}
      />
      <Button
        type="tertiary"
        icon={<FilterIcon {...({} as any)} style={inactiveIconStyle} />}
        componentId="right-bar-filter"
        dangerouslyAppendWrapperCss={inactiveWrapper}
      />
      <Button
        type="tertiary"
        icon={<HistoryIcon {...({} as any)} style={inactiveIconStyle} />}
        componentId="right-bar-history"
        dangerouslyAppendWrapperCss={inactiveWrapper}
      />
      <Button
        type="tertiary"
        icon={
          <BracketsXIcon
            {...({} as any)}
            style={
              !contentPanelCollapsed ? activeIconStyle : inactiveIconStyle
            }
          />
        }
        onClick={onToggleContentPanel}
        componentId="right-bar-notifications"
        dangerouslyAppendWrapperCss={
          !contentPanelCollapsed ? activeWrapper : inactiveWrapper
        }
      />
      <Button
        type="tertiary"
        icon={<SlidersIcon {...({} as any)} style={inactiveIconStyle} />}
        componentId="right-bar-sliders"
        dangerouslyAppendWrapperCss={inactiveWrapper}
      />
      <Button
        type="tertiary"
        icon={<InfoSmallIcon {...({} as any)} style={inactiveIconStyle} />}
        componentId="right-bar-info"
        dangerouslyAppendWrapperCss={inactiveWrapper}
      />
      <Button
        type="tertiary"
        icon={<GenieCodeIcon {...({} as any)} style={inactiveIconStyle} />}
        componentId="right-bar-star"
        dangerouslyAppendWrapperCss={inactiveWrapper}
      />

      {/* Spacer — pushes bottom section to the bottom */}
      <div style={{ flex: 1, minHeight: theme.spacing.sm }} />

      {/* Bottom section: command palette, terminal, check */}
      <Button
        type="tertiary"
        icon={<CommandPaletteIcon {...({} as any)} style={inactiveIconStyle} />}
        componentId="right-bar-resize"
        dangerouslyAppendWrapperCss={inactiveWrapper}
      />
      <Button
        type="tertiary"
        icon={<TerminalIcon {...({} as any)} style={inactiveIconStyle} />}
        componentId="right-bar-terminal"
        dangerouslyAppendWrapperCss={inactiveWrapper}
      />
      <Button
        type="tertiary"
        icon={<CheckCircleIcon {...({} as any)} style={inactiveIconStyle} />}
        componentId="right-bar-check"
        dangerouslyAppendWrapperCss={inactiveWrapper}
      />
    </div>
  )
}
