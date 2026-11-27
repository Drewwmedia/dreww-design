/* French typography for dreww.ca: apply to French text before it goes on the page
   (build step, HubSpot module script, or by hand as a reference).
   frTypo('Pourquoi Dreww? Note : 4.8 sur 5, 40%') →
   'Pourquoi Dreww ? Note : 4,8 sur 5, 40 %' (narrow no-break spaces, U+202F; no-break space before :, U+00A0)
   Exported for bundlers; also window.DrewwFr in a browser. */
const NNBSP = ' ', NBSP = ' ';

export function frTypo(text) {
  return String(text)
    // quotes: “x” or "x" → « x »
    .replace(/[“"]\s*([^”"]+?)\s*[”"]/g, `«${NNBSP}$1${NNBSP}»`)
    // ? ! ; and % take a narrow no-break space (not in URLs or after another space)
    .replace(/(?<!https?:\/\/[^\s]*)\s*([?!;])(?=\s|$|[»)])/g, `${NNBSP}$1`)
    .replace(/(\d)\s*%/g, `$1${NNBSP}%`)
    // : takes a no-break space, except times (14:30) and URLs
    .replace(/(?<![\d/]|https?)\s*:(?=\s)/g, `${NBSP}:`)
    // decimals: 4.8 → 4,8 (not versions like 1.2.3)
    .replace(/(?<![\d.])(\d+)\.(\d+)(?![\d.])/g, '$1,$2')
    // thousands: 1,500 or 1 500 → 1 500 (narrow no-break)
    .replace(/(\d{1,3})[, ](\d{3})(?!\d)/g, `$1${NNBSP}$2`)
    // money: $310K → 310 k$, $50 → 50 $
    .replace(/\$\s?(\d[\d ,]*)\s?([kKmM])\b/g, (_, n, u) => `${n}${NNBSP}${u.toLowerCase()}$`)
    .replace(/\$\s?(\d[\d ,]*)/g, `$1${NNBSP}$`);
}

if (typeof window !== 'undefined') window.DrewwFr = { frTypo };
