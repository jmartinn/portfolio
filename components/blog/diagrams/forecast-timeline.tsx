export function ForecastTimeline() {
  const subs = [
    { label: "Netflix · monthly", y: 80 },
    { label: "iCloud+ · monthly", y: 130 },
    { label: "domain · yearly", y: 180 },
  ];

  const timelineY = 290;

  return (
    <svg
      viewBox="0 0 780 400"
      className="mx-auto w-full max-w-2xl"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Timeline showing how Cadence derives subscription charges from a balance anchor and each subscription's cycle, projecting the month-end balance"
    >
      <defs>
        <marker
          id="ft-arrowhead"
          viewBox="0 0 10 10"
          refX="9"
          refY="5"
          markerWidth="6"
          markerHeight="6"
          orient="auto-start-reverse"
        >
          <path d="M 0 0 L 10 5 L 0 10 z" fill="currentColor" />
        </marker>
        <marker
          id="ft-arrowhead-accent"
          viewBox="0 0 10 10"
          refX="9"
          refY="5"
          markerWidth="6"
          markerHeight="6"
          orient="auto-start-reverse"
        >
          <path d="M 0 0 L 10 5 L 0 10 z" fill="hsl(var(--accent))" />
        </marker>
      </defs>

      {/* Subscription rows */}
      {subs.map((sub) => (
        <g key={sub.label}>
          <text
            x="150"
            y={sub.y + 4}
            textAnchor="end"
            className="fill-foreground font-serif text-[13px]"
          >
            {sub.label}
          </text>
          <line
            x1="165"
            y1={sub.y}
            x2="700"
            y2={sub.y}
            stroke="hsl(var(--border))"
            strokeWidth="1"
            strokeDasharray="2 4"
          />
        </g>
      ))}

      {/* Netflix: derived charge dropping onto the timeline */}
      <g className="text-foreground">
        <text
          x="300"
          y="70"
          textAnchor="middle"
          className="fill-muted-foreground font-mono text-[11px]"
        >
          −€12.99
        </text>
        <line
          x1="300"
          y1="86"
          x2="300"
          y2={timelineY - 8}
          stroke="currentColor"
          strokeWidth="1.5"
          strokeDasharray="4 3"
          markerEnd="url(#ft-arrowhead)"
        />
      </g>

      {/* iCloud+: derived charge dropping onto the timeline */}
      <g className="text-foreground">
        <text
          x="380"
          y="120"
          textAnchor="middle"
          className="fill-muted-foreground font-mono text-[11px]"
        >
          −€2.99
        </text>
        <line
          x1="380"
          y1="136"
          x2="380"
          y2={timelineY - 8}
          stroke="currentColor"
          strokeWidth="1.5"
          strokeDasharray="4 3"
          markerEnd="url(#ft-arrowhead)"
        />
      </g>

      {/* Domain: next charge lands outside the window */}
      <g>
        <line
          x1="620"
          y1="180"
          x2="730"
          y2="180"
          stroke="hsl(var(--border))"
          strokeWidth="1.5"
          strokeDasharray="4 3"
          markerEnd="url(#ft-arrowhead)"
          className="text-muted"
        />
        <text
          x="728"
          y="168"
          textAnchor="end"
          className="fill-muted-foreground text-[10px] italic"
        >
          next: Nov 3 — outside the window
        </text>
      </g>

      {/* Payday: income arriving on the timeline */}
      <g>
        <text
          x="560"
          y="230"
          textAnchor="middle"
          className="font-mono text-[11px]"
          fill="hsl(var(--accent))"
        >
          +€1,700 payday
        </text>
        <line
          x1="560"
          y1="240"
          x2="560"
          y2={timelineY - 8}
          stroke="hsl(var(--accent))"
          strokeWidth="1.5"
          markerEnd="url(#ft-arrowhead-accent)"
        />
      </g>

      {/* The month timeline */}
      <g className="text-foreground">
        <line
          x1="90"
          y1={timelineY}
          x2="710"
          y2={timelineY}
          stroke="currentColor"
          strokeWidth="1.5"
          markerEnd="url(#ft-arrowhead)"
        />
      </g>

      {/* Anchor */}
      <g>
        <circle cx="210" cy={timelineY} r="5" fill="hsl(var(--accent))" />
        <text
          x="210"
          y={timelineY + 24}
          textAnchor="middle"
          className="font-mono text-[11px]"
          fill="hsl(var(--accent))"
        >
          anchor · Jul 5
        </text>
        <text
          x="210"
          y={timelineY + 42}
          textAnchor="middle"
          className="font-mono text-[11px]"
          fill="hsl(var(--accent))"
        >
          €1,240.00
        </text>
      </g>

      {/* Charge dates under the timeline */}
      <text
        x="300"
        y={timelineY + 24}
        textAnchor="middle"
        className="fill-muted-foreground font-mono text-[10px]"
      >
        Jul 12
      </text>
      <text
        x="380"
        y={timelineY + 24}
        textAnchor="middle"
        className="fill-muted-foreground font-mono text-[10px]"
      >
        Jul 15
      </text>
      <text
        x="560"
        y={timelineY + 24}
        textAnchor="middle"
        className="fill-muted-foreground font-mono text-[10px]"
      >
        Jul 28
      </text>

      {/* Month-end forecast */}
      <g>
        <line
          x1="660"
          y1={timelineY - 10}
          x2="660"
          y2={timelineY + 10}
          stroke="hsl(var(--accent))"
          strokeWidth="1.5"
        />
        <text
          x="660"
          y={timelineY + 24}
          textAnchor="middle"
          className="font-mono text-[11px]"
          fill="hsl(var(--accent))"
        >
          Jul 31
        </text>
        <text
          x="660"
          y={timelineY - 20}
          textAnchor="middle"
          className="font-mono text-[12px]"
          fill="hsl(var(--accent))"
        >
          €2,924.02
        </text>
        <text
          x="660"
          y={timelineY - 38}
          textAnchor="middle"
          className="text-[10px] italic"
          fill="hsl(var(--accent))"
        >
          month-end forecast
        </text>
      </g>

      {/* Bottom annotation */}
      <text
        x="400"
        y="380"
        textAnchor="middle"
        className="fill-muted-foreground text-[11px] italic"
      >
        every tick is derived from anchor + cycle at render time — nothing here
        is stored
      </text>
    </svg>
  );
}
