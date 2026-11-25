import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cx } from "./cx";

export type ButtonVariant = "primary" | "secondary" | "quiet" | "danger";
export type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** primary: one per view. secondary: the action beside it. quiet: toolbars and rows. danger: only behind a confirmation. */
  variant?: ButtonVariant;
  /** sm 32px (tables, toolbars), md 40px (page actions), lg 48px (empty states, onboarding). */
  size?: ButtonSize;
  icon?: ReactNode;
  loading?: boolean;
}

/** Anton, uppercase, cut corner, left-to-right wipe. Keep labels to one or two words. */
export function Button({ variant = "primary", size = "md", icon, loading, className, children, disabled, ...rest }: ButtonProps) {
  return (
    <button
      type="button"
      {...rest}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      className={cx("btn", `btn--${variant}`, size !== "md" && `btn--${size}`, loading && "is-loading", className)}
    >
      {icon}
      {children}
    </button>
  );
}

export interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Required: icon-only buttons need a name for screen readers and the tooltip. */
  "aria-label": string;
  size?: "sm" | "md";
  outline?: boolean;
}

export function IconButton({ size = "md", outline, className, ...rest }: IconButtonProps) {
  return <button type="button" {...rest} className={cx("ibtn", size === "sm" && "ibtn--sm", outline && "ibtn--outline", className)} />;
}
