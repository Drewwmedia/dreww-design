# @dreww/design

The Dreww app design system: tokens, a Tailwind 4 theme, component CSS and React components for Reporting, the hub, proposals and the diagnostic.

See every component live in [`docs/app-design-system.html`](docs/app-design-system.html). The rules for building with it are in [`CLAUDE.md`](CLAUDE.md), which Claude Code reads automatically.

## Use it in a Next.js app

Install from the repo (until it's published to a registry):

```bash
npm install github:Drewwmedia/dreww-design
```

In `next.config.ts`, let Next compile the TypeScript components:

```ts
const nextConfig = { transpilePackages: ["@dreww/design"] };
```

In `globals.css`, replacing the app's own colour and font tokens:

```css
@import "tailwindcss";
@import "@dreww/design/tokens.css";
@import "@dreww/design/base.css";
@import "@dreww/design/theme.css";
@import "@dreww/design/components.css";
```

Load the fonts with `next/font` and point the tokens at them, on `<html>`:

```css
:root {
  --dw-font-display: var(--font-anton), Impact, "Arial Narrow", sans-serif;
  --dw-font-sans: var(--font-dm-sans), system-ui, sans-serif;
  --dw-font-mono: var(--font-plex-mono), ui-monospace, monospace;
}
```

Then use the components:

```tsx
import { Button, KpiCard, Delta, Tag, Notice } from "@dreww/design/react";

<KpiCard label="Cost / qualified lead" value="$148"
  comparison={<><Delta value={-0.114} goodWhen="down" /> vs previous 30 days</>} />
```

Every component is also plain CSS, so markup from the reference page works as-is (`class="btn btn--primary"`).

## Checks

```bash
npm test
```

Checks every text and background pair against WCAG contrast, and that `components.css` only uses tokens. Needs Node 20 or later and nothing else.

```bash
npm install && npm run typecheck
```

Type-checks the React components.

## Moving an app onto it

One app at a time, one pull request each, merged by Joey:

1. Import `tokens.css` alone first: it only adds `--dw-*` variables and changes nothing on screen. Then add `base.css`, `theme.css` and `components.css`, removing the app's own colour and font tokens.
2. Replace stock Tailwind colours and `rounded-*` classes with the theme names and `cut-*` utilities.
3. Swap the app's UI components for the ones here, page by page.
