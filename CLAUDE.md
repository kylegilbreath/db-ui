# CLAUDE.md — databricks-ui Codebase Rules

This file contains project-level instructions for AI assistants working in this codebase. These rules apply to all contributors and tools.

---

## Design System — Dubois First

**This is the single most important rule for this codebase.** Always default to the Databricks design system (Dubois) before hardcoding or creating custom implementations.

### Priority Order for Every Style Decision
1. **Dubois token** — `theme.colors.*`, `theme.spacing.*`, `theme.borders.*`, `theme.typography.*`
2. **Dubois component** — `Button`, `Tag`, `Typography`, `Tooltip`, `SegmentedControlGroup`, etc. from `@databricks/design-system`
3. **Dubois icon** — Import from `@databricks/design-system` or `@/lib/icons`
4. **Custom implementation** — Only when Dubois doesn't provide what's needed, and only after confirming with the user

### Colors
Use `theme.colors.*` tokens. Never hardcode a hex/rgba value if a matching token exists.
- Do NOT use fallback operators (`||`, `??`) — design system theme values are guaranteed to exist.

### Spacing
Use `theme.spacing.*` tokens for padding, margin, and gap values. Never hardcode `8px`, `16px`, etc. when tokens exist.

### Components
Always search `@databricks/design-system` first before building custom. If a matching Dubois component can't be found, **ask for permission before writing a custom component**. Never silently create custom implementations of buttons, tabs, inputs, modals, or other standard UI elements.

### Icons
Always default to Dubois icon components from `@databricks/design-system` (e.g., `SearchIcon`, `NotebookIcon`, `StarIcon`). Never use emoji characters, inline SVGs, or third-party icon libraries when a Dubois icon exists. If an appropriate icon can't be found in the design system, **ask for the right icon name** before creating a custom one.

**Icon resolution order:**
1. Search `@databricks/design-system` — naming pattern: `[Name]Icon`
2. Check `@/lib/icons` for local extensions
3. If not found — STOP and ask. Never create custom SVGs without confirmation.

### Typography
Use `theme.typography.*` tokens for font sizes, weights, and line heights.
- `fontSizeBase` (13px), `fontSizeSm` (12px), `fontSizeLg` (18px), etc.
- `typographyRegularFontWeight` (400), `typographyBoldFontWeight` (600)
- Match line heights to font sizes (e.g., `fontSizeBase` with `lineHeightBase`)

---

## File Structure

### Global Components (`components/`)
Only for components shared across multiple routes or used in root layout/navigation.

### Route-Specific Components (`app/[route]/components/`)
Components specific to a single route live in that route's `components/` folder.

### Decision Tree
1. Used in multiple routes? → `components/`
2. Used in one route? → `app/[route]/components/`

### Import Conventions
- Global: `@/components/[ComponentName]`
- Route-specific: `./components/[ComponentName]` (relative)

---

## Prototype Configuration (ProtoConfig)

ProtoConfig is the **global prototype configuration panel** — a floating dark button (bottom-left) that expands into a config panel. It renders on every page automatically via the root layout.

### Architecture
- **`ProtoConfigContext`** — React context holding shared state (`selectedFlow`, `selectedSub`, `startPath`) and `resetConfig()`
- **`ProtoConfigProvider`** — wraps the app in `ClientOnlyDesignSystem.tsx`
- **`ProtoConfig`** — the floating panel UI, rendered globally
- **`GlobalProtoConfig`** — baseline config options (Flow A/B with SubOption variants), defined in `ClientOnlyDesignSystem.tsx`

### How Pages Read Config State
```tsx
import { useProtoConfig } from '@/components/ProtoConfig'

const { selectedFlow, selectedSub } = useProtoConfig()

// Conditionally render based on selections
if (selectedFlow === 'flow-a') { /* ... */ }
```

### Configuring "Start Over"
The Start over button (RefreshIcon in the header) resets all config state and navigates to a start path. It is **disabled by default** until a start path is set:
```tsx
const { setStartPath } = useProtoConfig()
useEffect(() => { setStartPath('/workspace/notebook') }, [])
```

### Customizing Flows Per Branch
Each prototype branch typically covers one main flow. To customize:
1. Edit the `GlobalProtoConfig` component in `components/Providers/ClientOnlyDesignSystem.tsx`
2. Change `FlowOption` labels, descriptions, and `SubOption` variants to match your prototype
3. Pages read from `useProtoConfig()` to conditionally render based on selections

### Rules
- ProtoConfig is **global only** — do not add per-page ProtoConfig instances
- Config state lives in context, not in component local state
- Flow/SubOption names should be updated per branch to match the prototype being tested
- The `startPath` should be set on the entry-point page of the prototype

---

## Anti-Patterns

- Do NOT use fallback operators (`||`, `??`) on `theme.colors.*`, `theme.spacing.*`, `theme.borders.*`, or `theme.typography.*`
- Do NOT hardcode colors, spacing, or typography values when design system tokens exist
- Do NOT create custom components without searching `@databricks/design-system` first
- Do NOT use emoji characters, inline SVGs, or third-party icon libraries when a Dubois icon exists
- Do NOT use icons from other libraries (e.g., `react-icons`, `lucide-react`) when Dubois has an equivalent
