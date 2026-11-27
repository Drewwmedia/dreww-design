# Dreww app design system

> Building for dreww.ca or a page prototype? The website system lives in `web/`; its rules are in `web/CLAUDE.md`. This file covers the apps.

The source of truth for how every Dreww app looks: Reporting, the hub, proposals and the diagnostic. It is built from the dreww.ca web design system and scaled down for dense, everyday screens. The current apps are not a reference for how things should look; this repo is.

- Visual reference with every component live: `docs/app-design-system.html` (published at https://claude.ai/artifact/A8YuabgA31G7W14omfqkpz).
- Website system it builds on: `docs/web-design-system.html`.
- v1.0, every section agreed 2026-11-25. v1.1 (2026-11-26) adds the solid burgundy tag.

## What's here

| Path | What it is |
|---|---|
| `src/tokens.css` | Every colour, font, corner, shadow and speed, as `--dw-*` CSS variables. Nothing else is allowed. |
| `src/theme.css` | Tailwind 4 `@theme` on top of the tokens. Stock colours and rounded utilities are switched off. |
| `src/components.css` | Plain CSS for every component. Class names match the reference page. |
| `src/react/` | React wrappers that apply those classes: Button, IconButton, Field, Input, Select, Tag, Delta, KpiCard, Notice, Panel, PageHeader, Segmented. |
| `src/charts/palette.ts` | Chart series order, context colour, heatmap ramp and mark sizes. |
| `scripts/` | `npm test`: contrast check for every colour pair in use, and a check that components only use tokens. |

## Rules that are easy to get wrong

### Colour
- Only `--dw-*` tokens (or the Tailwind names in `theme.css`). Never a stock Tailwind colour, never a raw hex in a component.
- Burgundy: sidebar, selected states, the one verdict card. Coral: primary button, checkbox fill, focus ring, warning dots. Coral is never text on white.
- Teal means good for the client, red (`#da1e28`) means bad, failed, or a form error. Both are UI only, never brand, never a chart series.
- Colour a delta by meaning, not direction: a cost per lead going down is teal.
- No tinted fills. Status shows as a coloured dot or icon on white or mist. Selected rows are mist with the name in burgundy.
- The one filled tag: `tag--solid`, solid burgundy with a white dot, for a finished win (Signed, Won). Positive steps on the way (Viewed, Delivering) stay teal `tag--good`.
- Run `npm test` after adding any new text/background pair, and add the pair to `scripts/check-contrast.mjs`.

### Type
- Anton (`--dw-font-display`), uppercase, 400 only: page title 32, KPI figure 40, panel title 18, every button. Nothing in Anton under 14px, and never table text or labels.
- DM Sans (`--dw-font-sans`): everything people read and operate. Base 14px, 13px for help text and deltas. Figures in tables use `font-variant-numeric: tabular-nums`.
- IBM Plex Mono (`--dw-font-mono`) 500, uppercase, 0.08em: column headers, KPI labels, tags, breadcrumbs, IDs, dates, UTM strings.

### Shape, space and motion
- The cut corner: top-left is always square. `--dw-cut-xs` 4 (tags, checkboxes), `-sm` 8 (buttons, inputs, nav items), `-md` 12 (panels, KPI cards, large buttons), `-lg` 16 (modals, drawers). Only people's avatars and dots are round.
- 4px spacing scale: 4, 8, 12, 16, 20, 24, 32, 40, 48, 64. When a gap feels tight, go up a step, never down. Table rows 52px, controls 40px (32px in toolbars), panels pad 24px, the page pads 32px.
- One shadow, `--dw-shadow-float`, only for things that float: menus, popovers, modals, toasts. Cards and panels are flat with a Grey 200 border.
- Two speeds: 120ms for tints, 350ms with `--dw-ease-wipe` for the button wipe and tab underline. No bounce. Respect `prefers-reduced-motion`.

### Never
1. Coloured bars on the edge of a card, row or notice.
2. Short dash lines before eyebrows or above headings.
3. Rounded corners all round, or pills (except avatars and dots).
4. Stock Tailwind colours (blue-500, green-500, slate, gray).
5. Gradients on UI: no gradient fills, buttons, borders or text.
6. Shadows on cards and panels.
7. Emoji, or icons in coloured circles. Icons are Lucide, 2px stroke, in the text colour.
8. Text in grey at opacity. Use Grey 600 or Grey 500.
9. Unasked-for "AI" figures: no sparkles, hype or invented summaries. Every number names its source.

### Components
- Buttons: one primary per view. Secondary beside it. Quiet for toolbars and repeated row actions. Danger is a red outline and only runs after a confirmation.
- Forms: label above, always. Mark only optional fields. Units as prefix or suffix inside the field. Errors in red under the field, saying what to type instead. Settings pages save through a bar that appears with the first change.
- Notices stay until the problem is fixed; toasts confirm something just happened and leave after 5 seconds. Anything someone must act on is a notice.
- Tables: mono headers, figures right-aligned, empty cells are an en dash in Grey 500 with a tooltip saying why, never 0 when the truth is unknown.
- KPI cards: the comparison line always names the period. At most one verdict card (burgundy) per view.
- Every panel has four states: loading, empty, error, full. Empty and error say why and what to do next.

### Charts
- Series in fixed order: burgundy, coral, blue `#4058b5`, gold `#d4a72c`. Four at most; fold the rest into Other or split the chart. Blue and gold are for charts only.
- Colour follows the entity (Meta is always slot 1), never its rank. Previous period is a Grey 500 line.
- One y-axis, never two. Lines 2px, bars 24px thick at most with a 4px rounded end, 2px white gap in stacks, area fill at 10%.
- Text is ink or grey, never the series colour. Data that's still maturing is dashed and named in the legend.
- Every chart has an Anton title, a subtitle with period and unit, a legend for two or more series, a hover tooltip, a table view and a source line.

### Dates and filters
- Default range: last 30 days ending yesterday. Format `Oct 26 – Nov 24, 2026`. Compare to the previous period by default. Weeks start Monday. Dates follow the client's ad account time zone.
- Filters bar: search, chips (one per field), Add filter, Clear all (from two filters) on the left; date range then actions on the right. Filters apply to the whole page and live in the URL.

## Working in this repo
- Change the reference page and the code together. A token or rule that only exists in one of them will drift.
- Keep `npm test` passing. It runs without installing anything.
- Decisions that change a rule go in the Decisions section of the reference page first.
