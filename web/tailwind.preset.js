/* Tailwind 3 preset for dreww.ca. Every value points at a --dw-* variable in
   web/tokens.css, so import tokens.css too.
   tailwind.config.js:  presets: [ (await import('@dreww/design/web/tailwind-preset')).default ]
   or with require:     presets: [ require('@dreww/design/web/tailwind-preset') ] (via a .cjs wrapper) */
const v = (name) => `var(--dw-${name})`;

export default {
  theme: {
    // Agreed switch points. Replaces the theme's eight sizes; xl moves from 1280 to 1440.
    screens: { md: '768px', lg: '1024px', xl: '1440px' },
    extend: {
      colors: {
        burgundy: v('burgundy'),
        coral: v('coral'),
        ink: v('ink'),
        mist: v('mist'),
        teal: v('teal'),
        red: v('red'),
        blush: v('on-burgundy-muted'),
        'ink-muted': v('on-ink-muted'),
        grey: { 200: v('grey-200'), 500: v('grey-500'), 600: v('grey-600') },
      },
      fontFamily: {
        display: v('font-display'),
        sans: v('font-sans'),
        mono: v('font-mono'),
      },
      fontSize: {
        display: [v('fs-display'), { lineHeight: v('lh-display') }],
        h1: [v('fs-h1'), { lineHeight: v('lh-h1') }],
        h2l: [v('fs-h2l'), { lineHeight: '1' }],
        h2: [v('fs-h2'), { lineHeight: v('lh-h2') }],
        h3: [v('fs-h3'), { lineHeight: '1.3' }],
        h4: [v('fs-h4'), { lineHeight: '1.4' }],
        h5: [v('fs-h5'), { lineHeight: '1.4' }],
        lead: [v('fs-lead'), { lineHeight: '1.55' }],
        body: [v('fs-body'), { lineHeight: v('lh-body') }],
        small: [v('fs-small'), { lineHeight: '1.5' }],
        eyebrow: [v('fs-eyebrow'), { lineHeight: '21px', letterSpacing: v('track-eyebrow') }],
      },
      spacing: {
        'dw-xs': v('space-xs'), 'dw-sm': v('space-sm'), 'dw-md': v('space-md'), 'dw-lg': v('space-lg'),
        'dw-xl': v('space-xl'), 'dw-2xl': v('space-2xl'), 'dw-3xl': v('space-3xl'), 'dw-4xl': v('space-4xl'),
        section: v('section-y'), gutter: v('gutter'),
      },
      maxWidth: { container: v('container') },
      gridTemplateColumns: { dw: 'repeat(var(--dw-grid-cols), minmax(0, 1fr))' },
      gap: { dw: v('grid-gap') },
      borderRadius: {
        'cut-xs': v('cut-xs'), 'cut-sm': v('cut-sm'), 'cut-md': v('cut-md'), 'cut-lg': v('cut-lg'),
      },
      transitionTimingFunction: { wipe: v('ease-wipe'), out: v('ease-out'), expo: v('ease-expo') },
      transitionDuration: { tint: '120ms', wipe: '500ms' },
    },
  },
};
