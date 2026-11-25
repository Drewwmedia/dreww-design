import { useId, type InputHTMLAttributes, type ReactNode, type SelectHTMLAttributes } from "react";
import { cx } from "./cx";

export interface FieldProps {
  label: string;
  /** Marks the few fields that are optional. Required is the default and isn't marked. */
  optional?: boolean;
  help?: ReactNode;
  /** Say what to type instead, e.g. "Use numbers only, like 12500." */
  error?: string;
  children: (ids: { id: string; describedBy?: string; invalid: boolean }) => ReactNode;
}

/** Label above, help or error below. One column, 520px wide at most on form pages. */
export function Field({ label, optional, help, error, children }: FieldProps) {
  const id = useId();
  const msg = `${id}-msg`;
  return (
    <div className={cx("field", error && "is-error")}>
      <label className="label" htmlFor={id}>
        {label} {optional && <span className="opt">(optional)</span>}
      </label>
      {children({ id, describedBy: error || help ? msg : undefined, invalid: !!error })}
      {error ? (
        <p className="err" id={msg}>
          <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9" /><path d="M12 7.5v5.5M12 16.5v.01" /></svg>
          {error}
        </p>
      ) : help ? (
        <p className="help" id={msg}>{help}</p>
      ) : null}
    </div>
  );
}

export function Input({ className, size, ...rest }: Omit<InputHTMLAttributes<HTMLInputElement>, "size"> & { size?: "sm" | "md" }) {
  return <input {...rest} className={cx("input", size === "sm" && "input--sm", className)} />;
}

export function Select({ className, ...rest }: SelectHTMLAttributes<HTMLSelectElement>) {
  return <select {...rest} className={cx("select", className)} />;
}
