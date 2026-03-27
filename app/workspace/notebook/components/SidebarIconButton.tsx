'use client'

import React, { useState } from 'react'
import { useDesignSystemTheme, Button, Tooltip } from '@databricks/design-system'
import type { ComponentType } from 'react'

interface SidebarIconButtonProps {
  icon: ComponentType<any>
  componentId: string
  isActive?: boolean
  tooltip?: string
  onClick?: () => void
}

export function SidebarIconButton({
  icon: Icon,
  componentId,
  isActive = false,
  tooltip,
  onClick,
}: SidebarIconButtonProps) {
  const { theme } = useDesignSystemTheme()
  const [isHovered, setIsHovered] = useState(false)

  const iconColor = isHovered || isActive
    ? (theme.colors.actionDefaultIconHover || theme.colors.textPrimary)
    : theme.colors.textSecondary;

  const backgroundColor = isActive ? theme.colors.actionTertiaryBackgroundHover : undefined;

  const buttonContent = (
    <div
      style={{
        position: 'relative',
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        style={{
          backgroundColor,
          borderRadius: theme.borders.borderRadiusSm,
        }}
      >
        <Button
          type="tertiary"
          icon={<Icon {...({} as any)} style={{ color: iconColor }} />}
          componentId={componentId}
          onClick={onClick}
        />
      </div>
    </div>
  )

  if (tooltip) {
    return (
      <Tooltip content={tooltip} side="right" sideOffset={8} componentId={`${componentId}-tooltip`}>
        {buttonContent}
      </Tooltip>
    )
  }

  return buttonContent
}
