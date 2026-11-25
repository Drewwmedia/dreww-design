import type { ReactNode } from "react";

/** White panel on the mist page, Grey 200 border, md cut corner. No shadow. */
export function Panel({ title, actions, children }: { title?: string; actions?: ReactNode; children: ReactNode }) {
  return (
    <section className="panel">
      {(title || actions) && (
        <div className="tbl-toolbar">
          {title && <h4>{title}</h4>}
          {actions && <div className="tools">{actions}</div>}
        </div>
      )}
      {children}
    </section>
  );
}

/** Mono breadcrumb, Anton title, toolbar on the right (date range, then actions). */
export function PageHeader({ crumb, title, tools }: { crumb?: string; title: string; tools?: ReactNode }) {
  return (
    <header className="app-top">
      <div>
        {crumb && <p className="crumb">{crumb}</p>}
        <h3>{title}</h3>
      </div>
      {tools && <div className="tools">{tools}</div>}
    </header>
  );
}
