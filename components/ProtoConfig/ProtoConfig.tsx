'use client'

import React, { useState } from 'react'
import { useDesignSystemTheme, PencilIcon, RefreshIcon } from '@databricks/design-system'
import { useProtoConfig } from './ProtoConfigContext'

/**
 * ProtoConfig — A floating prototype configuration panel.
 *
 * Renders a dark circular button (bottom-left) that expands into a config panel
 * with smooth scale/fade animations. Accepts children for the config content,
 * or use the built-in FlowOption/SubOption helpers for radio-style selectors.
 *
 * Usage:
 *   <ProtoConfig>
 *     <FlowOption label="Option A" description="..." selected={...} onSelect={...} />
 *     <SubOption label="Sub A" selected={...} onSelect={...} />
 *   </ProtoConfig>
 */

interface ProtoConfigProps {
  children: React.ReactNode
  title?: string
}

export function ProtoConfig({ children, title = 'Prototype config' }: ProtoConfigProps) {
  const { theme } = useDesignSystemTheme()
  const { startPath, resetConfig } = useProtoConfig()
  const [isOpen, setIsOpen] = useState(false)
  const [buttonHovered, setButtonHovered] = useState(false)
  const startOverDisabled = !startPath

  return (
    <div style={{ position: 'fixed', bottom: 24, left: 24, zIndex: 100 }}>
      {/* Expanded card */}
      <div
        style={{
          width: 260,
          backgroundColor: '#1b1f23',
          borderRadius: isOpen ? 16 : 18,
          boxShadow: isOpen
            ? '0 8px 32px rgba(0,0,0,0.3)'
            : '0 1px 3px rgba(0,0,0,0.12)',
          overflow: 'hidden',
          position: 'relative',
          transformOrigin: 'bottom left',
          transform: isOpen ? 'scale(1)' : 'scale(0.13)',
          opacity: isOpen ? 1 : 0,
          transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.25s ease, box-shadow 0.3s ease, border-radius 0.3s ease',
          pointerEvents: isOpen ? 'auto' : 'none',
        }}
      >
        {/* Header row: title + start over + dismiss */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 16px 12px' }}>
          <span style={{ fontSize: 14, fontWeight: 600, color: 'white' }}>
            {title}
          </span>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <button
              onClick={() => { if (!startOverDisabled) resetConfig() }}
              title={startOverDisabled ? 'No start path configured' : 'Start over'}
              style={{
                width: 24,
                height: 24,
                borderRadius: '50%',
                backgroundColor: 'rgba(255,255,255,0.1)',
                border: 'none',
                display: 'grid',
                placeItems: 'center',
                cursor: startOverDisabled ? 'default' : 'pointer',
                padding: 0,
                opacity: startOverDisabled ? 0.3 : 1,
                transition: 'opacity 0.15s ease',
                overflow: 'hidden',
              }}
            >
              <span style={{ display: 'grid', placeItems: 'center', width: 10, height: 10 }}>
                <RefreshIcon {...({} as any)} css={{ svg: { width: '10px !important', height: '10px !important', color: 'rgba(255,255,255,0.7)' } }} />
              </span>
            </button>
            <button
              onClick={() => setIsOpen(false)}
              style={{
                width: 24,
                height: 24,
                borderRadius: '50%',
                backgroundColor: 'rgba(255,255,255,0.1)',
                border: 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                padding: 0,
                fontSize: 14,
                lineHeight: 1,
                color: 'rgba(255,255,255,0.5)',
              }}
            >
              ×
            </button>
          </div>
        </div>

        {/* Content */}
        <div style={{ padding: '0 16px 16px', display: 'flex', flexDirection: 'column', gap: 8 }}>
          {children}
        </div>
      </div>

      {/* Circle button */}
      <button
        onClick={() => setIsOpen(true)}
        onMouseEnter={() => setButtonHovered(true)}
        onMouseLeave={() => setButtonHovered(false)}
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          width: 36,
          height: 36,
          borderRadius: '50%',
          backgroundColor: '#1b1f23',
          border: 'none',
          boxShadow: buttonHovered
            ? '0 4px 12px rgba(0,0,0,0.25)'
            : '0 1px 3px rgba(0,0,0,0.12)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          transform: isOpen ? 'scale(0)' : 'scale(1)',
          opacity: isOpen ? 0 : 1,
          transition: 'transform 0.25s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.2s ease, box-shadow 0.2s ease',
          pointerEvents: isOpen ? 'none' : 'auto',
        }}
      >
        <PencilIcon {...({} as any)} style={{ width: 16, height: 16, color: 'rgba(255,255,255,0.85)' }} />
      </button>
    </div>
  )
}

/**
 * FlowOption — A radio-style option with label and description.
 * Use inside ProtoConfig for top-level flow selections.
 */
export function FlowOption({ label, description, selected, onSelect }: {
  label: string
  description: string
  selected: boolean
  onSelect: () => void
}) {
  return (
    <button
      onClick={onSelect}
      style={{
        display: 'flex',
        alignItems: 'flex-start',
        gap: 10,
        padding: '10px 12px',
        borderRadius: 10,
        backgroundColor: selected ? 'rgba(255,255,255,0.1)' : 'transparent',
        border: selected ? '1px solid rgba(255,255,255,0.15)' : '1px solid transparent',
        cursor: 'pointer',
        textAlign: 'left',
        width: '100%',
        transition: 'background-color 0.15s ease, border-color 0.15s ease',
      }}
    >
      <div
        style={{
          width: 16,
          height: 16,
          borderRadius: '50%',
          border: selected ? '5px solid #6e9fff' : '2px solid rgba(255,255,255,0.25)',
          backgroundColor: 'transparent',
          flexShrink: 0,
          marginTop: 1,
          transition: 'border 0.15s ease',
        }}
      />
      <div>
        <div style={{ fontSize: 13, fontWeight: 500, color: 'white', lineHeight: '18px' }}>
          {label}
        </div>
        <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', lineHeight: '15px', marginTop: 2 }}>
          {description}
        </div>
      </div>
    </button>
  )
}

/**
 * SubOption — A smaller radio-style option for nested selections.
 * Use inside a FlowOption's expanded section.
 */
export function SubOption({ label, selected, onSelect }: {
  label: string
  selected: boolean
  onSelect: () => void
}) {
  return (
    <button
      onClick={onSelect}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        padding: '6px 8px',
        borderRadius: 6,
        backgroundColor: selected ? 'rgba(255,255,255,0.07)' : 'transparent',
        border: 'none',
        cursor: 'pointer',
        textAlign: 'left',
        width: '100%',
        transition: 'background-color 0.15s ease',
      }}
    >
      <div
        style={{
          width: 12,
          height: 12,
          borderRadius: '50%',
          border: selected ? '4px solid #6e9fff' : '1.5px solid rgba(255,255,255,0.25)',
          backgroundColor: 'transparent',
          flexShrink: 0,
          transition: 'border 0.15s ease',
        }}
      />
      <span style={{ fontSize: 12, color: selected ? 'white' : 'rgba(255,255,255,0.5)', lineHeight: '16px' }}>
        {label}
      </span>
    </button>
  )
}
