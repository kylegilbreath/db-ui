'use client'

import React from 'react'

export interface GenieCodeIconProps {
  width?: number | string
  height?: number | string
  className?: string
  style?: React.CSSProperties
}

/** Genie Code gradient icon (matches notebook cell AI toolbar). Used in top nav, main sidebar Genie, right sidebar assistant, and cells. */
export function GenieCodeIcon({
  width = 16,
  height = 16,
  className,
  style,
}: GenieCodeIconProps) {
  const uid = React.useId().replace(/:/g, '')
  const gradientId = `genie-code-gradient-${uid}`
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={style}
    >
      <defs>
        <linearGradient id={gradientId} x1="16" y1="0" x2="0" y2="16" gradientUnits="userSpaceOnUse">
          <stop offset="20%" stopColor="#FF5F46" />
          <stop offset="54%" stopColor="#CA42E0" />
          <stop offset="89%" stopColor="#4299E0" />
        </linearGradient>
      </defs>
      <path
        fill={`url(#${gradientId})`}
        d="M0 8.75v-.744c0-.97.786-1.756 1.756-1.756h1.1c.372 0 .712.21.878.543l.595 1.188a4.104 4.104 0 0 0 7.342 0l.595-1.188.069-.12a.98.98 0 0 1 .809-.423H16v1.5h-2.536l-.451.902a5.604 5.604 0 0 1-10.026 0l-.45-.902h-.781a.256.256 0 0 0-.256.256v.744a.5.5 0 0 0 .5.5v1.5a2 2 0 0 1-2-2m10.5 4v1.5h-5v-1.5zM8 1.75a.75.75 0 0 1 .74.621l.226 1.303a.75.75 0 0 0 .61.61l1.303.227a.75.75 0 0 1 0 1.478l-1.303.227a.75.75 0 0 0-.61.61L8.739 8.13a.75.75 0 0 1-1.478 0l-.227-1.303a.75.75 0 0 0-.61-.61L5.12 5.989a.75.75 0 0 1 0-1.478l1.303-.227a.75.75 0 0 0 .61-.61l.227-1.303.035-.13A.75.75 0 0 1 8 1.75"
      />
    </svg>
  )
}
