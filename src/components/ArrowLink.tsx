import type { ComponentPropsWithoutRef, ReactNode } from "react";

const ARROWS = ["→", "↗"];

/* A link-button that stays where you aim. On hover the arrow does the moving:
   a trailing → or ↗ in the label steps forward; labels without one have an
   arrow slide in. Pure CSS (see .btn in globals.css); print hides a.btn. */
export default function ArrowLink({
  children,
  className = "",
  ...rest
}: ComponentPropsWithoutRef<"a">) {
  let label: ReactNode = children;
  let arrow: string | null = null;
  if (typeof children === "string") {
    const t = children.trimEnd();
    const last = t.slice(-1);
    if (ARROWS.includes(last)) {
      label = t.slice(0, -1).trimEnd();
      arrow = last;
    }
  }
  return (
    <a className={`btn ${className}`} {...rest}>
      {label}
      {arrow ? (
        <span aria-hidden className={`arrow ml-[0.4em] ${arrow === "↗" ? "arrow-out" : ""}`}>
          {arrow}
        </span>
      ) : (
        <span aria-hidden className="arrow-in">
          →
        </span>
      )}
    </a>
  );
}
