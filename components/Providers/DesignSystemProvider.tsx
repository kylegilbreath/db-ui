'use client'

import { ThemeProvider } from '@emotion/react'
import { DesignSystemProvider as DuboisDesignSystemProvider, useDesignSystemTheme } from '@databricks/design-system'
import React from 'react'

interface ThemeOverrides {
  colors?: Partial<Record<string, string>>
  spacing?: Partial<Record<string, number>>
  typography?: Partial<Record<string, string | number>>
}

interface CustomDesignSystemProviderProps {
  children: React.ReactNode
  themeOverrides?: ThemeOverrides
}

// Inner component that has access to the design system theme
function ThemeOverrideProvider({ 
  children, 
  themeOverrides 
}: { 
  children: React.ReactNode
  themeOverrides?: ThemeOverrides 
}) {
  const { theme } = useDesignSystemTheme()
  
  // Merge theme with overrides
  const mergedTheme = React.useMemo(() => {
    if (!themeOverrides) return theme
    
    return {
      ...theme,
      colors: {
        ...theme.colors,
        ...(themeOverrides.colors || {}),
      },
      spacing: {
        ...theme.spacing,
        ...(themeOverrides.spacing || {}),
      },
      typography: {
        ...theme.typography,
        ...(themeOverrides.typography || {}),
      },
    }
  }, [theme, themeOverrides])
  
  return (
    <ThemeProvider theme={mergedTheme}>
      {children}
    </ThemeProvider>
  )
}

export function DesignSystemProvider({ 
  children,
  themeOverrides 
}: CustomDesignSystemProviderProps) {
  return (
    <DuboisDesignSystemProvider>
      <ThemeOverrideProvider themeOverrides={themeOverrides}>
        {children}
      </ThemeOverrideProvider>
    </DuboisDesignSystemProvider>
  )
}
