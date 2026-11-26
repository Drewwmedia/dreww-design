import type { ReactNode } from "react";
import { cx } from "./cx";

export type Tone = "good" | "bad" | "warn" | "neutral" | "solid";

/** Mono tag on mist with a coloured dot. Teal good, red bad, coral needs attention, grey otherwise. `solid` = filled burgundy, only for a finished win (Signed, Won). */
export function Tag({ tone = "neutral", dot = true, plain, children }: { tone?: Tone; dot?: boolean; plain?: boolean; children: ReactNode }) {
  return (
    <span className={cx("tag", tone !== "neutral" && `tag--${tone}`, plain && "tag--plain")}>
      {dot && <i aria-hidden="true" />}
      {children}
    </span>
  );
}

/**
 * A change against the comparison period. Colour by meaning, not direction:
 * pass `goodWhen="down"` for costs, so a falling cost per lead is teal.
 */
export function Delta({ value, goodWhen = "up", flatBelow = 0.01, format = (v: number) => `${Math.abs(v * 100).toFixed(1)}%` }: {
  value: number;
  goodWhen?: "up" | "down";
  flatBelow?: number;
  format?: (v: number) => string;
}) {
  const flat = Math.abs(value) < flatBelow;
  const good = goodWhen === "up" ? value > 0 : value < 0;
  const tone = flat ? "flat" : good ? "good" : "bad";
  const d = flat ? "M5 12h14" : value > 0 ? "M7 17L17 7M9 7h8v8" : "M7 7l10 10M17 9v8H9";
  return (
    <span className={`delta delta--${tone}`}>
      <svg viewBox="0 0 24 24" aria-hidden="true"><path d={d} /></svg>
      <span className="sr-only">{flat ? "No change" : value > 0 ? "Up" : "Down"} </span>
      {format(value)}
    </span>
  );
}
