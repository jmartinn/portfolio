import { Diagram } from "./diagram";
import { ArrowMarkers } from "./markers";
import { stage } from "./stage";

export function ForecastTimeline() {
  const subs = [
    { label: "Netflix · monthly", y: 80 },
    { label: "iCloud+ · monthly", y: 130 },
    { label: "domain · yearly", y: 180 },
  ];

  const timelineY = 290;

  return (
    <Diagram note="every tick is derived from anchor + cycle at render time — nothing here is stored">
      <svg
        viewBox="0 0 780 350"
        className="mx-auto w-full max-w-2xl"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-label="Timeline showing how Cadence derives subscription charges from a balance anchor and each subscription's cycle, projecting the month-end balance"
      >
        <ArrowMarkers prefix="ft" />

        {/* Subscription rows */}
        {subs.map((sub) => (
          <g key={sub.label}>
            <text
              x="150"
              y={sub.y + 4}
              textAnchor="end"
              className="dg-fade fill-foreground font-serif text-[13px]"
              style={stage(0)}
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
              className="dg-wipe"
              style={stage(0)}
            />
          </g>
        ))}

        {/* The month timeline */}
        <line
          x1="90"
          y1={timelineY}
          x2="710"
          y2={timelineY}
          stroke="currentColor"
          strokeWidth="1.5"
          markerEnd="url(#ft-arrow)"
          className="dg-wipe text-foreground"
          style={stage(1)}
        />

        {/* Anchor */}
        <g>
          <circle
            cx="210"
            cy={timelineY}
            r="5"
            fill="hsl(var(--accent))"
            className="dg-fade"
            style={stage(1)}
          />
          <text
            x="210"
            y={timelineY + 24}
            textAnchor="middle"
            className="dg-rise font-mono text-[11px]"
            fill="hsl(var(--accent))"
            style={stage(1)}
          >
            anchor · Jul 5
          </text>
          <text
            x="210"
            y={timelineY + 42}
            textAnchor="middle"
            className="dg-rise font-mono text-[11px]"
            fill="hsl(var(--accent))"
            style={stage(1)}
          >
            €1,240.00
          </text>
        </g>

        {/* Netflix: derived charge dropping onto the timeline */}
        <g className="text-foreground">
          <text
            x="300"
            y="70"
            textAnchor="middle"
            className="dg-rise fill-muted-foreground font-mono text-[11px]"
            style={stage(2)}
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
            markerEnd="url(#ft-arrow)"
            className="dg-drop"
            style={stage(2)}
          />
          <text
            x="300"
            y={timelineY + 24}
            textAnchor="middle"
            className="dg-fade fill-muted-foreground font-mono text-[10px]"
            style={stage(2)}
          >
            Jul 12
          </text>
        </g>

        {/* iCloud+: derived charge dropping onto the timeline */}
        <g className="text-foreground">
          <text
            x="380"
            y="120"
            textAnchor="middle"
            className="dg-rise fill-muted-foreground font-mono text-[11px]"
            style={stage(3)}
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
            markerEnd="url(#ft-arrow)"
            className="dg-drop"
            style={stage(3)}
          />
          <text
            x="380"
            y={timelineY + 24}
            textAnchor="middle"
            className="dg-fade fill-muted-foreground font-mono text-[10px]"
            style={stage(3)}
          >
            Jul 15
          </text>
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
            markerEnd="url(#ft-arrow)"
            className="dg-wipe text-muted"
            style={stage(4)}
          />
          <text
            x="728"
            y="168"
            textAnchor="end"
            className="dg-rise fill-muted-foreground text-[10px] italic"
            style={stage(4)}
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
            className="dg-rise font-mono text-[11px]"
            fill="hsl(var(--accent))"
            style={stage(5)}
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
            markerEnd="url(#ft-arrow-accent)"
            className="dg-drop"
            style={stage(5)}
          />
          <text
            x="560"
            y={timelineY + 24}
            textAnchor="middle"
            className="dg-fade fill-muted-foreground font-mono text-[10px]"
            style={stage(5)}
          >
            Jul 28
          </text>
        </g>

        {/* Month-end forecast */}
        <g>
          <line
            x1="660"
            y1={timelineY - 10}
            x2="660"
            y2={timelineY + 10}
            stroke="hsl(var(--accent))"
            strokeWidth="1.5"
            className="dg-fade"
            style={stage(6)}
          />
          <text
            x="660"
            y={timelineY + 24}
            textAnchor="middle"
            className="dg-fade font-mono text-[11px]"
            fill="hsl(var(--accent))"
            style={stage(6)}
          >
            Jul 31
          </text>
          <text
            x="660"
            y={timelineY - 20}
            textAnchor="middle"
            className="dg-rise font-mono text-[12px]"
            fill="hsl(var(--accent))"
            style={stage(6)}
          >
            €2,924.02
          </text>
          <text
            x="660"
            y={timelineY - 38}
            textAnchor="middle"
            className="dg-rise text-[10px] italic"
            fill="hsl(var(--accent))"
            style={stage(6)}
          >
            month-end forecast
          </text>
        </g>
      </svg>
    </Diagram>
  );
}
