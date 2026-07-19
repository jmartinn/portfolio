interface ArrowMarkersProps {
  /** Namespace for the marker ids, unique per diagram on a page. */
  prefix: string;
}

/**
 * Shared arrowhead defs for blog diagrams. Reference them with
 * `markerEnd="url(#<prefix>-arrow)"` / `url(#<prefix>-arrow-accent)`.
 */
export function ArrowMarkers({ prefix }: ArrowMarkersProps) {
  const marker = (id: string, fill: string) => (
    <marker
      id={id}
      viewBox="0 0 10 10"
      refX="9"
      refY="5"
      markerWidth="6"
      markerHeight="6"
      orient="auto-start-reverse"
    >
      <path d="M 0 0 L 10 5 L 0 10 z" fill={fill} />
    </marker>
  );

  return (
    <defs>
      {marker(`${prefix}-arrow`, "currentColor")}
      {marker(`${prefix}-arrow-accent`, "hsl(var(--accent))")}
    </defs>
  );
}
