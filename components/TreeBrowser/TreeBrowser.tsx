'use client'

import { useState } from 'react'
import { TreeNode, type TreeNodeData } from './TreeNode'

interface TreeBrowserProps {
  nodes: TreeNodeData[]
  selectedId?: string
  foldersOnly?: boolean
  onSelect?: (id: string) => void
}

export function TreeBrowser({ nodes, selectedId: controlledSelectedId, foldersOnly = false, onSelect }: TreeBrowserProps) {
  const [internalSelectedId, setInternalSelectedId] = useState<string | null>(null)

  const selectedId = controlledSelectedId ?? internalSelectedId

  const handleSelect = (id: string) => {
    setInternalSelectedId(id)
    onSelect?.(id)
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      {nodes.map((node) => (
        <TreeNode
          key={node.id}
          node={node}
          isSelected={selectedId === node.id}
          selectedId={selectedId}
          foldersOnly={foldersOnly}
          onSelect={handleSelect}
        />
      ))}
    </div>
  )
}
