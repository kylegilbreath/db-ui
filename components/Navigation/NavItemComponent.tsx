'use client'

import { useState } from 'react'
import Link from 'next/link'
import type { ComponentType } from 'react'
import { useDesignSystemTheme } from '@databricks/design-system'

export interface NavItem {
  path: string
  label: string
  icon: ComponentType<any>
  section?: string
  disabled?: boolean
}

interface NavItemComponentProps {
  item: NavItem
  isActive: boolean
  isOpen: boolean
}

export function NavItemComponent({ item, isActive, isOpen }: NavItemComponentProps) {
  const [hoverState, setHoverState] = useState<'Default' | 'Hover' | 'Press'>('Default')
  const [isPressed, setIsPressed] = useState(false)
  const { theme } = useDesignSystemTheme()
  const IconComponent = item.icon
  
  // Determine state based on Figma design
  const state = item.disabled 
    ? 'Disabled' 
    : isPressed 
    ? 'Press' 
    : hoverState
  
  const isSelected = isActive && !item.disabled
  
  // Styles based on Figma design states
  const getStyles = () => {
    if (item.disabled) {
      return {
        backgroundColor: 'transparent',
        color: theme.colors.actionDisabledText || '#a2a2a2',
        fontWeight: 400,
      }
    }
    
    if (isSelected) {
      return {
        backgroundColor: theme.colors.actionDefaultBackgroundHover || 'rgba(34, 114, 180, 0.08)',
        color: theme.colors.actionTertiaryTextHover || '#0e538b',
        fontWeight: theme.typography.typographyBoldFontWeight,
      }
    }
    
    if (state === 'Hover' || state === 'Press') {
      return {
        backgroundColor: theme.colors.actionDefaultBackgroundHover || 'rgba(34, 114, 180, 0.08)',
        color: theme.colors.actionTertiaryTextHover || '#0e538b',
        fontWeight: 400,
      }
    }
    
    // Default state
    return {
      backgroundColor: 'transparent',
      color: theme.colors.textPrimary || '#161616',
      fontWeight: 400,
    }
  }
  
  const styles = getStyles()
  const borderRadius = theme.borders?.borderRadiusSm || '4px'
  
  // Determine icon color based on state
  const getIconColor = () => {
    if (item.disabled) {
      return theme.colors.actionDisabledText || '#a2a2a2'
    }
    if (isSelected || state === 'Hover' || state === 'Press') {
      return theme.colors.actionTertiaryTextHover || '#0e538b'
    }
    return '#7f8f9a' // Resting state color
  }
  
  const iconColor = getIconColor()
  
  const content = (
    <div
      style={{
        display: 'flex',
        gap: theme.spacing.sm,
        height: '28px',
        alignItems: 'center',
        padding: '0 12px',
        borderRadius: borderRadius,
        width: isOpen ? '176px' : 'auto',
        backgroundColor: styles.backgroundColor,
        color: styles.color,
        cursor: item.disabled ? 'not-allowed' : 'pointer',
        transition: 'all 0.2s',
        fontSize: theme.typography.fontSizeBase,
        lineHeight: theme.typography.lineHeightBase,
        fontWeight: styles.fontWeight,
      }}
      onMouseEnter={() => !item.disabled && setHoverState('Hover')}
      onMouseLeave={() => {
        setHoverState('Default')
        setIsPressed(false)
      }}
      onMouseDown={() => !item.disabled && setIsPressed(true)}
      onMouseUp={() => !item.disabled && setIsPressed(false)}
    >
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
        <IconComponent {...({} as any)} />
      </div>
      {isOpen && (
        <span style={{ whiteSpace: 'nowrap' }}>
          {item.label}
        </span>
      )}
    </div>
  )
  
  if (item.disabled) {
    return content
  }
  
  return (
    <Link
      href={item.path}
      style={{ textDecoration: 'none', display: 'block' }}
    >
      {content}
    </Link>
  )
}
