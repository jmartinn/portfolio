/** Stagger index for the diagram system: `style={stage(2)}`.
 * Shared module (no "use client") so both server-rendered diagrams and
 * the client Diagram wrapper can call it. */
export function stage(n: number): React.CSSProperties {
  return { "--dg-s": n } as React.CSSProperties;
}
