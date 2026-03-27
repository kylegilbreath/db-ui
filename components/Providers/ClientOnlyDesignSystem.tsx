'use client'

import { useEffect, useState } from 'react'
import { MainLayout } from '@/components/Layout'
import { DesignSystemProvider } from '@/components/Providers/DesignSystemProvider'
import { ProtoConfigProvider, useProtoConfig, ProtoConfig, FlowOption, SubOption } from '@/components/ProtoConfig'

const themeOverrides = {
  colors: {
    backgroundSecondary: '#F7F7F7',
    textPrimary: '#161616',
    textSecondary: '#6F6F6F',
    border: '#EBEBEB',
  },
}

/**
 * Wraps the design system and main layout so they only render on the client.
 * The @databricks/design-system package references `window`, which is not
 * available during Next.js server-side rendering, causing a 500 error.
 */
export function ClientOnlyDesignSystem({
  children,
}: {
  children: React.ReactNode
}) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          background: '#F7F7F7',
          fontFamily: 'SF Pro Text, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
        }}
      >
        Loading...
      </div>
    )
  }

  return (
    <DesignSystemProvider themeOverrides={themeOverrides}>
      <ProtoConfigProvider>
        <MainLayout>{children}</MainLayout>
        <GlobalProtoConfig />
      </ProtoConfigProvider>
    </DesignSystemProvider>
  )
}

function GlobalProtoConfig() {
  const { selectedFlow, setSelectedFlow, selectedSub, setSelectedSub } = useProtoConfig()

  return (
    <ProtoConfig>
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
          <SubOption label="Variant 3" selected={selectedSub === 'sub-3'} onSelect={() => setSelectedSub('sub-3')} />
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
          <SubOption label="Variant 3" selected={selectedSub === 'sub-3'} onSelect={() => setSelectedSub('sub-3')} />
        </div>
      )}
    </ProtoConfig>
  )
}
