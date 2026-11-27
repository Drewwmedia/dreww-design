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

### Space and shape
- Spacing scale 4, 8, 12, 16, 24, 32, 48, 64, 120. Eyebrow → heading → lede 16, heading block → content 48, columns 24 apart, cards 12 apart.
- Sections pad 120 top and bottom (64 on mobile); the hero is the only exception. Container 1520 max, side margins 40 (20 on mobile).
- Cut corner, top-left always square: 4 (tags, kbd), 8 (inputs, small buttons, chips), 12 (buttons, small and FAQ cards, option cards), 16 (big cards, menu and footer panels). Only circles are round (icon buttons, avatars, dots). The hero reels stay rounded: they read as phones.
- One shadow: the scrolled header. Cards are flat with a Grey 200 border.

### Motion
- Buttons wipe left to right (0.5s, `--dw-ease-wipe`). No darker shade, grow, lift, glow or magnetic pull on any button or logo.
- Page heroes blur-rise once on load: each line rises 14px out of a 14px blur, 0.18s apart, top to bottom; the heading takes 1.8s, the rest 1.4s. Sections further down don't animate their headings.
- Marquees drift (logos 40px/s, reviews 54px/s), pause on hover and focus, and can be grabbed and dragged on desktop.
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
