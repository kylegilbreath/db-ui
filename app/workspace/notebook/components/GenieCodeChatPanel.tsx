'use client'

import React, { useState } from 'react'
import { useDesignSystemTheme } from '@databricks/design-system'
import { GenieCodeIcon } from '@/lib/icons/GenieCodeIcon'
import { GenieCodeChatInput, type ChatInputState } from './GenieCodeChatInput'

/** Suggested prompt for the empty state (Figma 8428:18055) */
const SUGGESTED_PROMPTS = [
  'Perform basic exploratory data analysis on the properties in @ski_resorts',
  'Show top and bottom 10 resorts by each key metric.',
  'Cluster resorts into groups based on price, size, and snowfall.',
]

/** Small gradient arrow icon for suggestion cards (unique id per instance to avoid DOM conflicts) */
function PromptArrowIcon({ id }: { id: string }) {
  return (
    <svg width={20} height={20} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: 0, display: 'block' }}>
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="1" y2="1" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#4299E0" />
          <stop offset="50%" stopColor="#CA42E0" />
          <stop offset="100%" stopColor="#FF5F46" />
        </linearGradient>
      </defs>
      <path
        d="M4 10h8m0 0l-3-3m3 3l-3 3"
        stroke={`url(#${id})`}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

/** Lavender bubble color for user message (Figma 8421:10871) */
const MESSAGE_BUBBLE_BG = 'rgba(246, 233, 255, 1)'

export function GenieCodeChatPanel() {
  const { theme } = useDesignSystemTheme()
  const [inputValue, setInputValue] = useState('')
  const [chatInputState, setChatInputState] = useState<ChatInputState>('default')
  const [hoveredPromptIndex, setHoveredPromptIndex] = useState<number | null>(null)
  /** When true, user clicked first suggested prompt – show agent-active view (Figma 8421:10871) */
  const [showAgentView, setShowAgentView] = useState(false)
  const [sentPrompt, setSentPrompt] = useState<string | null>(null)

  const textPrimary = theme.colors.textPrimary ?? 'rgb(22, 22, 22)'
  const textSecondary = theme.colors.textSecondary ?? 'rgb(111, 111, 111)'
  const borderColor = theme.colors.border ?? 'rgb(235, 235, 235)'
  const hoverBg = theme.colors.actionTertiaryBackgroundHover ?? 'rgba(0, 0, 0, 0.04)'
  const fontFamily = (theme.typography as { fontFamily?: string })?.fontFamily ?? 'inherit'
  const fontSizeBase = theme.typography?.fontSizeBase ?? 13

  const handleSuggestionClick = (prompt: string, index: number) => {
    if (index === 0) {
      setInputValue('')
      setShowAgentView(true)
      setSentPrompt(prompt)
      setChatInputState('agentActive')
    } else {
      setInputValue(prompt)
    }
  }

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
        minHeight: 0,
      }}
    >
      {/* Content: empty state vs agent-active (Figma 8421:10871) */}
      <div
        style={{
          flex: 1,
          overflow: 'auto',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: showAgentView ? 'flex-start' : 'center',
          paddingTop: 24,
          paddingBottom: 16,
        }}
      >
        {showAgentView && sentPrompt ? (
          /* Agent-active view: message bubble, then genie icon on row below (Figma 8421:10871) */
          <div
            style={{
              width: '100%',
              maxWidth: 320,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-end',
              gap: 10,
              paddingRight: 8,
            }}
          >
            <div
              style={{
                width: '100%',
                minWidth: 0,
                padding: '12px 14px',
                borderRadius: '8px 8px 0px 8px',
                background: MESSAGE_BUBBLE_BG,
                fontFamily,
                fontSize: fontSizeBase,
                color: textPrimary,
                lineHeight: 1.4,
                textAlign: 'left',
              }}
            >
              {sentPrompt}
            </div>
            <GenieCodeIcon width={32} height={32} style={{ flexShrink: 0, alignSelf: 'flex-start' }} />
          </div>
        ) : (
          <>
            <GenieCodeIcon width={48} height={48} style={{ marginBottom: 12 }} />
            <h2
              style={{
                fontSize: 18,
                fontWeight: 600,
                color: textPrimary,
                margin: 0,
                marginBottom: 8,
                fontFamily,
              }}
            >
              Genie Code
            </h2>
            <p
              style={{
                fontSize: fontSizeBase,
                color: textSecondary,
                margin: 0,
                marginBottom: 24,
                textAlign: 'center',
                maxWidth: 280,
                lineHeight: 1.4,
                fontFamily,
              }}
            >
              Genie Code is an autonomous AI partner for modern data teams.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, width: '100%', maxWidth: 320 }}>
              {SUGGESTED_PROMPTS.map((prompt, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => handleSuggestionClick(prompt, i)}
                  onMouseEnter={() => setHoveredPromptIndex(i)}
                  onMouseLeave={() => setHoveredPromptIndex(null)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 12,
                    padding: '12px 14px',
                    borderRadius: 8,
                    border: `1px solid ${borderColor}`,
                    background: hoveredPromptIndex === i ? hoverBg : (theme.colors.backgroundPrimary ?? '#fff'),
                    cursor: 'pointer',
                    textAlign: 'left',
                    fontFamily,
                    fontSize: fontSizeBase,
                    color: textPrimary,
                    lineHeight: 1.4,
                  }}
                >
                  <PromptArrowIcon id={`genie-prompt-arrow-${i}`} />
                  <span style={{ flex: 1, minWidth: 0 }}>{prompt}</span>
                </button>
              ))}
            </div>
          </>
        )}
      </div>

      {/* Chat input – rotating border when agent active (Figma 8421:10915) */}
      <GenieCodeChatInput
        value={inputValue}
        onChange={setInputValue}
        inputState={chatInputState}
        rotatingBorder={showAgentView}
        projectContextLabel="Project Alpha - Q42025"
        onProjectContextClear={() => setChatInputState('default')}
        onSend={() => {}}
        onStop={() => {
          setChatInputState('default')
          setShowAgentView(false)
          setSentPrompt(null)
        }}
        onRejectAll={() => setChatInputState('default')}
        onAcceptAll={() => setChatInputState('default')}
      />
    </div>
  )
}
