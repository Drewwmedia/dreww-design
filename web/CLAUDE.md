# Dreww web design system

The source of truth for how dreww.ca looks, for prototypes in artifacts and for the HubSpot theme (`Drewwmedia/dreww-cms-builder`). The live site is not a reference where it disagrees with this file; the to-dos to bring it in line are in the Decisions section of the reference page.

- Visual reference, every section live: `docs/web-design-system.html`, published at https://claude.ai/artifact/NB61iWrEb5EZaG5j9Wy24x. The artifact also publishes the files below under `web/`.
- v1.0, every section agreed 2026-11-27.

## What's here

| File | What it is |
|---|---|
| `web/tokens.css` | Every colour, glow, font, size, space, corner, shadow and speed as `--dw-*` variables. Variables only. |
| `web/base.css` | Body type, text selection colours, focus ring, reduced motion. |
| `web/components.css` | Every agreed component, classes prefixed `dw-` so they can't clash with theme CSS. |
| `web/icons.svg` | Every agreed icon as one SVG sprite: 29 Lucide line icons, filled star and play, 7 brand marks. |
| `web/glossary.json` | One French name for each English term, used in menus, copy and addresses. |
| `web/fr.js` | `frTypo(text)`: French spaces, decimals, thousands and money. |
| `web/motion.js` | Card ink spread, one-open FAQ, draggable marquees, Final CTA word rise and cycling phrase. Opt-in by data attribute. |
| `web/tailwind.preset.js` | Tailwind 3 preset: colours, type scale, spacing, cut corners and easings, all pointing at the tokens. |

Header, menu and footer are single theme modules (`hv4-*`), not shared components. Their agreed look and behaviour are on the reference page; build them from it.

## Using it

**Prototype artifact.** Copy the files from the reference artifact instead of retyping CSS: publish with `files: {"web/tokens.css": {"artifact": "<reference url>", "path": "web/tokens.css"}, …}` for tokens, base, components and motion, then `<link rel="stylesheet" href="web/tokens.css">` in that order and `<script src="web/motion.js" defer>`. Load Anton, DM Sans 400–700 and IBM Plex Mono 400–500 from Google Fonts.

**HubSpot theme.** Install `@dreww/design` pinned to a tag (`git+https://github.com/Drewwmedia/dreww-design.git#vX.Y.Z`). Import `@dreww/design/web/tokens.css`, `base.css` and `components.css` into the theme's main stylesheet so Vite bakes them in, import `@dreww/design/web/motion.js` in the main script, and add the preset to `tailwind.config.js`. `hs upload` ships the compiled files; HubSpot never reads GitHub.

**Changing a rule.** Agree it on the reference page (Decisions section) → change the page and these files together → `npm test` → tag a version → republish the artifact → bump the tag in the theme repo in a PR.

## Rules that are easy to get wrong

### Colour
- Only `--dw-*` tokens or the preset's names. Never a stock Tailwind colour, never a raw hex in a component.
- Coral: primary buttons, eyebrows, the one highlight phrase. Never body text on white, never a highlight on white (2.9:1).
- Accepted exceptions, kept for the brand: white on coral buttons (2.9:1); coral eyebrows and highlight on burgundy (2.9:1).
- Teal `#215f6a` for positive states and red `#da1e28` for form errors: UI only, never brand.
- Ledes on burgundy are blush `--dw-on-burgundy-muted`, on ink `--dw-on-ink-muted`. Never white at an opacity.
- Glows only on dark grounds: warm (Final CTA), edge (footer), menu, soft (behind media), corner (case study hero). No flat burgundy-to-coral gradient anywhere.
- Selected text: burgundy with white text on light; white with burgundy text on burgundy (`.dw-on-burgundy`); white with ink text on ink (`.dw-on-ink`).

### Type
- Anton uppercase, 400 only: Display 82 (Final CTA, case study hero), H1 68 (page hero, one per page), H2 large 62 (case studies, feature sections), H2 44 (every other section). Mobile 40 / 32 / 32 / 24.
- Long display headlines step down to the H1 size at 21 characters a line (`.dw-display--long`). Headings take two lines when short (5–8 words), three at most, never four: the heading column is never under 640px on desktop.
- DM Sans for everything people read: body 18, lead 20, small 14.
- Eyebrow: IBM Plex Mono 14, 500, uppercase, 0.1em, coral. Two to four words. Numbered: `01 · Label` (a dot, never a long dash). No short line before it, ever.
- Highlight: one coral phrase, the outcome, only in the homepage hero and the Final CTA. Every other heading is all ink or all white.
- Headings: ink on light, white on dark. Left aligned; centred only for closing sections and the case study hero.

### Grid
- Four sizes, three switch points: phone under 768, tablet 768–1023, desktop 1024–1439, wide 1440 and up. No other breakpoints, ever; a module that needs one uses the nearest of these.
- 12 columns on desktop and wide, 8 on tablet, 4 on phone (`.dw-grid`, `--dw-grid-cols`). Gutter 24, 16 on phone. Container 1520, margins 40, 20 on phone.
- Every section uses one of four layouts, with spans set for every size: Half 6+6 (`.dw-layout-half`), Feature 5+7 (`.dw-layout-feature`, the FAQ), Three up 4+4+4 (`.dw-layout-three`), Reading 8 centred (`.dw-layout-reading`). Tablet: halves and cards go two across, features and reading go full width. Phone: everything stacks.
- Tailwind: `md` 768, `lg` 1024, `xl` 1440 from the preset.

### Icons
- One set: Lucide, one drawing per icon, 2px stroke on a 24 grid, round ends, in the text colour. Every icon comes from `web/icons.svg` (`<svg class="dw-icon"><use href="icons.svg#arrow-right"/></svg>`); never paste a hand-drawn SVG.
- Sizes: 16 beside small text (`.dw-icon--sm`), 20 in buttons and links (`--md`), 24 on its own. Card actions sit in a 40px coral circle at 18 (`.dw-icon-dot`).
- Filled only for `star` (coral, `.dw-icon--star`), `play`, and brand marks (`brand-*`, each brand's own one-colour mark; Google stays full colour on review cards).
- Reels and "watch our work" use `square-play`. No sparkles or "AI" icons.
- Need an icon that isn't in the sprite? Take it from Lucide as is, add it to `web/icons.svg`, and note it on the reference page.

### Long-form text
- Insights, press releases, guides and legal pages wrap their rich text in `.dw-prose`: the live insight template. Column up to 780px, DM Sans 17–18 at 1.65, 20 between paragraphs.
- Headings inside the text are DM Sans 700: H2 28, H3 23, H4 19, 36 above. Never skip a level. Anton only for the page title above the text.
- Links burgundy and underlined. Lists with coral markers. Quotes are the statement quote (`<blockquote><p>…</p><cite>Name · Role</cite></blockquote>`), never a plain paragraph.
- Images inside the text take the cut 12 corner and a 13px caption that says what the image shows.

### Insight cards
- Insights hub, press releases and the homepage keep the live card set: featured (`.dw-insight--feature`), secondary (`.dw-insight`), Latest rows (`--row`), Most read (`.dw-insight-ranked`), topic chips (`.dw-chip`), homepage rows (`.dw-insight-home`) and Dreww News press cards on burgundy (`.dw-news-card`).
- Images 16:9: cut 16 on featured and secondary, cut 12 on thumbnails and press cards. Featured titles sized to their words, three lines at most.
- Meta: category in coral mono, then date and read time. No view counts.
- Hover: the title turns burgundy. Homepage rows also fill the arrow coral, nudge it 5px and zoom the thumbnail 4% inside its frame, the one image zoom on the site.
- Topic chips are cut 8, never pills.

### Imagery
- Five shapes: 9:16 for reels (`.dw-media--reel`), 4:5 for people (`--portrait`), 3:2 for case study and studio photos (`--photo`), 16:9 for video and covers (`--wide`), 1:1 only for round avatars (`.dw-avatar`).
- Images take their container's cut corner: 12 by default, 16 inside big cards (`--lg`). Circles only for avatars. Round 22 only for the hero reels (`--reel.dw-media--phone`).
- Always `object-fit: cover`, never fill or stretch. Set the focal point with `--focus` so faces stay in frame.
- Deliver WebP at exactly 2× the display width (HubSpot resizes to the width/height attributes). The hero image loads eager with `fetchpriority="high"`; everything else `loading="lazy"`.
- Alt text says what the image shows and why it's there. Leave it empty (`alt=""`) only when a caption or name beside it already says it.
- Video autoplays muted, inline and looping, with a poster, through `data-dw-video`: it pauses off screen and has a pause button (`.dw-video__pause`). Never autoplay with sound.

### French and English
- Every page exists in both; French lives under `/fr/` with French slugs. The EN / FR switch goes to the same page in the other language. Pages declare `lang="en-CA"` or `lang="fr-CA"`.
- French runs up to 25% longer. French copy is edited to fit the same line limits as the English (headings three lines at most), not just translated. Buttons size to their label, never a fixed width; French labels stay under 20 characters.
- French typography (`web/fr.js` → `frTypo(text)` applies it): narrow no-break space (U+202F) before ? ! ; and %, and inside « »; no-break space (U+00A0) before :; decimal commas (4,8); thousands with a narrow space (1 500); money after the number (310 k$, 50 $).
- One French name per term, from `web/glossary.json`, in menus, body copy and addresses. Client, brand, product and campaign names are never translated.

### Space and shape
- Spacing scale 4, 8, 12, 16, 24, 32, 48, 64, 120. Eyebrow → heading → lede 16, heading block → content 48, columns 24 apart, cards 12 apart.
- Sections pad 120 top and bottom (64 on phone); the hero is the only exception. Container 1520 max, side margins 40 (20 on mobile).
- Cut corner, top-left always square: 4 (tags, kbd), 8 (inputs, small buttons, chips), 12 (buttons, small and FAQ cards, option cards), 16 (big cards, menu and footer panels). Only circles are round (icon buttons, avatars, dots). The hero reels stay rounded: they read as phones.
- One shadow: the scrolled header. Cards are flat with a Grey 200 border.

### Motion and focus
- Four speeds: tint 0.12s (colour, border, opacity), move 0.3s (nudges, chevrons, the plus turning), wipe 0.5s (button wipes, underlines, ink spread, the FAQ opening), rise 1.4s with the heading at 1.8s. Use `--dw-dur-*`; `npm test` fails on a raw duration.
- Three curves: `--dw-ease-wipe` for things that cover or draw, `--dw-ease-out` for things that arrive, `--dw-ease-expo` for big arrivals (Final CTA). Linear only for loops (marquees, the badge). No bounce, no default `ease`.
- Hover changes colour, wipes, draws an underline, nudges an arrow 5px or spreads the card ink. Nothing grows, lifts, tilts, glows or zooms, images included. One exception, kept from live: the homepage insight row thumbnail grows 4% inside its cut frame (overflow hidden, 0.3s, `--dw-ease-out`), never the card. No magnetic pull.
- Page heroes blur-rise once on load: each line rises 14px out of a 14px blur, 0.18s apart, top to bottom. Sections further down don't animate their headings.
- Marquees drift (logos 40px/s, reviews 54px/s), pause on hover and focus, and can be grabbed and dragged on desktop.
- Focus: the coral ring (3px, 5px out) with a 2px contrast edge, burgundy on light and white on burgundy or ink (`base.css`). Never `outline:none` on a focus state; `npm test` fails on it. Inside cards, the ring is the text colour.
- Everything stops for `prefers-reduced-motion`.

### Components
- Buttons: one primary per section. Final CTA: one large primary, Book a call, with at most one text link beside it, never a second button.
- Cards: ink spread for cards you act on (service, FAQ), coral border for cards you read (review, case study, logo tile). No lift, no shadow.
- FAQ: heading pinned left, list right, one answer open, the first open on load. Eight questions at most; the first sentence answers outright in 60 words or fewer. Ships FAQPage schema. A "Still have a question? Book a call" link under the heading.
- Review carousel: short HubDB testimonials, word for word, 55 words at most, always shown in full; every card as tall as the longest. Linked to the Google profile.
- Logo marquee: 32px tall, 64 apart; white at 75% on dark, ink at 60% on light with colour on hover.
- Final CTA: ink with the warm glow, Display headline whose coral phrase sits alone on the last line (16 characters at most), cycling on the homepage and hubs, held on service pages (`data-dw-cta-hold`). The spinning badge is desktop only.
- Forms: label above, 8px cut inputs on mist, focus white with a burgundy border and coral ring, errors in red with an icon. Never dark forms except the footer newsletter.

### Page shape
- Burgundy hero → proof (logos or reviews) → content alternating white and mist → at most one burgundy or ink band, never next to the hero or Final CTA → FAQ → Final CTA → footer. Nothing after the ask.
- Two sections of the same kind (the four services) share a ground with a Grey 200 line between them (`.dw-section--rule`).

### Never
1. Short dash lines before eyebrows or above headings.
2. Rounded corners all round, or pills (except circles and the hero reels).
3. Stock Tailwind colours.
4. Flat gradients on UI: buttons, borders, text.
5. Shadows on cards, or hover lift, grow or glow.
6. Text in white or grey at an opacity; use the muted tokens.
7. Invented numbers or quotes. Samples are labelled "example"; testimonials are real and word for word.
