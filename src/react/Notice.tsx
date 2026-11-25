import type { ReactNode } from "react";
import { cx } from "./cx";

const ICONS = {
  info: <><circle cx="12" cy="12" r="9" /><path d="M12 11v5M12 7.5v.01" /></>,
  warn: <><path d="M12 3l9.5 17h-19z" /><path d="M12 10v4M12 17.5v.01" /></>,
  error: <><circle cx="12" cy="12" r="9" /><path d="M12 7.5v5.5M12 16.5v.01" /></>,
  good: <><circle cx="12" cy="12" r="9" /><path d="M8 12.5l3 3 5-6" /></>,
};

/**
 * Stays on the page until the problem is fixed. Bold first sentence says what
 * happened, the rest says what it means and links the fix. Anything someone
 * has to act on is a Notice, never a toast.
 */
export function Notice({ tone = "info", title, children, onDismiss }: {
  tone?: keyof typeof ICONS;
  title: string;
  children?: ReactNode;
  onDismiss?: () => void;
}) {
  return (
    <div className={cx("notice", tone !== "info" && `notice--${tone}`)} role={tone === "error" ? "alert" : "status"}>
      <svg viewBox="0 0 24 24" aria-hidden="true">{ICONS[tone]}</svg>
      <span className="notice-body"><b>{title}</b> {children}</span>
      {onDismiss && (
        <button className="ibtn ibtn--sm" type="button" aria-label="Dismiss" onClick={onDismiss}>
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18" /></svg>
        </button>
      )}
    </div>
  );
}
