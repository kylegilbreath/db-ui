'use client'

import React, { useState } from 'react'
import { ProtoConfig, FlowOption, SubOption } from './ProtoConfig'

/**
 * ProtoConfigDemo — Drop-in demo of the ProtoConfig panel with mock flows and links.
 * Add this to any page to get a working prototype config panel with example options.
 *
 * Usage:
 *   import { ProtoConfigDemo } from '@/components/ProtoConfig'
 *   // Then in your page:
 *   <ProtoConfigDemo />
 */

const MOCK_LINKS = [
  { label: 'Notebook', href: '/workspace/notebook' },
  { label: 'Home', href: '/home' },
  { label: 'Workspace', href: '/workspace' },
]

export function ProtoConfigDemo() {
  const [selectedFlow, setSelectedFlow] = useState('flow-a')
  const [selectedSub, setSelectedSub] = useState('sub-1')

  return (
    <ProtoConfig title="Prototype config">
      {/* Mock flows */}
      <FlowOption
        label="Flow A"
        description="Default experience with standard layout"
        selected={selectedFlow === 'flow-a'}
        onSelect={() => setSelectedFlow('flow-a')}
      />
      {selectedFlow === 'flow-a' && (
        <div style={{ paddingLeft: 16, display: 'flex', flexDirection: 'column', gap: 4 }}>
          <SubOption label="Variant 1" selected={selectedSub === 'sub-1'} onSelect={() => setSelectedSub('sub-1')} />
          <SubOption label="Variant 2" selected={selectedSub === 'sub-2'} onSelect={() => setSelectedSub('sub-2')} />
        </div>
      )}

      <FlowOption
        label="Flow B"
        description="Alternative layout with combined elements"
        selected={selectedFlow === 'flow-b'}
        onSelect={() => setSelectedFlow('flow-b')}
      />
      {selectedFlow === 'flow-b' && (
        <div style={{ paddingLeft: 16, display: 'flex', flexDirection: 'column', gap: 4 }}>
          <SubOption label="Variant 1" selected={selectedSub === 'sub-1'} onSelect={() => setSelectedSub('sub-1')} />
          <SubOption label="Variant 2" selected={selectedSub === 'sub-2'} onSelect={() => setSelectedSub('sub-2')} />
        </div>
      )}

      {/* Mock links */}
      <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: 8, marginTop: 4 }}>
        <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)', padding: '0 12px 4px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          Jump to
        </div>
        {MOCK_LINKS.map((link) => (
          <a
            key={link.href}
            href={link.href}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              padding: '6px 12px',
              borderRadius: 6,
              backgroundColor: 'transparent',
              textDecoration: 'none',
              fontSize: 12,
              color: 'rgba(255,255,255,0.5)',
              transition: 'background-color 0.15s ease',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.07)' }}
            onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent' }}
          >
            {link.label}
          </a>
        ))}
      </div>
    </ProtoConfig>
  )
}
