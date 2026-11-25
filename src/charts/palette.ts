/**
 * Chart colours. Series go in this fixed order, four at most.
 * A fifth folds into "Other" or the chart splits into small multiples.
 * Teal and red never colour a series: they only mean good and bad.
 */
export const SERIES = [
  { token: "--dw-chart-1", hex: "#892951", name: "Burgundy" },
  { token: "--dw-chart-2", hex: "#ee7464", name: "Coral" },
  { token: "--dw-chart-3", hex: "#4058b5", name: "Blue" },
  { token: "--dw-chart-4", hex: "#d4a72c", name: "Gold" },
] as const;

/** Previous period and benchmarks. Never a series of its own. */
export const CONTEXT = { token: "--dw-chart-context", hex: "#737373" } as const;

/** Cohort and heatmap ramp: burgundy over white, light to dark. */
export const SEQUENTIAL = ["#f3e5eb", "#ddb5c6", "#c085a0", "#a4557a", "#892951"] as const;

/**
 * Colour follows the thing, never its rank. Give each entity a fixed slot once
 * (e.g. Meta = 0, Google = 1) so a filter never repaints what's left.
 */
export function seriesColor(slot: number): string {
  if (slot < 0 || slot >= SERIES.length) throw new Error(`Only ${SERIES.length} series colours. Fold the rest into Other.`);
  return `var(${SERIES[slot].token})`;
}

export const MARKS = {
  lineWidth: 2,
  barMaxThickness: 24,
  barEndRadius: 4,
  stackGap: 2,
  areaOpacity: 0.1,
  dotRadius: 4,
  dotRing: 2,
} as const;
