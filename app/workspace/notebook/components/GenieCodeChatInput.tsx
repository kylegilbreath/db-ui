'use client'

import React, { useState, useRef, useEffect } from 'react'
import {
  useDesignSystemTheme,
  ChevronDownIcon,
  ChevronRightIcon,
  CloseSmallIcon,
  PaperclipIcon,
  AtIcon,
  SendIcon,
  StopIcon,
} from '@databricks/design-system'

/** Input state from Figma Agentic UX Patterns (103:8116) */
export type ChatInputState =
  | 'default'
  | 'projectSelected'
  | 'agentActive'
  | 'agentActiveWithCells'
  | 'agentActiveWithQueuedAndCells'
  | 'cellsWithActions'

const iconSize = { width: 16, height: 16 }

const PLACEHOLDER_DEFAULT = "`@` for objects or `/` for commands, `↑↓` for history"
const PLACEHOLDER_FOLLOW_UP = "Send follow-up messages to guide the Agent"


interface GenieCodeChatInputProps {
  value: string
  onChange: (value: string) => void
  /** Control which Figma state to show (for demo; in prod derive from agent/cells) */
  inputState?: ChatInputState
  /** When true, 2px border animates through colors (Figma 8421:10915) */
  rotatingBorder?: boolean
  /** When projectSelected, label for the context pill */
  projectContextLabel?: string
  onProjectContextClear?: () => void
  onSend?: () => void
  onStop?: () => void
  onRejectAll?: () => void
  onAcceptAll?: () => void
}

export function GenieCodeChatInput({
  value,
  onChange,
  inputState = 'default',
  rotatingBorder = false,
  projectContextLabel = 'Project Alpha - Q42025',
  onProjectContextClear,
  onSend,
  onStop,
  onRejectAll,
  onAcceptAll,
}: GenieCodeChatInputProps) {
  const { theme } = useDesignSystemTheme()
  const [queuedExpanded, setQueuedExpanded] = useState(false)
  const [cellsExpanded, setCellsExpanded] = useState(false)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const MIN_TEXTAREA_HEIGHT = 22
  const MAX_TEXTAREA_HEIGHT = 200

  function adjustTextareaHeight() {
    const el = textareaRef.current
    if (!el) return
    if (!el.value.trim()) {
      el.style.height = `${MIN_TEXTAREA_HEIGHT}px`
      return
    }
    el.style.height = 'auto'
    const height = Math.min(Math.max(el.scrollHeight, MIN_TEXTAREA_HEIGHT), MAX_TEXTAREA_HEIGHT)
    el.style.height = `${height}px`
  }

  useEffect(() => {
    adjustTextareaHeight()
  }, [value])

  const textPrimary = theme.colors.textPrimary ?? 'rgb(22, 22, 22)'
  const textSecondary = theme.colors.textSecondary ?? 'rgb(111, 111, 111)'
  const borderColor = theme.colors.border ?? 'rgb(235, 235, 235)'
  const fontFamily = (theme.typography as { fontFamily?: string })?.fontFamily ?? 'inherit'
  const fontSizeBase = theme.typography?.fontSizeBase ?? 13

  const isAgentActive =
    inputState === 'agentActive' ||
    inputState === 'agentActiveWithCells' ||
    inputState === 'agentActiveWithQueuedAndCells'
  const showCellsRow =
    inputState === 'agentActiveWithCells' ||
    inputState === 'agentActiveWithQueuedAndCells' ||
    inputState === 'cellsWithActions'
  const showQueuedRow = inputState === 'agentActiveWithQueuedAndCells'
  const showActionButtons = inputState === 'cellsWithActions'

  const placeholder = isAgentActive && inputState !== 'cellsWithActions' ? PLACEHOLDER_FOLLOW_UP : PLACEHOLDER_DEFAULT

  const inputBorderWidth = rotatingBorder ? 2 : 1
  /** Purple for traveling glow – matches chat bubble tint */
  const glowBorderColor = '#B8A0D8'

  const inputContainerStyle = {
    border: rotatingBorder ? undefined : `1px solid ${borderColor}`,
    borderRadius: 8,
    backgroundColor: theme.colors.backgroundPrimary ?? '#fff',
    overflow: 'hidden' as const,
  }

  return (
    <div style={{ flexShrink: 0, paddingTop: 12 }}>
      <style>{`
        .genie-chat-input-field:focus { outline: none; box-shadow: none; }
        @property --genie-glow-angle {
          syntax: "<angle>";
          initial-value: 0deg;
          inherits: false;
        }
        .genie-glow-border-wrap {
          position: relative;
          padding: 2px;
          border-radius: 10px;
          --genie-glow-angle: 0deg;
          background:
            conic-gradient(
              from calc(var(--genie-glow-angle) + 180deg),
              ${glowBorderColor} 0deg,
              ${glowBorderColor} 40deg,
              transparent 40deg
            ),
            conic-gradient(
              from var(--genie-glow-angle),
              ${glowBorderColor} 0deg,
              ${glowBorderColor} 40deg,
              transparent 40deg
            ),
            var(--genie-border-gray);
          animation: genie-glow-spin 2s linear infinite;
        }
        .genie-glow-border-inner {
          position: relative;
          z-index: 1;
          margin: 0;
          border-radius: 8px;
          background: var(--genie-input-bg, #fff);
          min-height: 0;
        }
        @keyframes genie-glow-spin {
          to { --genie-glow-angle: 360deg; }
        }
      `}</style>
      <div
        className={rotatingBorder ? 'genie-glow-border-wrap' : undefined}
        style={
          rotatingBorder
            ? {
                ['--genie-input-bg' as string]: theme.colors.backgroundPrimary ?? '#fff',
                ['--genie-border-gray' as string]: borderColor,
              }
            : undefined
        }
      >
        <div
          style={{
            ...inputContainerStyle,
            ...(rotatingBorder
              ? { border: 'none', margin: 0, borderRadius: 8 }
              : {}),
          }}
          className={rotatingBorder ? 'genie-glow-border-inner' : undefined}
        >
        {/* Optional: context pill (Project selected state) */}
        {inputState === 'projectSelected' && (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              padding: '8px 12px 6px',
              borderBottom: `1px solid ${borderColor}`,
            }}
          >
            <span
              style={{
                fontSize: 12,
                color: textSecondary,
                fontFamily,
                backgroundColor: theme.colors.backgroundSecondary ?? '#f5f5f5',
                padding: '4px 10px',
                borderRadius: 999,
              }}
            >
              {projectContextLabel}
            </span>
            <button
              type="button"
              onClick={onProjectContextClear}
              aria-label="Clear project context"
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: 2,
                color: textSecondary,
                display: 'flex',
              }}
            >
              <CloseSmallIcon {...({} as any)} style={{ width: 12, height: 12 }} />
            </button>
          </div>
        )}

        {/* Optional: status rows (1 queued, 3 cells) + action buttons */}
        {(showQueuedRow || showCellsRow || showActionButtons) && (
          <div
            style={{
              padding: '8px 12px 0',
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              gap: 8,
            }}
          >
            {showQueuedRow && (
              <button
                type="button"
                onClick={() => setQueuedExpanded((e) => !e)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 4,
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  padding: '4px 0',
                  fontSize: 12,
                  color: textSecondary,
                  fontFamily,
                }}
              >
                <ChevronRightIcon {...({} as any)} style={{ width: 14, height: 14, transform: queuedExpanded ? 'rotate(90deg)' : undefined }} />
                1 queued
              </button>
            )}
            {showCellsRow && (
              <button
                type="button"
                onClick={() => setCellsExpanded((e) => !e)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 4,
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  padding: '4px 0',
                  fontSize: 12,
                  color: textSecondary,
                  fontFamily,
                }}
              >
                <ChevronRightIcon {...({} as any)} style={{ width: 14, height: 14, transform: cellsExpanded ? 'rotate(90deg)' : undefined }} />
                3 cells
              </button>
            )}
            {showActionButtons && (
              <>
                <button
                  type="button"
                  onClick={onRejectAll}
                  style={{
                    marginLeft: 'auto',
                    padding: '4px 10px',
                    borderRadius: 4,
                    border: `1px solid ${borderColor}`,
                    background: theme.colors.backgroundSecondary ?? '#f5f5f5',
                    cursor: 'pointer',
                    fontSize: 11,
                    color: textSecondary,
                    fontFamily,
                  }}
                >
                  Reject all <kbd style={{ marginLeft: 4, opacity: 0.8 }}>ESC</kbd>
                </button>
                <button
                  type="button"
                  onClick={onAcceptAll}
                  style={{
                    padding: '4px 10px',
                    borderRadius: 4,
                    border: 'none',
                    background: theme.colors.actionDefaultBackgroundDefault ?? '#2272B4',
                    color: '#fff',
                    cursor: 'pointer',
                    fontSize: 11,
                    fontFamily,
                  }}
                >
                  Accept all <kbd style={{ marginLeft: 4, opacity: 0.9 }}>⌘+⏎</kbd>
                </button>
              </>
            )}
          </div>
        )}

        {/* Row 1: Text input area only (grows with content) */}
        <div style={{ padding: '10px 12px 4px' }}>
          <textarea
            ref={textareaRef}
            className="genie-chat-input-field"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            rows={1}
            spellCheck={false}
            autoComplete="off"
            data-gramm="false"
            data-enable-grammarly="false"
            style={{
              width: '100%',
              border: 'none',
              background: 'transparent',
              outline: 'none',
              boxShadow: 'none',
              resize: 'none',
              overflow: 'auto',
              fontSize: fontSizeBase,
              color: textPrimary,
              fontFamily,
              lineHeight: 1.4,
              minHeight: MIN_TEXTAREA_HEIGHT,
              maxHeight: MAX_TEXTAREA_HEIGHT,
            }}
          />
        </div>

        {/* Row 2: Attach + @ on left, Agent + Send/Stop on right (all same row) */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 4,
            padding: '4px 12px 10px',
          }}
        >
          <button
            type="button"
            aria-label="Attach"
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: 4,
              color: textSecondary,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 24,
              height: 24,
            }}
          >
            <PaperclipIcon {...({} as any)} style={iconSize} />
          </button>
          <button
            type="button"
            aria-label="Insert object reference"
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: 4,
              color: textSecondary,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 24,
              height: 24,
            }}
          >
            <AtIcon {...({} as any)} style={iconSize} />
          </button>
          <div style={{ flex: 1, minWidth: 0 }} />
          <button
            type="button"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 4,
              padding: '5px 8px',
              borderRadius: 4,
              border: `1px solid ${borderColor}`,
              background: theme.colors.backgroundPrimary ?? '#fff',
              cursor: 'pointer',
              fontFamily,
              fontSize: 12,
              color: textPrimary,
              flexShrink: 0,
            }}
          >
            Agent
            <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 14, height: 14 }}>
              <ChevronDownIcon {...({} as any)} style={{ width: 14, height: 14 }} />
            </span>
          </button>
          {isAgentActive ? (
            <button
              type="button"
              onClick={onStop}
              aria-label="Stop agent"
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: 4,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: 24,
                height: 24,
                flexShrink: 0,
              }}
            >
              <StopIcon {...({} as any)} style={iconSize} />
            </button>
          ) : (
            <button
              type="button"
              onClick={onSend}
              aria-label="Send"
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: 4,
                color: textSecondary,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: 24,
                height: 24,
                flexShrink: 0,
              }}
            >
              <SendIcon {...({} as any)} style={iconSize} />
            </button>
          )}
        </div>
        </div>
      </div>

      <p
        style={{
          margin: 0,
          marginTop: 8,
          fontSize: 11,
          color: textSecondary,
          textAlign: 'center',
          fontFamily,
        }}
      >
        Always review the accuracy of responses.
      </p>
    </div>
  )
}
