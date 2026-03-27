# Databricks Frontend UI

Lightweight frontend for Databricks prototyping, customer testing, and design validation. Built with Next.js and the Databricks Design System (Dubois).

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Run development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000)

## Design System

This project uses `@databricks/design-system` (Dubois) for all UI primitives. Key patterns:

- **Theme tokens** — Access via `useDesignSystemTheme()` for spacing (`theme.spacing.sm`), colors (`theme.colors.textPrimary`), borders (`theme.borders.borderRadiusSm`), and typography (`theme.typography.fontSizeBase`)
- **DS components** — Use `Button`, `Input`, `Breadcrumb`, and icons from `@databricks/design-system` before building custom elements
- **Typography** — Global font stack is set in `globals.css` matching the Dubois system font (`-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, ...`). No Google Fonts.
- **Icons** — Prefer DS icons. Custom icons live in `lib/icons/` and wrap SVGs with the DS `Icon` component for consistent sizing

## Routes

| Route | Description |
|---|---|
| `/` | Home page |
| `/workspace` | Workspace browser with sidebar tree and file table |
| `/workspace/notebook` | Notebook editor with cells, panels, and tab bar |
| `/recents` | Recents page (placeholder) |
| `/compute` | Compute page (placeholder) |
| `/data` | Catalog page (placeholder) |
| `/jobs` | Jobs page (placeholder) |
| `/sql-editor` | SQL Editor page (placeholder) |

## Project Structure

```
├── app/
│   ├── layout.tsx                    # Root layout with client-only DS provider
│   ├── page.tsx                      # Home page
│   ├── globals.css                   # Global styles + Dubois font stack
│   ├── workspace/
│   │   ├── page.tsx                  # Workspace browser (sidebar + file table)
│   │   ├── components/
│   │   │   └── FileBrowser.tsx       # File browser table with breadcrumbs, search, filters
│   │   └── notebook/
│   │       ├── page.tsx              # Notebook editor
│   │       └── components/
│   │           ├── Cell.tsx          # Notebook cell with code editor
│   │           ├── LeftHeader.tsx
│   │           ├── LeftPanel.tsx     # File tree panel (uses TreeBrowser)
│   │           ├── LeftSidebar.tsx
│   │           ├── NotebookNav.tsx   # File/Edit/View menu + run controls
│   │           ├── RightPanel.tsx
│   │           ├── RightSidebar.tsx
│   │           ├── SidebarIconButton.tsx
│   │           └── WorkspaceTabs.tsx # Tab bar for open files
│   ├── recents/
│   │   └── page.tsx
│   ├── compute/
│   │   └── page.tsx
│   ├── data/
│   │   └── page.tsx
│   ├── jobs/
│   │   └── page.tsx
│   └── sql-editor/
│       └── page.tsx
├── components/                       # Shared components
│   ├── Layout/
│   │   └── MainLayout.tsx            # App shell (TopNav + Sidebar + content)
│   ├── Navigation/
│   │   ├── NavItemComponent.tsx      # Individual nav item with hover/active states
│   │   ├── Sidebar.tsx               # Left nav sidebar (Workspace, Recents, Catalog, etc.)
│   │   └── TopNav.tsx                # Top navigation bar
│   ├── TreeBrowser/                  # Reusable file tree component
│   │   ├── TreeBrowser.tsx           # Tree container with selection management
│   │   ├── TreeNode.tsx              # Recursive tree node (16 types supported)
│   │   └── index.ts
│   ├── animations/
│   │   └── AnimatedSidebarIcon.tsx   # Animated sidebar toggle icon
│   └── Providers/
│       ├── ClientOnlyDesignSystem.tsx # SSR guard for DS provider
│       └── DesignSystemProvider.tsx   # DS theme provider with overrides
└── lib/                              # Utilities and extensions
    ├── components/
    │   ├── IconButton.tsx
    │   └── index.ts
    ├── icons/                        # Custom icons (not in Dubois)
    │   ├── DataIcon.tsx
    │   ├── InfoIcon.tsx
    │   ├── ListOutlinedIcon.tsx
    │   ├── SplitEditorIcon.tsx
    │   └── index.ts
    └── mock-data.ts
```

## TreeBrowser Component

The `TreeBrowser` is a shared, recursive file tree used in both the Workspace page sidebar and the Notebook left panel. It supports 16 node types:

| Type | Icon | Color |
|---|---|---|
| `folder` | `FolderFillIcon` | `blue400` |
| `draft` | `FolderFillIcon` | `grey200` |
| `pipeline` | `FolderSolidPipelineIcon` | `blue400` |
| `git` | `FolderBranchFillIcon` | `blue400` |
| `notebook` | `NotebookIcon` | `textSecondary` |
| `sql` | `QueryIcon` | `textSecondary` |
| `file` | `FileCodeIcon` | `textSecondary` |
| `dashboard` | `DashboardIcon` | `textSecondary` |
| `query` | `QueryIcon` | `textSecondary` |
| `home` | `HomeIcon` | `textSecondary` |
| `shared` | `UserGroupIcon` | `textSecondary` |
| `shared-folder` | `OfficeIcon` | `textSecondary` |
| `users` | `UserGroupIcon` | `textSecondary` |
| `user-home` | `HomeIcon` | `textSecondary` |
| `favorites` | `StarIcon` | `textSecondary` |
| `trash` | `TrashIcon` | `textSecondary` |

Usage:
```tsx
import { TreeBrowser, type TreeNodeData } from '@/components/TreeBrowser'

const nodes: TreeNodeData[] = [
  { id: 'my-folder', label: 'My Folder', type: 'folder', children: [
    { id: 'notebook-1', label: 'Analysis.py', type: 'notebook' },
  ]},
]

<TreeBrowser nodes={nodes} selectedId="notebook-1" onSelect={(id) => {}} />
```

## Deployment (Databricks Apps)

### Manual deploy (current workflow)

1. Build the static export:
```bash
npm run build
```

2. Sync files to your workspace:
```bash
databricks sync . /Workspace/Users/<your-email>/proto-<name> --profile e2-dogfood --full
```
Wait for all uploads to complete before killing the sync.

3. Create the app (first time only):
```bash
databricks apps create proto-<name> --profile e2-dogfood
```

4. Deploy:
```bash
databricks apps deploy proto-<name> \
  --source-code-path /Workspace/Users/<your-email>/proto-<name> \
  --profile e2-dogfood
```

Your app will be available at the URL returned by `databricks apps get proto-<name>`.

### Deploy infrastructure files

| File | Purpose |
|---|---|
| `app.yaml` | Tells Databricks Apps to run `npm run start` |
| `server.js` | Express server that serves the static `out/` folder |
| `next.config.js` | `output: 'export'` for static HTML generation |

### CI automation (not yet active)

GitHub Actions workflows exist in `.github/workflows/` but are currently blocked because GitHub-hosted runners are disabled for this org. To enable automated PR previews:

1. **Get GitHub Actions runners enabled** — ask GitHub admins to allow hosted runners for this repo, or provide a self-hosted runner label
2. **Create a service principal** — ask a workspace admin to create one with Databricks Apps management permissions
3. **Add repo secrets** — `DATABRICKS_HOST` and `DATABRICKS_TOKEN` in GitHub repo settings
4. Once unblocked, opening a PR will automatically deploy a preview at `proto-pr-{number}` and post the URL as a PR comment

Relevant workflow files:
- `.github/workflows/preview-deploy.yml` — deploys on PR open/push
- `.github/workflows/preview-teardown.yml` — cleans up on PR close
