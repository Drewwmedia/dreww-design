import type { ReactNode } from "react";
import { cx } from "./cx";

export interface KpiCardProps {
  label: string;
  /** Pre-formatted figure, e.g. "$148" or "4.2". */
  value?: ReactNode;
  unit?: string;
  /** Usually a <Delta/> plus "vs previous 30 days". Always name the comparison period. */
  comparison?: ReactNode;
  tag?: ReactNode;
  spark?: ReactNode;
  /** The one number the page exists to answer. One per view. */
  verdict?: boolean;
  loading?: boolean;
  /** Shown instead of a figure when there's no data, with what to do about it. */
  empty?: ReactNode;
}

export function KpiCard({ label, value, unit, comparison, tag, spark, verdict, loading, empty }: KpiCardProps) {
  return (
    <div className={cx("kpi", verdict && "kpi--verdict", !!empty && "kpi--empty")}>
      <div className="kpi-top">
        <span className="kpi-label">{label}</span>
        {tag}
      </div>
      {loading ? (
        <>
          <span className="skel" style={{ height: 40, width: "70%" }} aria-label="Loading" />
          <span className="skel" style={{ height: 14, width: "60%" }} />
        </>
      ) : empty ? (
        <>
          <div className="kpi-fig">–</div>
          <div className="help">{empty}</div>
        </>
      ) : (
        <>
          <div className="kpi-fig">{value}{unit && <span className="u">{unit}</span>}</div>
          {spark}
          {comparison && <div className="kpi-cmp">{comparison}</div>}
        </>
      )}
    </div>
  );
}
