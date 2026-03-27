'use client'

import React, { useState, useRef, useEffect } from 'react'
import {
  useDesignSystemTheme,
  Button,
  PlayIcon,
  ChevronDownIcon,
  SplitButton,
  DragIcon,
  OverflowIcon,
  TrashIcon,
  FullscreenIcon,
} from '@databricks/design-system'
import { GenieCodeIcon } from '@/lib/icons/GenieCodeIcon'

// --- Simple syntax highlighter ---

const SQL_KEYWORDS = new Set([
  'SELECT', 'FROM', 'WHERE', 'INSERT', 'UPDATE', 'DELETE', 'CREATE', 'DROP',
  'ALTER', 'TABLE', 'INDEX', 'VIEW', 'JOIN', 'INNER', 'LEFT', 'RIGHT', 'OUTER',
  'ON', 'AND', 'OR', 'NOT', 'IN', 'IS', 'NULL', 'AS', 'ORDER', 'BY', 'GROUP',
  'HAVING', 'LIMIT', 'OFFSET', 'UNION', 'ALL', 'DISTINCT', 'BETWEEN', 'LIKE',
  'EXISTS', 'CASE', 'WHEN', 'THEN', 'ELSE', 'END', 'INTO', 'VALUES', 'SET',
  'WITH', 'DESC', 'ASC', 'COUNT', 'SUM', 'AVG', 'MIN', 'MAX', 'CAST',
])

const PYTHON_KEYWORDS = new Set([
  'def', 'class', 'import', 'from', 'return', 'if', 'elif', 'else', 'for',
  'while', 'try', 'except', 'finally', 'with', 'as', 'yield', 'lambda',
  'pass', 'break', 'continue', 'raise', 'in', 'not', 'and', 'or', 'is',
  'None', 'True', 'False', 'print', 'self', 'async', 'await',
])

function highlightSQL(code: string, inlineHint?: React.ReactNode): React.ReactNode[] {
  return code.split('\n').map((line, lineIdx) => {
    // Handle %sql magic command (both %sql <name> and %sql --name <name>)
    if (line.trimStart().startsWith('%sql')) {
      const indent = line.match(/^(\s*)/)?.[0] || ''
      const trimmed = line.trimStart().slice(4).trim()
      const nameMatch = trimmed.match(/^--name\s+(\S+)/)
      const name = nameMatch ? nameMatch[1] : (trimmed.split(/\s/)[0] || '')
      const prefix = nameMatch ? '--name ' : ''
      return (
        <span key={lineIdx}>
          {indent}
          <span style={{ color: '#161616' }}>%sql</span>
          {name && (
            <>
              {' '}
              {prefix && <span style={{ color: '#6F6F6F' }}>{prefix}</span>}
              <span style={{
                backgroundColor: name === '_sqldf' ? '#e2e2e2' : '#D7EDFE',
                color: name === '_sqldf' ? '#9e9e9e' : '#2272B4',
                padding: '0 2px',
                borderRadius: 2,
              }}>{name}</span>
              {inlineHint}
            </>
          )}
        </span>
      )
    }
    // Tokenize the line
    const tokens = line.split(/(\s+|,|\(|\)|\.|\*|'[^']*'|"[^"]*")/g)
    return (
      <span key={lineIdx}>
        {tokens.map((token, i) => {
          if (SQL_KEYWORDS.has(token.toUpperCase())) {
            return <span key={i} style={{ color: '#0550AE', fontWeight: 600 }}>{token}</span>
          }
          if (/^'[^']*'$/.test(token) || /^"[^"]*"$/.test(token)) {
            return <span key={i} style={{ color: '#0A3069' }}>{token}</span>
          }
          if (/^\d+$/.test(token)) {
            return <span key={i} style={{ color: '#0550AE' }}>{token}</span>
          }
          if (/^--/.test(token)) {
            return <span key={i} style={{ color: '#6F6F6F' }}>{token}</span>
          }
          return <span key={i}>{token}</span>
        })}
      </span>
    )
  })
}

function highlightPython(code: string): React.ReactNode[] {
  return code.split('\n').map((line, lineIdx) => {
    // Handle comments
    const commentIdx = line.indexOf('#')
    const codePart = commentIdx >= 0 ? line.slice(0, commentIdx) : line
    const commentPart = commentIdx >= 0 ? line.slice(commentIdx) : ''

    const tokens = codePart.split(/(\s+|,|\(|\)|\[|\]|\{|\}|\.|\*|:|=|'[^']*'|"[^"]*"|f"[^"]*")/g)
    return (
      <span key={lineIdx}>
        {tokens.map((token, i) => {
          if (PYTHON_KEYWORDS.has(token)) {
            return <span key={i} style={{ color: '#0550AE', fontWeight: 600 }}>{token}</span>
          }
          if (/^['"]/.test(token) || /^f"/.test(token)) {
            return <span key={i} style={{ color: '#0A3069' }}>{token}</span>
          }
          if (/^\d+(\.\d+)?$/.test(token)) {
            return <span key={i} style={{ color: '#0550AE' }}>{token}</span>
          }
          // Function calls
          if (/^[a-zA-Z_]\w*$/.test(token) && i + 1 < tokens.length && tokens[i + 1] === '(') {
            return <span key={i} style={{ color: '#8250DF' }}>{token}</span>
          }
          // Decorators / magic
          if (token.startsWith('@') || token.startsWith('%')) {
            return <span key={i} style={{ color: '#6F6F6F' }}>{token}</span>
          }
          return <span key={i}>{token}</span>
        })}
        {commentPart && <span style={{ color: '#6F6F6F' }}>{commentPart}</span>}
      </span>
    )
  })
}

function highlightCode(code: string, cellType: 'Python' | 'SQL' | 'Markdown', inlineHint?: React.ReactNode): React.ReactNode[] {
  if (cellType === 'SQL') return highlightSQL(code, inlineHint)
  if (cellType === 'Python') return highlightPython(code)
  return code.split('\n').map((line, i) => <span key={i}>{line}</span>)
}

// --- Editable pill for variable names ---

function EditablePill({ value, onChange }: { value: string; onChange?: (v: string) => void }) {
  const [editing, setEditing] = useState(false)
  const [draft, setDraft] = useState(value)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => { setDraft(value) }, [value])
  useEffect(() => { if (editing && inputRef.current) inputRef.current.focus() }, [editing])

  const commit = () => {
    setEditing(false)
    if (draft.trim() && draft !== value) onChange?.(draft.trim())
    else setDraft(value)
  }

  const pillStyle: React.CSSProperties = {
    backgroundColor: '#D7EDFE',
    color: '#2272B4',
    padding: '0 2px',
    borderRadius: 2,
    fontFamily: '"SF Mono", "Monaco", "Inconsolata", "Roboto Mono", monospace',
    fontSize: 13,
    lineHeight: '20px',
    fontWeight: 500,
    cursor: 'text',
  }

  if (editing) {
    return (
      <input
        ref={inputRef}
        value={draft}
        onChange={(e) => setDraft(e.target.value)}
        onBlur={commit}
        onKeyDown={(e) => { if (e.key === 'Enter') commit(); if (e.key === 'Escape') { setDraft(value); setEditing(false) } }}
        style={{
          ...pillStyle,
          border: '1px solid #2272B4',
          outline: 'none',
          width: `${Math.max(draft.length, 3)}ch`,
        }}
      />
    )
  }

  return (
    <span
      onClick={(e) => { e.stopPropagation(); setEditing(true) }}
      style={pillStyle}
    >
      {value}
    </span>
  )
}

// --- Cell component ---

interface CellProps {
  id: string
  isFocused: boolean
  onFocus: () => void
  cellType?: 'Python' | 'SQL' | 'Markdown'
  content?: string
  /** Optional output rendered below the code area */
  output?: React.ReactNode
  /** Editable saved-as variable name (synced with output banner) */
  savedAs?: string
  onSavedAsChange?: (value: string) => void
}

export function Cell({ id, isFocused, onFocus, cellType = 'Python', content, output, savedAs, onSavedAsChange }: CellProps) {
  const { theme } = useDesignSystemTheme()
  const [isHovered, setIsHovered] = useState(false)
  const [cellContent, setCellContent] = useState(content || '')
  const [currentCellType, setCurrentCellType] = useState(cellType)
  const [cellTypeDropdownOpen, setCellTypeDropdownOpen] = useState(false)
  const cellTypeRef = useRef<HTMLDivElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (cellTypeRef.current && !cellTypeRef.current.contains(e.target as Node)) {
        setCellTypeDropdownOpen(false)
      }
    }
    if (cellTypeDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      return () => document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [cellTypeDropdownOpen])

  useEffect(() => {
    if (content !== undefined) {
      setCellContent(content)
    }
  }, [content])

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`
    }
  }, [cellContent])

  const showSideButtons = isHovered || isFocused

  const getCellStyles = () => {
    if (isFocused) {
      return {
        border: `1px solid ${theme.colors.actionDefaultBorderFocus}`,
        boxShadow: `0px 0px 0px 2px rgba(14, 83, 139, 0.25)`,
      }
    }
    return {
      border: `1px solid ${theme.colors.border}`,
      boxShadow: 'none',
    }
  }

  const cellStyles = getCellStyles()
  const lineCount = Math.max(cellContent.split('\n').length, 1)
  const sqldfHint = savedAs === '_sqldf' && isFocused ? (
    <span style={{ color: '#9e9e9e', fontWeight: 400, fontStyle: 'italic' }}> ← rename output as reusable Dataframe</span>
  ) : undefined

  const lines = highlightCode(cellContent, currentCellType, sqldfHint)

  // Sync: when textarea content changes, extract %sql name and push to savedAs
  const handleContentChange = (newContent: string) => {
    setCellContent(newContent)
    if (onSavedAsChange) {
      // Match both %sql <name> and %sql --name <name>
      const match = newContent.match(/^%sql\s+--name\s+(\S+)/) || newContent.match(/^%sql\s+(\S+)/)
      if (match && match[1] !== savedAs) onSavedAsChange(match[1])
    }
  }

  // Sync: when savedAs changes from the alert banner, update the textarea content
  useEffect(() => {
    if (savedAs && savedAs !== '_sqldf') {
      if (cellContent.startsWith('%sql --name')) {
        const updated = cellContent.replace(/^%sql\s+--name\s+\S+/, `%sql --name ${savedAs}`)
        if (updated !== cellContent) setCellContent(updated)
      } else if (cellContent.startsWith('%sql')) {
        const updated = cellContent.replace(/^%sql\s+\S+/, `%sql ${savedAs}`)
        if (updated !== cellContent) setCellContent(updated)
      } else {
        // No %sql header — prepend it
        setCellContent(`%sql --name ${savedAs}\n${cellContent}`)
      }
    }
  }, [savedAs])

  return (
    <div
      style={{
        display: 'flex',
        gap: theme.spacing.xs,
        alignItems: 'flex-start',
        marginBottom: theme.spacing.md,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Drag Handles */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: theme.spacing.xs,
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
          paddingTop: theme.spacing.sm,
          width: theme.spacing.xl,
          opacity: showSideButtons ? 1 : 0,
          pointerEvents: showSideButtons ? 'auto' : 'none',
          transition: 'opacity 0.2s',
        }}
      >
        <Button
          componentId={`cell-${id}-drag`}
          type="tertiary"
          size="small"
          icon={<DragIcon {...({} as any)} style={{ color: theme.colors.textSecondary }} />}
          dangerouslyAppendWrapperCss={{ cursor: 'grab' }}
        />
        <Button
          componentId={`cell-${id}-collapse`}
          type="tertiary"
          size="small"
          icon={<ChevronDownIcon {...({} as any)} style={{ color: theme.colors.textSecondary }} />}
        />
      </div>

      {/* Cell Container */}
      <div
        style={{
          flex: 1,
          backgroundColor: theme.colors.backgroundSecondary,
          ...cellStyles,
          borderRadius: theme.borders.borderRadiusSm,
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Code Toolbar */}
        <div
          style={{
            padding: theme.spacing.sm,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: theme.spacing.md,
          }}
        >
          {/* Left Side - Run Button */}
          <div style={{ display: 'flex', alignItems: 'center', gap: theme.spacing.md, flex: 1 }}>
            {isFocused ? (
              <SplitButton
                style={{ padding: '8px 8px', width: '48px', height: '24px' }}
                type="primary"
                size="small"
                onClick={(e: React.MouseEvent) => {
                  e.stopPropagation()
                }}
                componentId={`cell-${id}-run`}
              >
                <PlayIcon {...({} as any)} />
              </SplitButton>
            ) : (
              <div
                style={{
                  width: 48,
                  height: 24,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  paddingRight: 6,
                  paddingTop: 14,
                }}
              >
                <div
                  style={{
                    width: 24,
                    height: 24,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: theme.borders.borderRadiusSm,
                    cursor: 'pointer',
                    transition: 'background-color 0.15s ease',
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#e2e2e2' }}
                  onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent' }}
                >
                  <PlayIcon {...({} as any)} style={{ width: 16, height: 16, color: theme.colors.textSecondary }} />
                </div>
              </div>
            )}
          </div>

          {/* Right Side - Cell Type, AI Icon, Actions */}
          <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: theme.spacing.sm,
                flexShrink: 0,
              }}
            >
              <div ref={cellTypeRef} style={{ position: 'relative' }}>
                <div
                  onClick={() => setCellTypeDropdownOpen(!cellTypeDropdownOpen)}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    padding: `0 ${theme.spacing.xs}px`,
                    height: '20px',
                    borderRadius: theme.borders.borderRadiusSm,
                    backgroundColor: '#ebebeb',
                    fontSize: theme.typography.fontSizeSm,
                    lineHeight: theme.typography.lineHeightXs,
                    color: theme.colors.textPrimary,
                    cursor: 'pointer',
                  }}
                >
                  {currentCellType}
                </div>
                {cellTypeDropdownOpen && (
                  <div
                    style={{
                      position: 'absolute',
                      top: '100%',
                      right: 0,
                      marginTop: 4,
                      backgroundColor: theme.colors.backgroundPrimary,
                      borderRadius: theme.borders.borderRadiusSm,
                      boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                      border: `1px solid ${theme.colors.border}`,
                      minWidth: 100,
                      zIndex: 20,
                      overflow: 'hidden',
                    }}
                  >
                    {(['Python', 'SQL'] as const).map((lang) => (
                      <div
                        key={lang}
                        onClick={() => {
                          if (lang === 'SQL' && currentCellType !== 'SQL' && !cellContent.trimStart().startsWith('%sql')) {
                            const newContent = `%sql _sqldf\n${cellContent}`
                            setCellContent(newContent)
                            onSavedAsChange?.('_sqldf')
                          }
                          setCurrentCellType(lang)
                          setCellTypeDropdownOpen(false)
                        }}
                        style={{
                          padding: '6px 12px',
                          fontSize: theme.typography.fontSizeBase,
                          lineHeight: theme.typography.lineHeightBase,
                          color: theme.colors.textPrimary,
                          cursor: 'pointer',
                          backgroundColor: lang === currentCellType ? theme.colors.backgroundSecondary : 'transparent',
                          transition: 'background-color 0.1s ease',
                        }}
                        onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = theme.colors.backgroundSecondary }}
                        onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = lang === currentCellType ? theme.colors.backgroundSecondary : 'transparent' }}
                      >
                        {lang}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <Button
                type="tertiary"
                size="small"
                icon={<TrashIcon {...({} as any)} style={{ color: theme.colors.textSecondary }} />}
                onClick={(e: React.MouseEvent) => {
                  e.stopPropagation()
                }}
                componentId={`cell-${id}-delete`}
              />

              <Button
                type="tertiary"
                size="small"
                icon={<GenieCodeIcon width={16} height={16} />}
                componentId={`cell-${id}-ai`}
              />

              <Button
                type="tertiary"
                size="small"
                icon={<FullscreenIcon {...({} as any)} style={{ color: theme.colors.textSecondary }} />}
                componentId={`cell-${id}-fullscreen`}
              />

              <Button
                type="tertiary"
                size="small"
                icon={<OverflowIcon {...({} as any)} style={{ color: theme.colors.textSecondary }} />}
                componentId={`cell-${id}-more`}
              />
            </div>
        </div>

        {/* Code Editor Area */}
        <div
          style={{
            padding: `${theme.spacing.sm}px ${theme.spacing.sm}px ${theme.spacing.md}px ${theme.spacing.sm}px`,
            display: 'flex',
            gap: theme.spacing.md,
            minHeight: '40px',
          }}
          onClick={() => onFocus()}
        >
          {/* Line numbers */}
          <div
            style={{
              flexShrink: 0,
              display: 'flex',
              flexDirection: 'column',
              textAlign: 'right',
              userSelect: 'none',
              fontFamily: '"SF Mono", "Monaco", "Inconsolata", "Roboto Mono", monospace',
              fontSize: theme.typography.fontSizeBase,
              lineHeight: '20px',
              color: theme.colors.textPlaceholder,
              minWidth: 20,
            }}
          >
            {Array.from({ length: lineCount }, (_, i) => (
              <span key={i}>{i + 1}</span>
            ))}
          </div>

          {/* Overlay: styled pre underneath, transparent textarea on top */}
          <div style={{ flex: 1, position: 'relative', minHeight: '20px' }}>
            {/* Visual layer — syntax highlighted */}
            <pre
              style={{
                fontFamily: '"SF Mono", "Monaco", "Inconsolata", "Roboto Mono", monospace',
                fontSize: theme.typography.fontSizeBase,
                lineHeight: '20px',
                color: theme.colors.textPrimary,
                margin: 0,
                padding: 0,
                whiteSpace: 'pre-wrap',
                wordBreak: 'break-word',
                pointerEvents: 'none',
              }}
            >
              {lines.map((node, i) => (
                <React.Fragment key={i}>
                  {i > 0 && '\n'}
                  {node}
                </React.Fragment>
              ))}
            </pre>
            {/* Editable layer — transparent text, visible caret */}
            <textarea
              ref={textareaRef}
              value={cellContent}
              onChange={(e) => handleContentChange(e.target.value)}
              spellCheck={false}
              onFocus={(e) => {
                e.stopPropagation()
                onFocus()
              }}
              onClick={(e: React.MouseEvent) => e.stopPropagation()}
              placeholder={isFocused ? "Start typing or generate with AI..." : ""}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                fontFamily: '"SF Mono", "Monaco", "Inconsolata", "Roboto Mono", monospace',
                fontSize: theme.typography.fontSizeBase,
                lineHeight: '20px',
                color: 'transparent',
                caretColor: theme.colors.textPrimary,
                backgroundColor: 'transparent',
                border: 'none',
                outline: 'none',
                resize: 'none',
                overflow: 'hidden',
                padding: 0,
                margin: 0,
              }}
            />
          </div>
        </div>

        {/* Output section */}
        {output && output}
      </div>
    </div>
  )
}
